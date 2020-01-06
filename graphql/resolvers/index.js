const authResolver = require('./auth');
const traventResolver = require('./travent');
const joinerResolver = require('./joiner');

const rootResolver = {
    ...authResolver,
    ...traventResolver,
    ...joinerResolver
}

module.exports = rootResolver;

// const bcrypt = require("bcryptjs");
// const Travent = require('../../models/Travent')
// const User = require('../../models/User')

// // Get travents
// const getTravents = traventIds => {
//     return Travent
//         // special mongodb query syntax $in
//         .find({ _id: { $in: traventIds } })
//         .then(travents => {
//             return travents.map(travent => {
//                 return {
//                     ...travent._doc,
//                     date: new Date(travent._doc.date).toISOString(),
//                     organizer: getUser.bind(this, travent.organizer)
//                 }
//             })
//         })
//         .catch(err => {
//             throw err;
//         });
// }
// // Get user
// const getUser = userId => {
//     return User
//         .findById(userId)
//         .then(user => {
//             return {
//                 ...user._doc,
//                 travents: getTravents.bind(this, user.travents)
//             };
//         })
//         .catch(err => {
//             throw err;
//         });
// }

// module.exports = {
//     // Resolvers
//     // List travents
//     travents: () => {
//         return Travent
//             .find()
//             .then(travents => {
//                 return travents.map(travent => {
//                     return {
//                         ...travent._doc,
//                         date: new Date(travent._doc.date).toISOString(),
//                         organizer: getUser.bind(this, travent._doc.organizer)
//                     };
//                 });
//             }).catch(err => {
//                 throw err;
//             });
//     },
//     // create travent
//     createTravent: (args) => {
//         const travent = new Travent({
//             title: args.traventInput.title,
//             description: args.traventInput.description,
//             price: +args.traventInput.price,
//             date: new Date(args.traventInput.date),
//             organizer: '5e0805155bbdac7555474b4f'
//         });
//         let createdTravent;
//         // save in DB
//         return travent
//             .save()
//             .then(travent => {
//                 // console.log(travent)
//                 // return the result
//                 // return travent;
//                 createdTravent = {
//                     ...travent._doc,
//                     date: new Date(travent._doc.date).toISOString(),
//                     organizer: getUser.bind(this, travent._doc.organizer)
//                 };
//                 return User.findById('5e0805155bbdac7555474b4f')
//                 // console.log(travent)
//                 // return { ...travent._doc };
//             })
//             .then(user => {
//                 if (!user) {
//                     throw new Error('User not found')
//                 }
//                 user.travents.push(travent);
//                 return user.save();
//             })
//             .then(result => {
//                 return createdTravent;
//             })
//             .catch(err => {
//                 console.log(err);
//                 throw err;
//             });
//     },
//     // create user
//     createUser: (args) => {
//         return User
//             .findOne({ email: args.userInput.email })
//             .then(user => {
//                 if (user) {
//                     throw new Error('Email already in-use')
//                 }
//                 return bcrypt.hash(args.userInput.password, 12)
//             })
//             .then(hashedPassword => {
//                 const user = new User({
//                     email: args.userInput.email,
//                     password: hashedPassword
//                 });
//                 return user.save();
//             })
//             .then(user => {
//                 return { ...user._doc, password: null };
//             })
//             .catch(err => {
//                 throw err;
//             })
//     }
// }

// 
// CONVERTING INTO ASYNC AWAIT. BYE2 PROMISES
// 