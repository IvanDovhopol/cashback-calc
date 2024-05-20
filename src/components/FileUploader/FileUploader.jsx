import React, { useState } from 'react';
import axios from 'axios';

export const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = e => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Файл не загружен!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await axios.post(`https://cashback-calc-mlr6.onrender.com/`, formData, {
        // await axios.post(`http://localhost:3001/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div style={{ marginLeft: 15 }}>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Загрузить</button>
    </div>
  );
};
