import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const GetFile = () => {
    const { id } = useParams();
    const [fileName, setFileName] = useState(null);
    const [filePath, setFilePath] = useState(null);
    const access_token = localStorage.getItem('token');

    const fileDetails = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/file/get/${id}`,
                {
                    headers: {
                        Authorization: `${access_token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setFileName(data.data.originalName);
            setFilePath(data.data.path);
        } catch (error) {
            console.log('error: ', error);
        }
    };

    useEffect(() => {
        fileDetails();
    })

    return (
        <div>
            <h1>File Information</h1>
            <p>fileName: {fileName}</p>
            <p>uploadPath: {filePath}</p>
            <Link to={'/file-list'} className='btn btn-sm btn-info'> Back</Link>
        </div>
    )
};

export default GetFile;
