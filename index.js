const express = require("express");
const bodyParser = require("body-parser");

const { course, courses, button } = require("./data.js");

const PORT = 3000;
const app = express();

app.use(express.json({ extended: false }));
app.use(express.static("./views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  return res.render("home.ejs", {
    courses: courses,
    course: course,
    button: button,
  });
});

app.post("/post-or-put-data", (req, res) => {
  console.log(req.body);
  if(req.body.btn === "Insert"){
    courses.push(req.body);
  }
  else{
    let courseFound = courses.find((c) => (c.id = req.body.id));
    courseFound.id = req.body.id;
    courseFound.name = req.body.name;
    courseFound.course_type = req.body.course_type;
    courseFound.semester = req.body.semester;
    courseFound.department = req.body.department;
    courseFound.file = req.body.file;

    course.id = "";
    course.name = "";
    course.course_type = "";
    course.semester = "";
    course.department = "";
    course.file = "";
  }
  button.value = "Insert";
  return res.redirect("/");
});

app.get("/update-data/:id", (req, res) => {
  let courseFound = courses.find((c) => (c.id = req.params.id));
  course.id = courseFound.id;
  course.name = courseFound.name;
  course.course_type = courseFound.course_type;
  course.semester = courseFound.semester;
  course.department = courseFound.department;
  course.file = courseFound.file;
  button.value = "Update";
  return res.redirect("/");
});

app.get("/delete-data/:id", (req, res) => {
    let index = courses.map(c => c.id).indexOf(req.params.id)
    courses.splice(index,1)
    return res.redirect("/");
  });

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
