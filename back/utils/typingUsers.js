let typingUsersArray = [];

const addTypingUser = user => {
    const alreadyTyping = typingUsersArray.find(typingUser => typingUser.room === user.room && typingUser.nickname === user.nickname);
    if (!alreadyTyping) {
        typingUsersArray.push(user);
    }
    return typingUsersArray;
};

const removeTypingUser = id => {
    const idx = typingUsersArray.findIndex(typingUser => typingUser.id === id);
    if (idx !== -1) {
        typingUsersArray.splice(idx, 1)[0];
    }
    return typingUsersArray;
};

module.exports = {
    addTypingUser,
    removeTypingUser
};