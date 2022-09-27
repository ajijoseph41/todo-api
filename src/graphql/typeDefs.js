const {gql} = require('apollo-server');

module.exports = gql`
type Todo {
    name: String
    completed: Boolean
    description: String
    date: String
    category: String
}

input MessageInput {
    text: String
    username: String
}

type Query {
    message(id: ID!): Message
}

type Mutation {
    createMessage(messageInput: MessageInput): Message!
}
`