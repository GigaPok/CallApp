const gExpress = require("express");
const bodyParser = require("body-parser");
const app = gExpress();
var fs = require("fs");
const cors = require("cors");
const port = 3001;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

var apps = fs.readFileSync(__dirname + "/data.json", "utf8");
apps = JSON.parse(apps);

const LAST_ID = apps[apps.length - 1].id;

app.get("/app", (req, res) => {
  res.json(apps);
});

app.get("/app/:id", (req, res) => {
  const vId = parseInt(req.params.id);
  const result = apps.find((app) => {
    return app.id === vId;
  });
  res.json([result]);
});

app.post("/app/add", (req, res) => {
  apps.push(req.body);
  req.body.id = LAST_ID + 1;
  fs.writeFileSync(__dirname + "/data.json", JSON.stringify(apps));
  res.status(201).json({
    status: true,
    message: "განცხადება ჩაიწერა წარმატებით!",
    result: req.body,
  });
});

app.put("/app/:id", (req, res) => {
  const vId = parseInt(req.params.id);
  const vBody = req.body;
  const result = apps.find((app) => {
    return app.id === vId;
  });
  result.name = vBody.name;
  fs.writeFileSync(__dirname + "/data.json", JSON.stringify(apps));

  res.json({
    status: true,
    message: "განცხადება განახლდა წარმატებით!",
    result: result,
  });
});

app.delete("/app/delete/:id", (req, res) => {
  const vId = parseInt(req.params.id);
  const result = apps.find((app) => {
    return app.id === vId;
  });
  const index = apps.indexOf(result);
  apps.splice(index, 1);

  fs.writeFileSync(__dirname + "/data.json", JSON.stringify(apps));

  res.json({
    status: true,
    message: "განცხადება წაიშალა წარმატებით!",
    result: result,
  });
});

app.listen(port, () => {
  console.log(`My app listening on port ${port}`);
});
