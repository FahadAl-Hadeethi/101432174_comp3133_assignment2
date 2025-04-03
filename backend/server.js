const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

require('dotenv').config();

connectDB();

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => {
        return {
            message: err.message,
            code: err.extensions?.code || "INTERNAL_SERVER_ERROR"
        };
    }
});

server.start().then(() => {
    server.applyMiddleware({ app });
    app.listen(4000, () => console.log('🚀 Server running at http://localhost:4000/graphql'));
});