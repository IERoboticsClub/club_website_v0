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
            // check if user already has data entry for today
            // if so, update it
            // else, insert it
            // provided date has time aswell, so we need to remove it
            data.forEach(async (user) => {
                user.date = new Date(user.date);
                user.date.setHours(0, 0, 0, 0);
                let result = await collection.findOne({ username: user.username, date: user.date });
                if (result) {
                    // update
                    await collection.updateOne({ username: user.username, date: user.date }, { $set: user });
                } else {
                    // insert
                    await collection.insertOne(user);
                }
            });


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
                await mongo.connect(); // also not ideal
            } catch (err) {
                console.error('Failed to connect to MongoDB:', err);
                return res.status(500).json({ error: 'Database connection failed' });
            }

            try {
                let db = mongo.db('AARC'); // not ideal
                let collection = db.collection('ghRanking');

                let uniqueUsers = await collection.distinct('username');

                // for each user we get:
                // first ever entry
                // last 2 entries
                console.log(uniqueUsers);
                let result = await Promise.all(uniqueUsers.map(async (user) => {
                    let firstEntry = await collection.findOne({ username: user }, { sort: { date: 1 } });
                    let lastEntries = await collection.find({ username: user }, { sort: { date: -1 }, limit: 2 }).toArray();
                    return {
                        _id: user,
                        data: [ firstEntry, ...lastEntries ]
                    };
                }));
                await mongo.close();

                result = result.map((user) => {
                    user.data = user.data.map((data) => {
                        data.date = new Date(data.date);
                        return data;
                    });
                    return user;
                });

                result = result.map((user) => {
                    let uname = user._id;
                    delete user._id;
                    return {
                        username: uname,
                        ...user,
                    };
                });

                res.json(result);
            } catch (err) {
                console.error('Error during data processing:', err);
                await mongo.close();
                return res.status(500).json({ error: 'Data processing failed' });
            }
        }
    }
];
