const Joiner = require('../../models/Joiner');
const Travent = require('../../models/Travent');
const { transformJoiner, transformTravent } = require('./merge');

module.exports = {
    // list joiners
    joiners: async () => {
        try {
            const joiners = await Joiner.find();
            return joiners.map(joiner => {
                return transformJoiner(joiner);
            });
        } catch (err) {
            throw err;
        }
    },

    // join a travent
    joinTravent: async args => {
        const fetchedTravent = await Travent.findOne({ _id: args.traventId });
        const joiner = new Joiner({
            user: '5e0805155bbdac7555474b4f',
            travent: fetchedTravent
        });
        const result = await joiner.save();
        return transformJoiner(result);
    },

    // cancel a travent
    cancelTravent: async args => {
        try {
            const joiner = await Joiner.findById(args.joinerId).populate('travent');
            const travent = transformTravent(joiner.travent);

            await Joiner.deleteOne({ _id: args.joinerId });
            return travent;
        } catch (err) {
            throw err;
        }
    }
}