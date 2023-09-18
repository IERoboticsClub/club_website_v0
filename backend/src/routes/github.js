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
            let data = req.body;
            let mongo = req.dependencies.mongo;
            // make sure we are connected to the database
            req.dependencies.useMongo(async (mongo) => {
                let rankingCollection = mongo.db('github').collection('ranking');
                data.forEach(async (item) => {
                    await rankingCollection.insertOne(item);
                });
                res.json({ status: 'ok' });
            });
        }
    },
    {
        path: '/github/orgrank/ranking',
        method: 'GET',
        scope: 'public',
        handler: async (req, res) => {
            let mongo = req.dependencies.mongo;
            let rankingCollection = mongo.db('github').collection('ranking');
            // get the last 2 rankings for each user
            let ranking = await rankingCollection.aggregate([
                { $sort: { date: -1 } },
                { $group: { _id: '$user', ranking: { $push: '$$ROOT' } } }
            ]).toArray();
            res.json(ranking);
        }
    }
];
