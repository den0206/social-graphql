const {connectMongo} = require('./database/database');
const {ApolloServer} = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

async function startServer() {
  await connectMongo();

  const server = new ApolloServer({
    typeDefs,
    resolvers,

    formatError: (e) => {
      console.log(e);
      return {
        message: e.message,
      };
    },
  });

  server.listen().then((response) => {
    console.log('Connect Server', response.url);
  });
}

startServer();
