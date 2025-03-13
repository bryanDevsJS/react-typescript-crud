import axios from 'axios';
import React, { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom';

function Create() {

    const [student, setStudent] = React.useState({
        name: '',
        email: ''
    })

    const navigate = useNavigate(); // this will be used to navigate to the home page after the form is submitted

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        axios.post('http://localhost:8081/student', student)
        .then(response => {
            console.log(response);
            navigate('/');
        })
        .catch(error => console.log(error));
    }


  return (
    
    <div>
      <form className='mx-auto' onSubmit={handleSubmit}>
        <label className='mx-2'>Name</label>
        <input type='text' name='stud_name' className='mx-2 border-1 rounded-sm' onChange={e => setStudent({...student, name: e.target.value}) } />
        <label className='mx-2'>Email</label>
        <input type='email' name='stud_email' className='mx-2 border-1 rounded-sm' onChange={e => setStudent({...student, email: e.target.value}) } />

        <button className='text-white bg-green-500 rounded-sm px-8 mx-2 my-2 hover:cursor-pointer'>Save</button>
      </form>
    </div>
  )
}

export default Create