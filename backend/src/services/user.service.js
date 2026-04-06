import userRepository from '../repositories/user.repository.js';

const userService = {
  async getAllUsers() {
    return userRepository.findAll();
  },
  async getUserById(id) {
    return userRepository.findById(id);
  },
  async getUserByEmail(email) {
    return userRepository.findByEmail(email);
  },
  async createUser(user) {
    return userRepository.create(user);
  },
  async updateUser(id, user) {
    return userRepository.update(id, user);
  },
  async deleteUser(id) {
    return userRepository.delete(id);
  }
};

export default userService;
