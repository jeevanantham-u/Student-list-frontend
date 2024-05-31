import {useEffect, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchData } from '../FetchData';
import TableData from "./TableData";

const Table = () => {

  const [data, setData] = useState([]);
  const notify = () => toast("Student Deleted");

  useEffect(() => {
    const apiURL = 'http://localhost:8000/students';
    
    fetchData(apiURL)
      .then(fetchedData => {
        setData(fetchedData);
      })
      .catch(err => {
        console.log(err)
      });
  }, []);

  function onDelete (id) {
    fetch(`http://localhost:8000/students/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setData(data.filter(d => d._id !== id));
        notify();
      } else {
        console.error('Failed to delete item');
      }
    });
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>D.O.B</th>
            <th>Roll.No</th>
            <th>Contact</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d)=> {
              return(
                <TableData
                  key= {d._id}
                  id= {d._id}
                  name= {d.name}
                  dob= {d.dob}
                  class= {d.class}
                  phone= {d.phone}
                  address={d.address}
                  delete={onDelete}
                />
              );
            })}
        </tbody>
          
      </table>
      <ToastContainer />
    </>
  )
}

export default Table;