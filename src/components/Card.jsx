import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

const Card = (props) => {
    
  return (
    <>
    <div className="card">
        <ul className="card-details">
            <li>Name: {props.name}</li>
            <li>D.O.B: {props.dob}</li>
            <li>Class: {props.class}</li>
            <li>Phone: {props.phone}</li>
            <li>Addess: {props.address}</li>
        </ul>
        <div className="card-btns" >
          <button><FaEdit /></button>
          <button><AiFillDelete /></button>
        </div>
    </div>
    </>
  )
}

export default Card;