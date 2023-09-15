import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const FileUpload = () => {
    const [fileName, setFileName] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [errorMsg, setErrorMsg] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const saveFile = (e) => {
        if (e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    const access_token = localStorage.getItem('token');
    const uploadFile = async () => {
        const maxFileSize = 2 * 1024 * 1024;
        if (!selectedFile) {
            setErrorMsg('Please choose a file');
            setIsSuccess(false);
            return;
        }

        const fileSizeKiloBytes = selectedFile.size / 1024;

        if (fileSizeKiloBytes > maxFileSize) {
            setErrorMsg(`Please upload less than ${maxFileSize} MB`);
            setIsSuccess(false);
            return;
        }

        setErrorMsg('');
        setIsSuccess(true);
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('fileName', fileName);
        try {
            const response = await axios.post(
                'http://localhost:8000/api/file/create',
                formData,
                {
                    headers: {
                        Authorization: `${access_token}`,
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            if (response.status == 200) {
                toast.success('Your file upload successfully');
            }
        } catch (error) {
            console.log('error: ', error);
        }
    };

    return (
        <div className="App">
            <input type="file" onChange={saveFile} />
            <p className="error-message">{errorMsg}</p>
            <button className='btn btn-primary' onClick={uploadFile}>Upload</button>
        </div>
    );
};

export default FileUpload;
