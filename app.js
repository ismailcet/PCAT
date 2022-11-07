const express = require("express");

const app = express();

app.get("/", (request, response) => {
  const photo = {
    id: 1,
    name: "photoName",
    desc: "Photo Desc",
  };
  response.send(photo);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} Portunda Başlatıldı`);
});
