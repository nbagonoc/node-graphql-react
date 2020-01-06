const bcrypt = require("bcryptjs");
const User = require('../../models/User');

module.exports = {
    // create user
    createUser: async args => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email })

            if (existingUser) {
                throw new Error('Email already in-use');
            }

            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });

            const result = await user.save();

            return { ...result._doc, password: null };
        } catch (err) {
            throw err;
        }
    }
}