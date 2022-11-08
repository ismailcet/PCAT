const express = require("express");
const path = require("path");
const ejs = require("ejs");

const app = express();

//Tempalate Engine
app.set("view engine", "ejs");

//MiddleWares
app.use(express.static("public"));

//Queries
app.get("/", (request, response) => {
  response.render("index");
});

app.get("/about", (request, response) => {
  response.render("about");
});

app.get("/add", (request, response) => {
  response.render("add");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} Portunda Başlatıldı`);
});
