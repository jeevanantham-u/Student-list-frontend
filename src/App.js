import { useEffect, useState } from "react";
import { fetchData } from "./FetchData";

const App = () => {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({
    name: "",
    dob:"",
    class:"",
    phone: "",
    address:""
  });

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await fetchData.get('http://localhost:8000/students/');
        setData(res);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchAPI();
  }, []);
  
  const handleDelete = async (id) => {
    try {
      const success = await fetchData.delete(`http://localhost:8000/students/${id}`);
      console.log(success);
       if(success){
        setData(() => data.filter(student => student._id !== id));
       }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }

  function handleChange (event){
     const {name, value} = event.target;
     setNewData(preValue => (
      {
        ...preValue , [name]:value 
      }
     ));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetchData.post('http://localhost:8000/students/', newData);
      setData(prevData => [...prevData, response]);
      setNewData({
        name: "",
        dob: "",
        class: "",
        phone: "",
        address: ""
      });
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  }

    return (
      <div>
        <button>ADD</button>
        <form onSubmit={handleSubmit}>
          <label> Name:
            <input type="text" name="name" value={newData.name} onChange={handleChange} /> <br/>
          </label>
          <label> D.O.B:
            <input type="text" name="dob" value={newData.dob} onChange={handleChange} /> <br/> 
          </label>
          <label> Class:
            <input type="text" name="class" value={newData.class} onChange={handleChange} /> <br/>
          </label>
          <label> Phone:
            <input type="text" name="phone" value={newData.phone} onChange={handleChange} /> <br/>
          </label>
          <label> Address:
            <input type="text" name="address" value={newData.address} onChange={handleChange} /> <br/>
          </label>
          <input type="submit" />
        </form>
      {data.map((d, index) => (
        <div key={index}>
          <h1>{d.name}</h1>
          <p>ID: {d._id}</p>
          <p>DOB: {d.dob}</p>
          <p>Class: {d.class}</p>
          <p>Phone: {d.phone}</p>
          <p>Address: {d.address}</p>
          <button onClick={() => handleDelete(d._id)}> Delete </button>
        </div>
      ))}
    </div>
    );
}

export default App;



      