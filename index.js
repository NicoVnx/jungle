const express = require("express");
const server = express();
const routes = require("./routes");

const uri = "mongodb+srv://nico:123321@cluster0.rtak1.mongodb.net/jungleDB?retryWrites=true&w=majority";

//middleware
server.use((req, res, next) => {
  next();
});

server.set("view engine", "ejs");


const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
  .then(() => {
    console.log("MongoDB Conectado...");
  })
  .catch((erro) => {
    console.log("Houve um erro ao se conectar: " + erro);
  });

server.use(express.static(__dirname + '/public'))


server.use(express.urlencoded({ extended: true }));

const session = require("express-session");

server.use(
  session({
    secret: "asjdnIAOJSNDOjansd1238192",
    resave: true,
    saveUninitialized: true,
  })
);


server.use(routes);
server.listen(3000, () => console.log("Server Rodando!"));
