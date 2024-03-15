const classes = [];
class Class {
  constructor(id, grade) {
    this.id = id;
    this.grade = grade;
    this.teacherId = null;
  }

  static getAll() {
    return classes;
  }

  save() {
    classes.push(this);
  }

  assignTeacher(teacherId) {
    this.teacherId = teacherId;
  }
}

export default Class;
