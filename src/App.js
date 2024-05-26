import React, {useEffect, useState} from 'react';
import Card from './components/Card';
import Header from './components/Header';
import { fetchData } from './FetchData';

const App = () => {
  
  const [data, setData] = useState([]);

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

  
  const deleteStudent = (id) => {
    fetch(`http://localhost:8000/students/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setData(data.filter(d => d._id !== id));
      } else {
        console.error('Failed to delete item');
      }
    });
  };

  function createCard(student) {
    return(
      <Card
        key = {student._id}
        id = {student._id}
        name ={student.name}
        dob={student.dob}
        class={student.class}
        phone={student.phone}
        address={student.address}
        toDelete = {deleteStudent}
      />
    );
  }

    return (
      <>
        <Header />
        <div className='cards-wrapper'>
          {data.map(createCard)}
        </div>
        <p>Jeeva@copyrights2024</p>
      </>
    );
}

export default App;

// import 'devextreme/dist/css/dx.light.css';
 
// import {
//     DataGrid,
// } from 'devextreme-react/data-grid';
      // <DataGrid
      //   allowColumnReordering={true} 
      //   dataSource={data}
      //   keyExpr="_id">
      // </DataGrid>
