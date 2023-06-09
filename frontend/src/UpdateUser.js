import React, { useState } from 'react';

const UpdateUser = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('image', image);

    try {
      const response = await fetch('/user', {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        // User update successful
        console.log('User updated successfully');
        // Do something else, such as redirecting to a different page
      } else {
        // User update failed
        console.error('User update failed');
      }
    } catch (error) {
      console.error('Error occurred during user update:', error);
    }
  };

  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Age:
          <input type="number" value={age} onChange={handleAgeChange} />
        </label>
        <br />
        <label>
          Image:
          <input type="file" onChange={handleImageChange} />
        </label>
        <br />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;
