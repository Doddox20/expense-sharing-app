import groupService from '../services/group.service.js';

class GroupController {

    async create(req, res) {
        try {
            const { name } = req.body;
            const userId = req.user.userId;

            const group = await groupService.createGroup(name, userId);
            res.status(201).json(group);

        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async getUserGroups(req, res) {
        try {
            const userId = req.user.userId;

            const groups = await groupService.getUserGroups(userId);
            res.json(groups);

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async join(req, res) {
        try {
            const userId = req.user.userId;
            const groupId = req.params.id;

            const membership = await groupService.joinGroup(userId, groupId);
            res.status(201).json(membership);

        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

export default new GroupController();