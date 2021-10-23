const users = [];

const addUser = ({ id, nickname, room }) => {
    nickname = nickname.trim();

    const nicknameExist = users.find(user => user.room === room && user.nickname === nickname);
    if (nicknameExist) {
        return { err: '此暱稱已有人使用' };
    }

    const user = { id, nickname, room };
    users.push(user);
    return { user };
};

const removeUser = id => {
    const idx = users.findIndex(user => user.id === id);
    if (idx !== -1) {
        return users.splice(idx, 1)[0];
    }
};

const getUser = id => {
    return users.find(user => user.id === id);
};

const getUsersIn = room => {
    return users.filter(user => user.room === room);
};

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersIn
};