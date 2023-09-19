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
            let db = mongo.db('github');
            let collection = db.collection('ranking');
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
            let db = mongo.db('github');
            let collection = db.collection('ranking');
            let uniqueUsers = await collection.distinct('username');
            console.log(uniqueUsers);
            let result = await collection.aggregate([
                { $match: { username: { $in: uniqueUsers } } },
                // there is not score variable just get all the data
                { $group: { _id: '$username', data: { $push: '$$ROOT' } } },
            ]).toArray();
            // convert the timestamp to a date
            result = result.map((user) => {
                user.data = user.data.map((data) => {
                    data.date = new Date(data.date);
                    return data;
                });
                return user;
            });
            result = result.map((user) => {
                // get the one with the smallest timestamp and the one with the largest timestamp
                // convert the timestamp to a date
                let first = user.data.reduce((prev, curr) => {
                    return (prev.date < curr.date) ? prev : curr;
                });
                let last = user.data.reduce((prev, curr) => {
                    return (prev.date > curr.date) ? prev : curr;
                });
                let diff = {};
                for (let key in first) {
                    if (key != '_id' && key != 'username' && key != 'date') {
                        diff[key] = last[key] - first[key];
                    }
                }
                return { username: user._id, diff: diff };
            });
            // close the connection


            await mongo.close();
            res.json(result);
        }
    }
];
