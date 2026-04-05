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
};

export default userController;
