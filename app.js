const express = require("express");
const mongoose = require("mongoose");
//Express File Upload Dosyamızı Require ile tanımladık
const fileUpload = require("express-fileupload");

const methodOverride = require("method-override");
const path = require("path");
const ejs = require("ejs");
//Dosya Kontrol Sitemimizi Ekledik
const fs = require("fs");

const { Photo } = require("./models/Photo");
const { PassThrough } = require("stream");

const app = express();

//Connect To DB
mongoose.connect("mongodb://localhost/pcat-text-db");

//Tempalate Engine
app.set("view engine", "ejs");

//MiddleWares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload()); //File Upload middleWaresi Ekledik
app.use(methodOverride("_method"));

//Queries
app.get("/", async (request, response) => {
  const photos = await Photo.find({}).sort("-dateCreated"); //DateCreated a göre sıralama yapmasını söyledik
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
  // await Photo.create(request.body);
  // response.redirect("/");
  // console.log(request.files.image);

  const uploadDir = "public/uploads"; //Upload Dosyamızı Tanımlıyoruz

  //Dosyamız Yok ise uploads dosyamızı oluşturuyoruz
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  //Upload Edilecek Doyamızın Bilgilerini ALıyoruz
  let sampleFile = request.files.image;
  //Upload Edilen dosyaların kaydedileceği dosyamızı tanıtıyoruz
  let uploadImage = __dirname + "/public/uploads/" + sampleFile.name;

  //SampleFile içindeki move(mv) fonksiyonu kullanarak kaydediyoruz
  sampleFile.mv(uploadImage, async () => {
    await Photo.create({
      ...request.body,
      image: "/uploads/" + sampleFile.name,
    });
    response.redirect("/");
  });
});

app.get("/photos/:id", async (request, response) => {
  const photo = await Photo.findById(request.params.id);

  response.render("video-page", {
    photo,
  });
});

app.get("/photo/edit/:id", async (request, response) => {
  const photo = await Photo.findOne({ _id: request.params.id });

  response.render("edit", {
    photo,
  });
});

app.put("/photos/:id", async (request, response) => {
  const photo = await Photo.findById(request.params.id);

  photo.title = request.body.title;
  photo.description = request.body.description;

  photo.save();
  response.redirect(`/photos/${request.params.id}`);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} Portunda Başlatıldı`);
});
