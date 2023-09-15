module.exports.github = [
    {
        path: '/github/orgrank/targets',
        method: 'GET',
        scope: 'public',
        handler: async (req, res) => {
            let targets = await req.dependencyContainer.github.getTargets();
            res.json(targets);
        }
    }
];
