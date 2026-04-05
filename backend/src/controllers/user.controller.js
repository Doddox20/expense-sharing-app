import userService from '../services/user.service.js';

const userController = {
    async getAllUsers(req, res) {
        try {
        const users = await userService.getAllUsers();
        res.json(users);
        } catch (err) {
        console.error('DB ERROR:', err);
        res.status(500).json({ error: 'Database error', details: err.message });
        }
    },
    async getUserById(req, res) {
        try {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
        } catch (err) {
        console.error('DB ERROR:', err);
        res.status(500).json({ error: 'Database error', details: err.message });
        }
    },
    async createUser(req, res) {
        try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
        } catch (err) {
        console.error('DB ERROR:', err);
        res.status(500).json({ error: 'Database error', details: err.message });
        }
    },
    async updateUser(req, res) {
        try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        res.json(updatedUser);
        } catch (err) {
        console.error('DB ERROR:', err);
        res.status(500).json({ error: 'Database error', details: err.message });
        }
    },
    async deleteUser(req, res) {
        try {
        await userService.deleteUser(req.params.id);
        res.status(204).send();
        } catch (err) {
        console.error('DB ERROR:', err);
        res.status(500).json({ error: 'Database error', details: err.message });
        }
    }

};

export default userController;
