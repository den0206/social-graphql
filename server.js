const {connectMongo} = require('./database/database');
const {ApolloServer} = require('apollo-server-express');
const express = require('express');
const {graphqlUploadExpress} = require('graphql-upload');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const {verifyUser} = require('./helper/index');

async function startServer() {
  await connectMongo();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
      if (req) {
        const user = await verifyUser(req);
        return user;
      }
    },
    formatError: (e) => {
      console.log(e.message);
      return {
        message: e.message,
      };
    },
  });
  await server.start();
  const app = express();
  app.use(graphqlUploadExpress({maxFileSize: 10000000, maxFiles: 10}));
  server.applyMiddleware({app, path: '/graphql'});

  const PORT = process.env.PORT || 4000;

  await new Promise((r) => app.listen({port: PORT}, r));
}

startServer();
