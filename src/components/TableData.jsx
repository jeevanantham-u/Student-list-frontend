import { useState } from 'react';
import EditForm from './EditForm';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

const TableData = (props) => {

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [data, setData] = useState({ ...props });

  function toDelete(){
    return(
      props.delete(props.id)
    );
  }

  return (
    <>
      <tr>
        <td><input type="checkbox" value={props._id} /></td>
        <td>{props.name}</td>
        <td>{props.dob}</td>
        <td>{props.class}</td>
        <td>{props.phone}</td>
        <td>{props.address}</td>
        <td>
          <button type="button" className="button" onClick={() => setOpen(o => !o)}> 
            <FaEdit />
          </button>
          <Popup open={open} closeOnDocumentClick onClose={closeModal}>
            <div className="modal"> 
              <a className="close" onClick={closeModal} href='#'> <FaEdit /></a>   
              <EditForm
                id = {data.id}
                name= {data.name}
                dob= {data.dob}
                class= {data.class}
                phone= {data.phone}
                address= {data.address}
              />    
            </div>      
          </Popup>
        </td>
        <td>
        <button onClick={toDelete}><AiFillDelete /></button></td>
      </tr>
    </>
  )
}

export default TableData;