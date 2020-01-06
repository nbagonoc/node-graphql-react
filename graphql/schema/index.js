const { buildSchema } = require('graphql');

module.exports = buildSchema(
    `
        type Joiner {
            _id: ID!
            travent: Travent!
            user: User!
            createdAt: String!
            updatedAt: String!
        }

        type Travent {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
            organizer: User!
        }

        type User {
            _id: ID!
            email: String!
            password: String
            travents: [Travent!]
        }

        input UserInput{
            email: String!
            password: String!
        }

        input TraventInput{
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            travents: [Travent!]!
            joiners: [Joiner!]!
        }

        type RootMutation {
            createTravent(traventInput: TraventInput): Travent
            createUser(userInput: UserInput): User
            joinTravent(traventId: ID!): Joiner!
            cancelTravent(joinerId: ID!): Travent!
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `
);