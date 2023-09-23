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
            await mongo.connect();
            let db = mongo.db('AARC');
            let collection = db.collection('ghRanking');
            let uniqueUsers = await collection.distinct('username');
            console.log(uniqueUsers);
            let result = await collection.aggregate([
                { $match: { username: { $in: uniqueUsers } } },
                // there is not score variable just get all the data
                { $group: { _id: '$username', data: { $push: '$$ROOT' } } },
                // get data also from collection roster and join it with the data by finding info by username
                { $lookup: { from: 'roster', localField: '_id', foreignField: 'username', as: 'roster' } },

            ]).toArray();
            // convert the timestamp to a date
            result = result.map((user) => {
                user.data = user.data.map((data) => {
                    data.date = new Date(data.date);
                    return data;
                });
                return user;
            });
            // for each user get teh last entry
            result = result.map((user) => {
                let lastEntry = user.data.reduce((prev, curr) => {
                    return (prev.date > curr.date) ? prev : curr;
                });
                user.lastEntry = lastEntry;
                return user;
            });
            await mongo.close();
            result = result.map((user) => {
                return {
                    ...user.lastEntry,
                    username: user._id,
                    about: user.roster[0]
                };
            });
            res.json(result);
        }
    }
];
