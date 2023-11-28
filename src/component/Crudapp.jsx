import React, { useState } from 'react';

const Crudapp = () => {
  const [formData, setFormData] = useState({
    username: '',
    branch: '',
    grade: '',
    email: '',
  });

  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const Change = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const Submit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // editing, update 
      const updatedData = [...data];
      updatedData[editIndex] = formData;
      setData(updatedData);
      setEditIndex(null);
    } else {
      // not editing, add new
      setData([...data, formData]);
    }

    // Clear form
    setFormData({ username: '', branch: '', grade: '', email: '' });
  };

  const Edit = (index) => {
    // editing
    setFormData(data[index]);
    setEditIndex(index);
  };

  const Delete = (index) => {
    // Remove
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  return (
    <div>
      <h1>CRUD Application</h1>

      <form id="recordForm" onSubmit={Submit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={Change}
          />
        </label>
        <br />
        <label>
          Branch:
          <input
            type="text"
            name="branch"
            id="branch"
            value={formData.branch}
            onChange={Change}
          />
        </label>
        <br />
        <label>
          Grade:
          <input
            type="text"
            name="grade"
            id="grade"
            value={formData.grade}
            onChange={Change}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={Change}
          />
        </label>
        <br />
        <button type="submit">{editIndex !== null ? 'Update' : 'Submit'}</button>
      </form>

      <table border="1">
        <thead>
          <tr>
            <th>Username</th>
            <th>Branch</th>
            <th>Grade</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.username}</td>
              <td>{entry.branch}</td>
              <td>{entry.grade}</td>
              <td>{entry.email}</td>
              <td>
                <button onClick={() => Edit(index)}>Edit</button>
                <button id="btn" onClick={() => Delete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Crudapp;