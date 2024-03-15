import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import Teacher from "./teacher.js";
import Class from "./class.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post("/api/teachers", (req, res) => {
  const { id, name, subject } = req.body;
  const teacher = new Teacher(id, name, subject);
  teacher.save();
  res.status(201).json(teacher);
});

app.post("/api/classes", (req, res) => {
  const { id, grade, subject } = req.body;
  const newClass = new Class(id, grade, subject);
  newClass.save();
  res.status(201).json(newClass);
});

app.post("/api/teachers/:teacherId/classes/:classId", (req, res) => {
  const { teacherId, classId } = req.params;
  const teacher = Teacher.getAll().find((t) => t.id === teacherId);
  if (!teacher) {
    return res.status(404).json({ message: "Teacher not found" });
  }
  teacher.addClass(classId);
  res.status(200).json(teacher);
});

app.get("/api/teachers", (req, res) => {
  const teachers = Teacher.getAll();
  res.json(teachers);
});

app.get("/api/classes", (req, res) => {
  const classes = Class.getAll();
  res.json(classes);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
