module.exports.accounts = [
    {
        path: '/members',
        method: 'GET',
        scope: 'public',
        handler: (request, res) => {
            res.json({
                status: 'OK'
            })
        }
    },
    {
        "path": "/ranking",
        "method": "GET",
        "scope": "public"
    }
];
