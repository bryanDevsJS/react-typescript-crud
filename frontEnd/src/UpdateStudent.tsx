import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Student {
  id: number;
  name: string;
  email: string;
}

function UpdateStudent() {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // this will be used to navigate to the home page after the form is submitted

  useEffect(() => {
    axios
      .get(`http://localhost:8081/view-student/${id}`)
      .then((res) => {
        setStudent(res.data);
        setError(null);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError("Student not found.");
        } else {
          setError("Failed to load student data.");
        }
        console.error(error);
      });
  }, [id]);

  const [values, setValues] = useState({
    name: student?.name || "",
    email: student?.email || "",
  });

  useEffect(() => {
    if (student) {
      setValues({
        name: student.name,
        email: student.email,
      });
    }
  }, [student]);

  function handleUpdate(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    axios
      .put(`http://localhost:8081/update-student/${id}`, student)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {student ? (
        <form className="mx-auto" onSubmit={handleUpdate}>
          <label className="mx-2">Name</label>
          <input
            type="text"
            name="stud_name"
            className="mx-2 border-1 rounded-sm"
            value={values.name}
            onChange={(e) => setStudent({ ...student, name: e.target.value })}
          />
          <label className="mx-2">Email</label>
          <input
            type="email"
            name="stud_email"
            className="mx-2 border-1 rounded-sm"
            value={values.email}
            onChange={(e) => setStudent({ ...student, email: e.target.value })}
          />

          <button className="text-white bg-green-500 rounded-sm px-8 mx-2 my-2 hover:cursor-pointer">
            Save
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UpdateStudent;
