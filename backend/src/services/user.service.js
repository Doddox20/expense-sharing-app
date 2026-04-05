import userRepository from '../repositories/user.repository.js';

const userService = {
  async getAllUsers() {
    return userRepository.findAll();
  },
};

export default userService;
