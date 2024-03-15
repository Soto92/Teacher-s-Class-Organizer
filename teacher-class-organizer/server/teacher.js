const teachers = [];

class Teacher {
  constructor(id, name, subject) {
    this.id = id;
    this.name = name;
    this.subject = subject;
    this.classes = [];
  }

  addClass(classId) {
    this.classes.push(classId);
  }

  static getAll() {
    return teachers;
  }

  save() {
    teachers.push(this);
  }
}
export default Teacher;
