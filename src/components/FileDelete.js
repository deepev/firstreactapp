import axios from 'axios';
import React from 'react';
import { Button } from 'bootstrap';

const FileDelete = (props) => {
    const { _id, name } = props.obj;

    const FileDelete = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:4000/api/file/get/${_id}`,
            );
            if (response.status == 200) {
                alert('File Deleted Successfully');
                window.location.reload();
            }
            throw new Error('Something Went Wrong');
        } catch (error) {
            console.log('error: ', error);
        }
    };

    return (
        <tr>
            <td>{name}</td>
            <td>
                <Button onClick={FileDelete} size="sm" variant="danger">
                    Delete
                </Button>
            </td>
        </tr>
    );
};

export default FileDelete
