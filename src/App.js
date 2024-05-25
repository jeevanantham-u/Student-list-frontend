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

  function createCard(student) {
    return(
      <Card
        name ={student.name}
        dob={student.dob}
        class={student.class}
        phone={student.phone}
        address={student.address}
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
};

export default App
