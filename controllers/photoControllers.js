const { Photo } = require("../models/Photo");
const fs = require("fs");

exports.getAllPhotos = async (request, response) => {
  const page = request.query.page || 1;
  const photosPerPage = 1;

  const totalPhotos = await Photo.find().countDocuments();

  const photos = await Photo.find({})
    .sort("-dateCreated")
    .skip((page - 1) * photosPerPage)
    .limit(photosPerPage);
  // const photos = await Photo.find({}).sort("-dateCreated"); //DateCreated a göre sıralama yapmasını söyledik
  response.render("index", {
    photos: photos,
    current: page,
    pages: Math.ceil(totalPhotos / photosPerPage),
  });
};

exports.getByIdPhoto = async (request, response) => {
  const photo = await Photo.findById(request.params.id);

  response.render("video-page", {
    photo,
  });
};

exports.addPhoto = async (request, response) => {
  const uploadDir = "public/uploads"; //Upload Dosyamızı Tanımlıyoruz
  //Dosyamız Yok ise uploads dosyamızı oluşturuyoruz
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  //Upload Edilecek Doyamızın Bilgilerini ALıyoruz
  let sampleFile = request.files.image;
  //Upload Edilen dosyaların kaydedileceği dosyamızı tanıtıyoruz
  let uploadImage = __dirname + "/../public/uploads/" + sampleFile.name;

  //SampleFile içindeki move(mv) fonksiyonu kullanarak kaydediyoruz
  sampleFile.mv(uploadImage, async () => {
    await Photo.create({
      ...request.body,
      image: "/uploads/" + sampleFile.name,
    });
    response.redirect("/");
  });
};

exports.updatePhoto = async (request, response) => {
  const photo = await Photo.findById(request.params.id);

  photo.title = request.body.title;
  photo.description = request.body.description;

  photo.save();
  response.redirect(`/photos/${request.params.id}`);
};

exports.deletePhoto = async (request, response) => {
  const photo = await Photo.findOne({ _id: request.params.id });
  const deletedFile = __dirname + "/../public" + photo.image;
  fs.unlinkSync(deletedFile);
  await Photo.findByIdAndRemove(request.params.id);

  response.redirect("/");
};
