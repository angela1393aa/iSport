const moment = require('moment');

const newMessage = ({ user, text }) => {
    return {
        user,
        text,
        time: moment().format('h:mm a')
    };
};

const newImg = ({ user, img }) => {
    return {
        user,
        img,
        time: moment().format('h:mm a')
    };
};

module.exports = {
    newMessage,
    newImg
};