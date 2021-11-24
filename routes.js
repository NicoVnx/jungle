const express = require("express");
const routes = express.Router();
const views = __dirname + "/views/";
const mongoose = require("mongoose");

require("./models/User");
const User = mongoose.model("users");

/*require("./models/Publicado");
const Pub = mongoose.model("publicados");
*/

var erros = []
var userID
var  userName 
var userEmail 
var userAdm 

var sessionID = 'NOT'

const regexOne = /^[a-zA-Z]+([ ]?[a-zA-Z])*$/;

routes.get("/", (req, res) => {
  console.log(req.session.user)
  res.render(views + "index", { erros, userAdm, userEmail, userID, userName, sessionID });
  if (erros.length >= 1) {
    for (var i = 0; (i = erros.length); i++) {
      erros.shift();
    }
  }
});

routes.get("/plantas", (req, res) => { res.render(views + "plantas", { userAdm, userEmail, userID, userName, sessionID }) });

routes.get("/jabuticabeira", (req, res) => { res.render(views + "plantas/jabuticabeira", { userAdm, userEmail, userID, userName, sessionID }) });
routes.get("/agapantos", (req, res) => { res.render(views + "plantas/agapantos", { userAdm, userEmail, userID, userName, sessionID }) });
routes.get("/amora", (req, res) => { res.render(views + "plantas/amora", { userAdm, userEmail, userID, userName, sessionID }) });
routes.get("/camarao-vermelho", (req, res) => { res.render(views + "plantas/camarao-vermelho", { userAdm, userEmail, userID, userName, sessionID }) });
routes.get("/jiboia", (req, res) => { res.render(views + "plantas/jiboia", { userAdm, userEmail, userID, userName, sessionID }) });

routes.post("/logar", (req, res) => {
  if (erros.length >= 1) {
    for (var i = 0; (i = erros.length); i++) {
      erros.shift();
    }
  }

  if (
    !req.body.password ||
    typeof req.body.password == undefined ||
    req.body.password == null ||
    !req.body.email ||
    typeof req.body.email == undefined ||
    req.body.email == null
  ) {
    erros.push({ txt: "Preencha todos os campos!" });
    console.log('Preencha todos os campos!')
  }

  if (erros.length >= 1) {
    console.log("erros");
    erros.forEach((erro) => {
      console.log(erro.txt);
    });
    res.redirect('/')

  } 
  else {
    
      User.findOne({ email: req.body.email })
        .then((userExist) => {
          if (userExist) {
            if (userExist.password == req.body.password) {
              const user = userExist._id;
              req.session.user = user;
              sessionID = req.session.user

              User.findOne({ _id: req.session.user }).then((user) => {
                 userID = user._id;
        userName = user.name;
        userEmail = user.email;
        userAdm = user.userAdm;

                res.redirect("/");
              });
            } else {
              res.redirect("/");
              console.log('Usuário ou senha incorretos!')
              erros.push({ txt: "Usuário ou senha incorretos!" });
            }
          } else {
            res.redirect("/");
            console.log('Usuário ou senha incorretos!')
            erros.push({ txt: "Usuário ou senha incorretos!" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    
  }
});

routes.post("/cadastrar", (req, res) => {
  if (erros.length >= 1) {
    for (var i = 0; (i = erros.length); i++) {
      erros.shift();
    }
  }

  if (
    !req.body.name ||
    typeof req.body.name == undefined ||
    req.body.name == null
  ) {
    erros.push({ txt: "Campo name vazio" });
  } else if (req.body.name.length < 4) {
    erros.push({ txt: "User muito pequeno, mínimo de 4 caracteres" });
  } else if (req.body.name.length > 13) {
    erros.push({ txt: "User muito grande, máximo de 12 caracteres" });
  } else if (regexOne.test(req.body.name) == false) {
    erros.push({
      txt: "name não pode conter caracteres especiais",
    });
  }


  var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };
  if (
    !req.body.email ||
    typeof req.body.email == undefined ||
    req.body.email == null
  ) {
    erros.push({ txt: "Campo email vazio" });
  } else if (validateEmail(req.body.email) == false) {
    erros.push({ txt: "Campo email inváido" });
  }

  if (
    !req.body.password ||
    typeof req.body.password == undefined ||
    req.body.password == null
  ) {
    erros.push({ txt: "Campo senha vazio" });
  } else if (req.body.password.length <= 7) {
    errosPass.push({ txt: "Senha muito pequena, mínimo de 8 caracteres" });
  }

  if (
    erros.length > 0
  ) {
    console.log("erros");
    erros.forEach((erro) => {
      console.log(erro.txt);
    });

    res.redirect("/");
  } else {
    console.log('cadastrado')

    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      userAdm: 0,
    };

    new User(newUser)
      .save()
      .then(() => {
        
        userEmail = req.body.email;
        
        res.redirect(307, "/cadastroRedirect");
        
      })
      .catch((erro) => {
        console.log("Erro ao cadastrar usuário:" + erro);
        res.redirect("/cadastro");
      });
  }
});

routes.post("/cadastroRedirect", (req, res) => {
  User.findOne({ email: userEmail })
    .then((userExist) => {
      console.log(userEmail);
      req.session.user = userExist._id;
      sessionID = req.session.user

      User.findOne({ _id: req.session.user }).then((user) => {
        userID = user._id;
        userName = user.name;
        userEmail = user.email;
        userAdm = user.userAdm;

        res.redirect("/");
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

routes.post("/logout", function (req, res) {
  sessionID = 'NOT'
  req.session.destroy();
  res.redirect("/");
});

/*routes.post("/publicar", (req, res) => {
  const newPub = {
    userEx: userEx,
    userUser: userUser,
    conteudo: req.body.conteudo,
    idUser: userID,
    publiCurtidas: 0,
  };

  new Pub(newPub)
    .save()
    .then((pubs) => {
      console.log("Publicado com sucesso!");
      sucs = "Publicado!";
      res.redirect("/home");
    })
    .catch((erro) => {
      console.log("Erro: " + erro);
      res.redirect("/home");
    });
});

routes.post("/deletar/:id", (req, res) => {
  Pub.remove({ _id: req.params.id })
    .then(() => {
      if (naoLogado == 2) {
        res.redirect("/perfil/" + userUser);
      } else {
        res.redirect("/home");
      }

      console.log("deletado");
    })
    .catch((err) => {
      console.log(err);
    });
});
*/
module.exports = routes;
