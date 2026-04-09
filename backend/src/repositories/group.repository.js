import { pool } from '../db/index.js';

class GroupRepository {

    async createGroup(name, userId) {
        const result = await pool.query(
            `INSERT INTO groups (name, created_by)
             VALUES ($1, $2)
             RETURNING *`,
            [name, userId]
        );
        return result.rows[0];
    }

    async addMember(userId, groupId) {
        const result = await pool.query(
            `INSERT INTO memberships (user_id, group_id)
             VALUES ($1, $2)
             RETURNING *`,
            [userId, groupId]
        );
        return result.rows[0];
    }

    async getUserGroups(userId) {
        const result = await pool.query(
            `SELECT g.*
             FROM groups g
             JOIN memberships m ON g.id = m.group_id
             WHERE m.user_id = $1`,
            [userId]
        );
        return result.rows;
    }

    async isMember(userId, groupId) {
        const result = await pool.query(
            `SELECT * FROM memberships
             WHERE user_id = $1 AND group_id = $2`,
            [userId, groupId]
        );
        return result.rows[0];
    }
}

export default new GroupRepository();