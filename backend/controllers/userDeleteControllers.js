const User = require('../models/User');


exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'username'); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOneAndDelete({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user' });
    }
};

