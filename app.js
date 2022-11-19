const express = require("express");
const mongoose = require("mongoose");
//Express File Upload Dosyamızı Require ile tanımladık
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const path = require("path");
const ejs = require("ejs");
const { PassThrough } = require("stream");
const photoControllers = require("./controllers/photoControllers");
const pageControllers = require("./controllers/pageControllers");

const app = express();

//Connect To DB
mongoose.connect(
  "mongodb+srv://ismail:1RHVRafG8yIzm7iU@cluster0.lrcjw8h.mongodb.net/pcat-db?retryWrites=true&w=majority"
);

//Tempalate Engine
app.set("view engine", "ejs");

//MiddleWares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload()); //File Upload middleWaresi Ekledik
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//Queries
app.get("/", photoControllers.getAllPhotos);
app.get("/photos/:id", photoControllers.getByIdPhoto);
app.post("/photos", photoControllers.addPhoto);
app.put("/photos/:id", photoControllers.updatePhoto);
app.delete("/photos/:id", photoControllers.deletePhoto);

app.get("/about", pageControllers.getAbout);
app.get("/add", pageControllers.getAdd);
app.get("/photo/edit/:id", pageControllers.getEdit);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Sunucu ${port} Portunda Başlatıldı`);
});
