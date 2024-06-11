import {
    DataGrid,
} from 'devextreme-react/data-grid';

import { useState, useEffect } from 'react';
import { fetchData } from '../FetchData';

const Table = () => {

    const url = "https://student-list-c0ck.onrender.com";
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
          try {
            const response = await fetchData.get(`${url}/students/`);
            setData(response);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchAPI();
      }, []);
    
  return (
    <DataGrid
        allowColumnReordering={true} 
        dataSource={data}
        keyExpr="_id">
    </DataGrid> 
  )
}

export default Table;