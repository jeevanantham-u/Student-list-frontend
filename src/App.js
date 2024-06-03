import { useEffect, useState } from "react";
import { fetchData } from "./FetchData";

const App = () => {
  const [data, setData] = useState([]);
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
      if (success) {
        // Update state to remove the deleted item
        setData(prevData => prevData.filter(student => student.id !== id));
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }
    return (
      <div>
      {data.map((d, index) => (
        <div key={index}>
          <h1>{d.name}</h1>
          <p>ID: {d._id}</p>
          <p>DOB: {d.dob}</p>
          <p>Class: {d.class}</p>
          <p>Phone: {d.phone}</p>
          <p>Address: {d.address}</p>
          <button onClick={() => handleDelete(d._id)}> D elete </button>
        </div>
      ))}
    </div>
     
    );
}

export default App;



      