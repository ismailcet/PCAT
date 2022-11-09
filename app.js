const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");

const { Photo } = require("./models/Photo");

const app = express();

//Connect To DB
mongoose.connect("mongodb://localhost/pcat-text-db");

//Tempalate Engine
app.set("view engine", "ejs");

//MiddleWares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Queries
app.get("/", async (request, response) => {
  const photos = await Photo.find({});
  response.render("index", {
    photos: photos,
  });
});

app.get("/about", (request, response) => {
  response.render("about");
});

app.get("/add", (request, response) => {
  response.render("add");
});
//Post Method
app.post("/photos", async (request, response) => {
  await Photo.create(request.body);
  response.redirect("/");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} Portunda Başlatıldı`);
});
