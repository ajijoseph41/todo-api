const http = require('http')
const app = require('./app')
const {ApolloServer} = require('apollo-server')
const connectMongoDB = require('./db/connectMongoDB')
require('dotenv').config()

const PORT_REST = process.env.PORT_REST || 8008
const PORT_GRAPH = process.env.PORT_GRAPH || 5005
//listening with http instead of just express to isolate server and express code.
//Express code is in app.js
const server = http.createServer(app)
//GraphQL
// const typeDefs = require('./graphql/typeDefs')
// const resolvers = require('./graphql/resolvers')
// const graphServer = new ApolloServer({
//     typeDefs,
//     resolvers
// });

const connect_start = async () => {
    try {
        await connectMongoDB(process.env.MONGO_CONN_STRING)
        server.listen(PORT_REST, console.log(`Restful Server is running at http://localhost:${PORT_REST}`))
        // graphServer.listen(PORT_GRAPH, console.log(`GraphQL Server is running at http://localhost:${PORT_GRAPH}`))
    } catch (error) {
        console.log(error);
    }
}

connect_start()