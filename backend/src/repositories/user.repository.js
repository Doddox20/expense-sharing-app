import { pool } from '../db/index.js';

const userRepository = {
    async findAll() {
        const result = await pool.query('SELECT * FROM users');
        return result.rows;
    },
    async findById(id) {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    },
    async findByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    },
    async create(user) {
        const { username, email, password } = user;
        const result = await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
        [username, email, password]
        );
        return result.rows[0];
    },
    async update(id, user) {
        const { username, email, password } = user;
        const result = await pool.query(
        'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
        [username, email, password, id]
        );
        return result.rows[0];
    },
    async delete(id) {
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
    }
};

export default userRepository;
