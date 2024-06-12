import { useEffect, useState } from "react";
import { fetchData } from "../FetchData";
import { ClipLoader } from 'react-spinners';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

const FormData = () => {
  const url = "https://student-list-c0ck.onrender.com";
  const [data, setData] = useState([]);
  const [form, setForm] = useState(false);
  const [formBtn, setFormBtn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newData, setNewData] = useState({
    _id: "",
    name: "",
    dob: "",
    gender: "",
    email: "",
  });
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetchData.get(`${url}/students/`);
        setData(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchAPI();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewData((prevValue) => ({
      ...prevValue,
      [name]: value
    }));
  };

  const handleAdd = async () => {
    try {
      const response = await fetchData.post(`${url}/students/`, newData);
      setData((prevData) => [...prevData, response]);
      setNewData({
        _id: "",
        name: "",
        dob: "",
        gender: "",
        email: ""
      });
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetchData.put(`${url}/students/${newData._id}`, newData);
      setData((prevData) => prevData.map(student => student._id === newData._id ? response : student));
      setNewData({
        _id: "",
        name: "",
        dob: "",
        gender: "",
        email: "",
      });
    } catch (error) {
      console.error('Error editing data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const success = await fetchData.delete(`${url}/students/${id}`);
      if (success) {
        setData((prevData) => prevData.filter(student => student._id !== id));
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const toAdd = () => {
    if(!form){
      setForm(true);
      setFormBtn(true);
    } else {
      setForm(false);
    }
    setEdit(false);
    setNewData({
      _id: "",
      name: "",
      dob: "",
      gender: "",
      email: "",
    });
  };

  const toEdit = (currentData) => {
    if(!form){
      setForm(true);
      setFormBtn(false);
    } 
    setEdit(true);
    setNewData(currentData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEdit) {
      await handleEdit();
    } else {
      await handleAdd();
    }
    setForm(false);
  };

  return (


    <div className="main">
      <div>
        <div id="btn-form-wrapper">
        <div className="btn">
          <Button onClick={toAdd} variant="contained" endIcon={<AddToPhotosIcon />}>
              Add
            </Button>
        </div>
        <div className="form">
          {form && (
                <form onSubmit={handleSubmit} id='edit-form'>
                  <label>
                    Name: 
                    <input type="text" name="name" value={newData.name} onChange={handleChange} /><br /><br />
                  </label>
                  <label>
                    D.O.B:
                    <input type="text" name="dob" value={newData.dob} onChange={handleChange} /><br /><br />
                  </label>
                  <label>
                    Gender:
                    <input type="text" name="gender" value={newData.gender} onChange={handleChange} /><br /><br />
                  </label>
                  <label>
                    E-mail:
                    <input type="email" name="email" value={newData.email} onChange={handleChange} /><br /><br />
                  </label>
                  <Button type="submit" variant="contained" endIcon={<AddToPhotosIcon />}>
                    {(formBtn) ? 'Add' : 'Edit'}
                  </Button>
                </form>
              )}
        </div>
        </div>

        {(loading) ? <div id='loader-container'>
                      <ClipLoader color="#123abc" loading={true} size={150} />
                     </div> 
        : <div className="cards-wrapper">
          {data.map((d, index) => (
            <div key={index} className="cards">
              <h1>{d.name}</h1>
              <p>ID: {d._id}</p>
              <p>DOB: {d.dob}</p>
              <p>gender: {d.gender}</p>
              <p>E-mail: {d.email}</p>
              <Stack direction="row" spacing={2}>
                <Button onClick={() => handleDelete(d._id)} variant="outlined" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
                <Button onClick={() => toEdit(d)} variant="contained" endIcon={<SendIcon />}>
                  Edit
                </Button>
              </Stack>
            </div>
          ))}
        </div>
         }   
      </div>
    </div>
  
  );
}

export default FormData;

      