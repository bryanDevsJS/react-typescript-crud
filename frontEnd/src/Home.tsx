import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';

function Home() {

    const[data, setData] = useState([]);

useEffect(() => {
    axios.get('http://localhost:8081/')
    .then(response => setData(response.data))
    .catch(error => console.log(error));
    }, []);

    const handleDelete = (id: any) => {
        axios.delete(`http://localhost:8081/delete-student/${id}`)
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }


  return (

        <div>
          <table className='table-auto mx-auto'>
              <caption>Users <Link to='/create' className='text-white bg-green-500 rounded-sm px-8 mx-2 my-2'>Add</Link></caption>
              <thead>
                  <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Email</th>
                  </tr>
              </thead>
              <tbody>
                  {data.map((studentItem: any) => (
                      <tr key={studentItem.id}>
                          <td>{studentItem.id}</td>
                          <td>{studentItem.name}</td>
                          <td>{studentItem.email}</td>
                          <td>
                              <Link to={`/view-student/${studentItem.id}`} className='text-white bg-blue-500 rounded-sm px-8 mx-2 my-2'>View</Link>
                              <Link to={`/update-student/${studentItem.id}`} className='text-white bg-purple-500 rounded-sm px-8 mx-2 my-2'>Edit</Link>
                              <button onClick={() => handleDelete(studentItem.id)} className='text-white bg-red-500 rounded-sm px-8 mx-2 my-2 hover:cursor-pointer'>Delete</button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
          </div>
 
  )
}

export default Home;