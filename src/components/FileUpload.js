import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('');

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', fileName);
        try {
            const response = await axios.post(
                'http://localhost:8000/api/file/create',
                formData,
            );
            console.log('response: ', response);
        } catch (error) {
            console.log('error: ', error);
        }
    };

    return (
        <div className="App">
            <input type="file" onChange={saveFile} />
            <button onClick={uploadFile}>Upload</button>
        </div>
    );
};

export default FileUpload;
