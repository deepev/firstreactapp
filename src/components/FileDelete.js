import axios from 'axios';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const FileDelete = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const access_token = localStorage.getItem('token');
    const FileDelete = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/file/get/${id}`,
                {
                    headers: {
                        Authorization: `${access_token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status == 200) {
                toast.success('File Deleted Successfully');
                return navigate('/file-list')
            }
        } catch (error) {
            console.log('error: ', error);
        }
    };
    useEffect(() => {
        FileDelete()
    }, [])
    return (
        <div>
            <p>File deleted successfully</p>
        </div>
    );
};

export default FileDelete
