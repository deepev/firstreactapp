import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const FileList = () => {
    const [fileNames, setFileNames] = useState([]);
    const base_url = 'http://localhost:8000/api';
    const access_token = localStorage.getItem('token');

    useEffect(() => {
        axios
            .get(`${base_url}/file/list`, {
                headers: {
                    Authorization: `${access_token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(({ data }) => {
                setFileNames(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    

    const FileTable = () => {
        return fileNames?.data?.map((file, index) => {
            return <tr key={file.id}>
                <td>{index + 1}</td>
                <td>{file.name}</td>
                <td>
                    <Link to={`/file/get/${file._id}`} className='btn btn-sm btn-info'>
                        View
                    </Link>
                    <Link to={`/file/remove/${file._id}`} className='btn btn-sm btn-danger'>
                        Delete
                    </Link>
                </td>
            </tr>;
        });
    };

    return (
        <div className="container mt-5">
            <h1> Your file List</h1>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {FileTable()}
                </tbody>
            </table>
        </div>
    );
};

export default FileList;
