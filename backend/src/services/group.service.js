import groupRepository from "../repositories/group.repository";

class GroupService {

    async createGroup(name, userId) {
        const group = await groupRepository.createGroup(name, userId);
        await groupRepository.addMember(userId, group.id);

        return group;
    }

    async joinGroup(userId, groupId) {
        const existing = await groupRepository.isMember(userId, groupId);

        if (existing) {
            throw new Error('Already a member');
        }
        return await groupRepository.addMember(userId, groupId);
    }

    async getUserGroups(userId) {
        return await groupRepository.getUserGroups(userId);
    }

    async isMember(userId, groupId) {
        return await groupRepository.isMember(userId, groupId);
    }
}
export default new GroupService();