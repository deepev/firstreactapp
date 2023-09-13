import axios from 'axios';
import { useEffect, useState } from 'react';

const FileList = () => {
    const [fileNames, setFileNames] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/file/list')
            .then(({ data }) => {
                setFileNames(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    

    const FileTable = () => {
        return fileNames.map((file, index) => {
            <tr key={file.id}>
                <td>{index + 1}</td>
                <td>{file.name}</td>
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
