import { useEffect, useState } from "react";
import { fetchData } from "./FetchData";

const App = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState(false);
  const [newData, setNewData] = useState({
    _id: "",
    name: "",
    dob: "",
    class: "",
    phone: "",
    address: ""
  });
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetchData.get('http://localhost:8000/students/');
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
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
      const response = await fetchData.post('http://localhost:8000/students/', newData);
      setData((prevData) => [...prevData, response]);
      setNewData({
        _id: "",
        name: "",
        dob: "",
        class: "",
        phone: "",
        address: ""
      });
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetchData.put(`http://localhost:8000/students/${newData._id}`, newData);
      setData((prevData) => prevData.map(student => student._id === newData._id ? response : student));
      setNewData({
        _id: "",
        name: "",
        dob: "",
        class: "",
        phone: "",
        address: ""
      });
    } catch (error) {
      console.error('Error editing data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const success = await fetchData.delete(`http://localhost:8000/students/${id}`);
      if (success) {
        setData((prevData) => prevData.filter(student => student._id !== id));
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const toAdd = () => {
    setForm(true);
    setEdit(false);
    setNewData({
      _id: "",
      name: "",
      dob: "",
      class: "",
      phone: "",
      address: ""
    });
  };

  const toEdit = (currentData) => {
    setForm(true);
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
    <div>
      <button onClick={toAdd}>ADD</button>
      <div>
        {form && (
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={newData.name} onChange={handleChange} /><br /><br />
            </label>
            <label>
              D.O.B:
              <input type="text" name="dob" value={newData.dob} onChange={handleChange} /><br /><br />
            </label>
            <label>
              Class:
              <input type="text" name="class" value={newData.class} onChange={handleChange} /><br /><br />
            </label>
            <label>
              Phone:
              <input type="text" name="phone" value={newData.phone} onChange={handleChange} /><br /><br />
            </label>
            <label>
              Address:
              <input type="text" name="address" value={newData.address} onChange={handleChange} /><br /><br />
            </label>
            <input type="submit" />
          </form>
        )}
      </div>
      {data.map((d, index) => (
        <div key={index}>
          <h1>{d.name}</h1>
          <p>ID: {d._id}</p>
          <p>DOB: {d.dob}</p>
          <p>Class: {d.class}</p>
          <p>Phone: {d.phone}</p>
          <p>Address: {d.address}</p>
          <button onClick={() => toEdit(d)}>Edit</button>
          <button onClick={() => handleDelete(d._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;

// import { useEffect, useState } from "react";
// import { fetchData } from "./FetchData";

// const App = () => {
//   const [data, setData] = useState([]);
//   const [form, setForm] = useState(false);
//   const [newData, setNewData] = useState({
//     _id: "",
//     name: "",
//     dob:"",
//     class:"",
//     phone: "",
//     address:""
//   });
//   const [isEdit, setEdit] = useState(false);

//   useEffect(() => {
//     const fetchAPI = async () => {
//       try {
//         const responce = await fetchData.get('http://localhost:8000/students/');
//         setData(responce);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchAPI();
//   }, []);

//   function handleChange (event){
//     const {name, value} = event.target;
//     setNewData(preValue => (
//      {
//        ...preValue , [name]:value 
//      }
//     ));
//  }

//   async function handleAdd () {
//     try {
//       const response = await fetchData.post('http://localhost:8000/students/', newData);
//       setData(prevData => [...prevData, response]);
//       setNewData({
//         _id: "",
//         name: "",
//         dob: "",
//         class: "",
//         phone: "",
//         address: ""
//       });
//     } catch (error) {
//       console.error('Error submitting data:', error);
//     }
//   }

//   async function handleEdit () {
//     try {
//       const response = await fetchData.put(`http://localhost:8000/students/${ toEdit._id }`, toEdit);
//       console.log(toEdit);
//       // setData(response.split());
//       setNewData({
//         _id: "",
//         name: "",
//         dob: "",
//         class: "",
//         phone: "",
//         address: ""
//       });
//     } catch (error) {
//       console.error('Error editing data:', error);
//     }
//   }
  
//   const handleDelete = async (id) => {
//     try {
//       const success = await fetchData.delete(`http://localhost:8000/students/${id}`);
//       console.log(success);
//        if(success){
//         setData(() => data.filter(student => student._id !== id));
//        }
//     } catch (error) {
//       console.error('Error deleting data:', error);
//     }
//   }
  
//   function toAdd () {
//     setForm(true);
//      setEdit(false);
//   }

//   function toEdit (currentData) {
//     setForm(true);
//     setEdit(true);
//     setNewData(currentData);
//     console.log(newData);
//     // return editedData ;
//   }
  
//   async function handleSubmit (event) {
//     event.preventDefault();
//     isEdit === true ? handleEdit() : handleAdd() ;
//     setForm(false);
//   }

//     return (
//       <div>
//         <button onClick={ toAdd }>ADD</button>
//         <div>
//         {form === true ? 
//           <form onSubmit={handleSubmit}>
//             <label> Name:
//               <input type="text" name="name" value={newData.name} onChange={handleChange} /> <br/> <br/>
//             </label>
//             <label> D.O.B:
//               <input type="text" name="dob" value={newData.dob} onChange={handleChange} /> <br/> <br/>
//             </label>
//             <label> Class:
//               <input type="text" name="class" value={newData.class} onChange={handleChange} /> <br/> <br/>
//             </label>
//             <label> Phone:
//               <input type="text" name="phone" value={newData.phone} onChange={handleChange} /> <br/> <br/>
//             </label>
//             <label> Address:
//               <input type="text" name="address" value={newData.address} onChange={handleChange} /> <br/> <br/>
//             </label>
//             <input type="submit" />
//           </form> : null 
//         }
          
//         </div>
//       {data.map((d, index) => (
//         <div key={index}>
//           <h1>{d.name}</h1>
//           <p>ID: {d._id}</p>
//           <p>DOB: {d.dob}</p>
//           <p>Class: {d.class}</p>
//           <p>Phone: {d.phone}</p>
//           <p>Address: {d.address}</p>
//           <button onClick={() => toEdit(d)}> Edit </button>
//           <button onClick={() => handleDelete(d._id)}> Delete </button>
//         </div>
//       ))}
//     </div>
//     );
// }

// export default App;


      