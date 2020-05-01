const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const request = require("request");
const translate = express();

translate.use(cors({ origin: true }));

translate.post("/", (req, res) => {
  const { source, target, text } = req.body;
  const url = "https://openapi.naver.com/v1/papago/n2mt";
  const options = {
    url: url,
    form: { source, target, text },
    headers: {
      "X-Naver-Client-Id": "dthMmpuNMs5iEyNLDiyv",
      "X-Naver-Client-Secret": "3c34S4irxO",
    },
  };

  request.post(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log(`error = ${response.statusCode}`);
    }
  });
});

exports.translate = functions.https.onRequest(translate);
