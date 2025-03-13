import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface Student {
    id: number;
    name: string;
    email: string;
}

function ViewStudent() {
    // Get the ID from the URL parameters
    const { id } = useParams<{ id: string }>();
    const [student, setStudent] = useState<Student | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`http://localhost:8081/view-student/${id}`)
            .then(res => {  
                setStudent(res.data);
                setError(null);
             })
             .catch(error => {
                if (error.response && error.response.status === 404) {
                  setError("Student not found.");
                } else {
                  setError("Failed to load student data.");
                }
                console.error(error);
              });
      }, [id]);

    return (
        <div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {student ? (
            <>
                <h1>Student Details</h1>
                <p>Name: {student.name}</p>
                <p>Email: {student.email}</p>
                <Link to={`/update-student/${student.id}`} className='text-white bg-purple-500 rounded-sm px-8 mx-2 my-2'>Edit</Link>
                <Link to='/' className='text-white bg-blue-500 rounded-sm px-8 mx-2 my-2'>Back</Link>
            </>
        ) : !error ? (
            <p>Loading...</p>
        ) : null}
    </div>
);
}

export default ViewStudent;