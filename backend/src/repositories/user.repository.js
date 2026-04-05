import { pool } from '../db/index.js';

const userRepository = {
  async findAll() {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  },
  async findById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }
};

export default userRepository;
