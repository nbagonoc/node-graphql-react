const Travent = require('../../models/Travent');
const User = require('../../models/User');
const { transformTravent } = require('./merge');
const { dateToString } = require('../../helpers/date');

module.exports = {
    // List travents
    travents: async () => {
        try {
            const travents = await Travent.find()
            return travents.map(travent => {
                return transformTravent(travent)
            });
        } catch (err) {
            throw err;
        }
    },

    // create travent
    createTravent: async args => {
        const travent = new Travent({
            title: args.traventInput.title,
            description: args.traventInput.description,
            price: +args.traventInput.price,
            date: dateToString(args.traventInput.date),
            organizer: '5e0805155bbdac7555474b4f'
        });
        let createdTravent;
        try {
            // save in DB
            const result = await travent.save()
            createdTravent = transformTravent(result);
            const user = await User.findById('5e0805155bbdac7555474b4f')

            if (!user) {
                throw new Error('User not found')
            }
            user.travents.push(travent);
            await user.save();

            return createdTravent;
        } catch (err) {
            throw err;
        };
    }
}