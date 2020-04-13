const express = require("express");
const app = express();

app.use(express.urlencoded())
app.use(express.json());
app.use(express.static("public"));

const port = process.env.PORT || 3000;

app.post("/gonder", (req, res) => {
  console.log(req.body);
  res.send("ok");
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
