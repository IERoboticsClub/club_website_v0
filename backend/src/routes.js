const routes = [
    {
        path: '/status',
        method: 'GET',
        scope: 'public',
        handler: (request, res) => {
            res.json({
                status: 'OK'
            })
        }
    }
];

module.exports = routes;
