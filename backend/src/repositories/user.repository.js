import { pool } from '../db/index.js';

const userRepository = {
  async findAll() {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  },
};

export default userRepository;
