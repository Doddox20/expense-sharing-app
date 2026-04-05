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

};

export default userController;
