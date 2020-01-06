const User = require('../../models/User');
const Travent = require('../../models/Travent');
const { dateToString } = require('../../helpers/date');

// Get travents
const getTravents = async traventIds => {
    try {
        const travents = await Travent.find({ _id: { $in: traventIds } });
        return travents.map(travent => {
            return transformTravent(travent);
        });
    } catch (err) {
        throw err;
    }
};
// Get travent
const getTravent = async traventId => {
    try {
        const travent = await Travent.findOne(traventId);
        return transformTravent(travent);
    } catch (err) {
        throw err;
    }
};
// Get user
const getUser = async userId => {
    try {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            travents: getTravents.bind(this, user.travents)
        };
    } catch (err) {
        throw err;
    }
};

const transformTravent = travent => {
    return {
        ...travent._doc,
        _id: travent.id,
        date: dateToString(travent._doc.date),
        organizer: getUser.bind(this, travent.organizer)
    };
};

const transformJoiner = joiner => {
    return {
        ...joiner._doc,
        user: getUser.bind(this, joiner._doc.user),
        travent: getTravent.bind(this, joiner._doc.travent),
        createdAt: dateToString(joiner._doc.createdAt),
        updatedAt: dateToString(joiner._doc.updatedAt)
    }
};

exports.transformTravent = transformTravent;
exports.transformJoiner = transformJoiner;

// exports.getUser = getUser;
// exports.getTravents = getTravents;
// exports.getTravent = getTravent;