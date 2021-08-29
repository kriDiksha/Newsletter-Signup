const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res) {
  var Name = req.body.name;
  var email = req.body.email;
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: Name
      }
    }]
  };
  var jsonData = JSON.stringify(data);
  var options = {
    url: "https://us5.api.mailchimp.com/3.0/lists/166d2749b9",
    method: "POST",
    headers: {
      "Authorization": "valk1 aa3db8e7e1bcd93a4cfa4ccd0ac9b756-us5"
    },
    body: jsonData
  };
  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});


app.listen(3000, function() {
  console.log("server is running on port 3000");
  console.log(__dirname);
});







// aa3db8e7e1bcd93a4cfa4ccd0ac9b756-us5
//166d2749b9
