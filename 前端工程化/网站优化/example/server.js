const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.resolve(__dirname, "./assert")));

app.listen(3000, (error) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log("listening 3000");
});
