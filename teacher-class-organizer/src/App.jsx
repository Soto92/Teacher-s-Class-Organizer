import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const BASE_URL = 'http://localhost:5000';

  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [newTeacherData, setNewTeacherData] = useState({ id: '', name: '', subject: '' });
  const [newClassData, setNewClassData] = useState({ id: '', grade: '' });
  const [selectedTeacherId, setSelectedTeacherId] = useState('');

  const fetchData = async () => {
    Promise.all([
      axios.get(`${BASE_URL}/api/teachers`),
      axios.get(`${BASE_URL}/api/classes`)
    ])
    .then(([teachersResponse, classesResponse]) => {
      setTeachers(teachersResponse.data);
      setClasses(classesResponse.data);
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });
  }

  useEffect(() => {
   fetchData()
  }, []);

  const handleAddTeacher = () => {
    axios.post(`${BASE_URL}/api/teachers`, newTeacherData)
      .then(response => {
        setTeachers([...teachers, response.data]);
        setNewTeacherData({ id: '', name: '', subject: '' });
      })
      .catch(error => {
        console.error('Error adding teacher: ', error);
      });
  };

  const handleAddClass = () => {
    axios.post(`${BASE_URL}/api/classes`, newClassData)
      .then(response => {
        setClasses([...classes, response.data]);
        setNewClassData({ id: '', grade: '' });
      })
      .catch(error => {
        console.error('Error adding class: ', error);
      });
  };

  const handleAssignTeacher = (classId) => {
    if (selectedTeacherId === '') {
      alert('Please select a teacher to assign.');
      return;
    }
    axios.post(`${BASE_URL}/api/teachers/${selectedTeacherId}/classes/${classId}`)
      .then(response => {
        const updatedClasses = classes.map(cls => {
          if (cls.id === classId) {
            return response.data;
          }
          return cls;
        });
        setClasses(updatedClasses);
      })
      .catch(error => {
        console.error('Error assigning teacher to class: ', error);
      });
  };

  return (
    <div>
      <h1>Teacher's Class Organizer/Optimizer</h1>

      <h2>Add Teacher:</h2>
      <input
        type="text"
        placeholder="ID"
        value={newTeacherData.id}
        onChange={e => setNewTeacherData({ ...newTeacherData, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Name"
        value={newTeacherData.name}
        onChange={e => setNewTeacherData({ ...newTeacherData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Subject"
        value={newTeacherData.subject}
        onChange={e => setNewTeacherData({ ...newTeacherData, subject: e.target.value })}
      />
      <button onClick={handleAddTeacher}>Add Teacher</button>

      <h2>Add Class:</h2>
      <input
        type="text"
        placeholder="ID"
        value={newClassData.id}
        onChange={e => setNewClassData({ ...newClassData, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Grade"
        value={newClassData.grade}
        onChange={e => setNewClassData({ ...newClassData, grade: e.target.value })}
      />
      <button onClick={handleAddClass}>Add Class</button>

      <h2>Assign Teacher to Class:</h2>
      <select value={selectedTeacherId} onChange={e => setSelectedTeacherId(e.target.value)}>
        <option value="">Select Teacher</option>
        {teachers.map(teacher => (
          <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
        ))}
      </select>
      <ul>
        {classes.map(cls => (
          <li key={cls.id}>
            {cls.grade} - Assigned Teacher: {cls.teacherId ? teachers.find(t => t.id === cls.teacherId)?.name : 'None'}
            <button onClick={() => handleAssignTeacher(cls.id)}>Assign Teacher</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
