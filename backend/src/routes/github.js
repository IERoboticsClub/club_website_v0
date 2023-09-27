module.exports.github = [
    {
        path: '/github/orgrank/targets',
        method: 'GET',
        scope: 'public',
        handler: async (req, res) => {
            // get all the users under the organization IERoboticsClub
            res.json([
                'velocitatem',
                'i-be-keggles',
                'dsanmart'
            ]);
        }
    },
    {
        path: '/github/orgrank/upload',
        method: 'POST',
        scope: 'public', // TODO: change to internal
        handler: async (req, res) => {
            let data = req.body; // a list of users and their data
            let mongo = req.dependencies.mongo;
            // make sure we are connected to the database
            await mongo.connect();
            let db = mongo.db('AARC');
            let collection = db.collection('ghRanking');
            // insert the data into the database
            let result = await collection.insertMany(data);
            // close the connection
            await mongo.close();
            res.status(200).json({
                message: 'Data uploaded successfully',
                result: result
            });

        }
    },
    {
        path: '/github/orgrank/ranking',
        method: 'GET',
        scope: 'public',
        handler: async (req, res) => {
            let mongo = req.dependencies.mongo;
            try {
                await mongo.connect();
            } catch (err) {
                console.error('Failed to connect to MongoDB:', err);
                return res.status(500).json({ error: 'Database connection failed' });
            }

            try {
                let db = mongo.db('AARC');
                let collection = db.collection('ghRanking');

                let uniqueUsers = await collection.distinct('username');

                let result = await collection.aggregate([
                    { $match: { username: { $in: uniqueUsers } } },
                    { $group: { _id: '$username', data: { $push: '$$ROOT' } } },
                    { $lookup: { from: 'roster', localField: '_id', foreignField: 'username', as: 'roster' } },
                ]).toArray();

                result = result.map((user) => {
                    user.data = user.data.map((data) => {
                        data.date = new Date(data.date);
                        return data;
                    });
                    return user;
                });

                result = result.map((user) => {
                    let lastEntry = user.data.reduce((prev, curr) => {
                        return (prev.date > curr.date) ? prev : curr;
                    });
                    user.lastEntry = lastEntry;
                    return user;
                });

                result = result.map((user) => {
                    return {
                        ...user.lastEntry,
                        username: user._id,
                        about: user.roster[0]
                    };
                });

                await mongo.close();
                res.json(result);
            } catch (err) {
                console.error('Error during data processing:', err);
                await mongo.close();
                return res.status(500).json({ error: 'Data processing failed' });
            }
        }
    }
];
