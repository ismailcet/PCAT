const { Photo } = require("../models/Photo");

exports.getAbout = (request, response) => {
  response.render("about");
};

exports.getAdd = (request, response) => {
  response.render("add");
};

exports.getEdit = async (request, response) => {
  const photo = await Photo.findOne({ _id: request.params.id });

  response.render("edit", {
    photo,
  });
};
