import {
    DataGrid,
    Column
} from 'devextreme-react/data-grid';

import 'devextreme/dist/css/dx.light.css';

import { useState, useEffect, useCallback } from 'react';
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

      const [collapsed, setCollapsed] = useState(true);
      const onContentReady = useCallback(
        (e) => {
          if (collapsed) {
            e.component.expandRow(['EnviroCare']);
            setCollapsed(false);
          }
        },
        [collapsed],
      );

    
  return (
    <div className='table-wrapper'>
      <DataGrid
      dataSource={data}
      keyExpr="_id"
      showBorders={true}
      width="60%"
      onContentReady={onContentReady}
      >
        <Column dataField="name" caption="Name"  width= 'auto' />
        <Column dataField="dob" caption="DOB"  width= 'auto' />
        <Column dataField="gender" caption="Gender"  width= 'auto' />
        <Column dataField="email" caption="E-mail"  width= 'auto' />
      </DataGrid>
    </div> 
  )
}

export default Table;