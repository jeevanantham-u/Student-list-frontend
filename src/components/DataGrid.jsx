import 'devextreme/dist/css/dx.light.css';
import {
    DataGrid,
} from 'devextreme-react/data-grid';


const DataGrid = () => {
  return (
    <>
        <DataGrid
            allowColumnReordering={true} 
            dataSource={data}
            keyExpr="_id">
        </DataGrid> 
    </>
  )
}

export default DataGrid