const express = require("express");
const app = express();
const { Client } = require("pg");
const { Template } = require("ejs");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;
const client = new Client({
	user: "postgres",
	host: "localhost",
	database: "solutionbuddy",
	password: "blah",
	port: 5432,
  });
app.set("view engine", "ejs");
function removeWhiteSpaceFromEnd(title) {
	var size = title.length;
	while (title[size - 1] == " ") {
	  size--;
	}
	var temp = "";
	for (let j = 0; j < size; j++) {
	  temp += title[j];
	}
	return temp;
  }
app.get("/", (req, res) => {
  // res.send('Welcome to solutionBuddy!');
  res.render("root");
});
app.get("/postIssue", (req, res) => {
//   res.render("newissue");
	res.sendFile("views/newissue.html", { root: __dirname });
});
app.post("/issue", (req, res) => {
  const first = req.body.firstName;
  const firstname = removeWhiteSpaceFromEnd(first);
  const last = req.body.lastName;
  const lastname = removeWhiteSpaceFromEnd(last);
  const mobileno = req.body.mobile;
  const email = req.body.email;
  const state = req.body.state;
  const district = req.body.district;
  const description = req.body.description;
  const profession = req.body.contacto;
//   console.log(firstname);
//   console.log(lastname);
	const insertquerry = `insert into problemstable(firstname, lastname, mobileno, email, state, district, description) 
	values('${firstname}', '${lastname}', '${mobileno}', '${email}', '${state}', '${district}', '${description}');`
	client.query(insertquerry, (err, res) => {
		if(err){
			console.log("Insertion in db failed", err);
		} else {
			console.log("Insertion successful");
		}
	})
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  client.connect();
  console.log(`connected to database: successfully`);
});
