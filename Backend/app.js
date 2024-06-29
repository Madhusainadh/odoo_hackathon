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
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
require("dotenv").config();

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

  io.on("connection", (socket) => {
    socketManager(socket, io);
  });

  await server.start();

  const corsOptions = {
    origin: ["*", "http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  };

  app.use(cors(corsOptions));

  app.use(
    "/graphql",
    bodyParser.json({ limit: "50mb" }),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const token = req.headers ? req.headers.authorization : null;
        return {
          req,
          res,
          token,
          redisClient,
          io,
        };
      },
    })
  );
  console.log(
    process.env.MONGO_URL,
    "process.env.MONGO_URprocess.env.MONGO_UR"
  );
  httpServer.listen(4444, async () => {
    await mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log(`YOUR API IS RUNNING AT PORT :${process.env.PORT}`);
        console.log(
          `Subscriptions ready at ws://localhost:${process.env.PORT}/graphql`
        );
      })
      .catch((err) => console.log(err.message));
  });
}
startServer();
