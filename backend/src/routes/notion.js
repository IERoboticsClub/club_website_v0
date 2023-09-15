
module.exports.notion = [
    {
        path: '/notion/users',
        method: 'GET',
        scope: 'public',
        handler: async (req, res) => {
            let users = await req.dependencyContainer.notion.users.list();
            res.json(users);
        }
    }
];
