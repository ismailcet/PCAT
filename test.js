const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Connect to DB
mongoose.connect("mongodb://localhost/pcat-test-db");

//Create Schema

const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model("Photo", PhotoSchema);

//Create Photo

// for (let i = 0; i <= 10; i++) {
//   Photo.create({
//     title: `Photo ${i}`,
//     description: `Description ${i}`,
//   });
// }

//Find a İtem

// Photo.find({}, (err, data) => {
//   console.log(data);
// });

//Update a item

//

// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: "Photo 1 Updated",
//     description: "Description 1 Updated",
//   },
//   {
//     new: true,
//   },
//   (err, data) => {
//     console.log(data);
//   }
// );

//Delete a item
const id = "636befc9cd7a539d412c71a3";

Photo.findByIdAndDelete(id, (err, data) => {
  console.log("Data Silindi");
});
