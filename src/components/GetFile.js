import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GetFile = () => {
    const { id } = useParams();

    const fileDetails = async () => {
        try {
            const response = await axios.get(
                `http://localhost:4000/api/file/get/${id}`,
            );
        } catch (error) {
            console.log('error: ', error);
        }
    };

    return (
        <div>
            {/* <h1>{thisProduct.name}</h1>
            <p>Price: ${thisProduct.price}</p>
            <p>{thisProduct.description}</p> */}
        </div>
    )
};

export default GetFile;
