const { makeExecutableSchema } = require("graphql-tools");
const bodyParser = require("body-parser");
const Redis = require("ioredis");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const { createServer } = require("http");
const cors = require("cors");
const { s3Uploadv2, s3Uploadv3 } = require("./fileUpload/seService");
const connect = require("./Config/Config");
const express = require("express");
const { default: mongoose } = require("mongoose");
const { GraphQLError } = require("graphql");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { typeDefs } = require("./Graphql/typeDefs");
const { resolvers } = require("./Graphql/resolvers");

const redisClient = new Redis();


async function startServer() {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const app = express();
  const httpServer = createServer(app);

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    playground: true,
    introspection: true,
    async onHealthCheck(req, res) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Credentials", "true");
    },
  });

  const io = require("socket.io")(httpServer, {
    cors: {
      origin: ["http://localhost:3000", "http://localhost:3001"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.attach(httpServer);

  app.use(cookieParser());
  app.use(express.json());

  redisClient.on("connect", function () {
    console.log("connected to Redis");
  });
}
startServer();
