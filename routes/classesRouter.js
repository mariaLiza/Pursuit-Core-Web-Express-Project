const classesRouter = require("express").Router()
const mySchool = require("./../School.js")
const Student = require("./../Student.js")

classesRouter.post("/", (req, res) => {
  res.json(req.body)
})

classesRouter.post("/add", (req, res) => {
  let classNames = req.body.name
  if (mySchool.classes[classNames]) {
    res.json({
      error: "Please fill out all the information for the student",
      timestamp: "YYYY, MM/DD HH:MM:SS"
    })
  } else {
    mySchool.addClass(req.body.name, req.body.teacher)
    console.log(mySchool)
    res.json({
      class: {
        name: `${req.body.name}`,
        teacher: `${req.body.teacher}`,
        students: []
      },
      message: "Created a new class",
      timestamp: "YYYY, MM/DD HH:MM:SS"
    })
  }
})

classesRouter.get("/:className/students", (req, res) => {
  let city = req.query.city
  let failing = req.query.failing

  let className = req.params.className
  // let arr = mySchool.classes[className].students
  // if (city !== undefined) {
  //   arr = arr.filter(s => s.city === city)
  // }
  // if (failing !== undefined && failing === "true") {
  //   arr = arr.filter(s => s.grade < 70)
  // }
  let arr = mySchool.getStudentsByClassWithFilter(className, failing, city);
  res.json(arr)
})

classesRouter.post("/:className/enroll", (req, res) => {
  let className = req.params.className
  let name = req.body.name
  let age = req.body.age
  let city = req.body.city
  let grade = req.body.grade

  let studentArr = mySchool.classes[className].students
  let student = studentArr.find(s => s.name === name)

  if (student === undefined) {
    let newStudent = new Student(name, age, city, grade)
    mySchool.enrollStudent(className, newStudent)
    console.log(mySchool)
    res.json(newStudent)
  } else {
    student.name = name
    student.age = age
    student.city = city
    student.grade = grade
    console.log(mySchool)
    res.json(student)
  }
})

module.exports = classesRouter
