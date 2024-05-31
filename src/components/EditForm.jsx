import { useEffect, useState } from "react"

const EditForm = ({ id, name, dob, classValue, phone, address }) => {


    const [formValues, setFormValues] = useState({
        id,
        name,
        dob,
        class: classValue,
        phone,
        address
      });
    
      useEffect(() => {
        setFormValues({
          id,
          name,
          dob,
          class: classValue,
          phone,
          address
        });
      }, [id, name, dob, classValue, phone, address]);
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission, e.g., send the data to a server or parent component
        console.log('Updated values:', formValues);
      };
   

  return (
        <form >
            <label for="fname">First name:</label><br/>
            <input type="text" id="fname" name="fname" value={formValues.name} onChange={handleChange } /><br/>
            <label for="class">Last name:</label><br/>
            <input type="text" id="lname" name="class"  onChange={handleChange } /><br/> 
            <label for="dob">D.O.B:</label><br/>
            <input type="text" id="lname" name="dob" value={formValues.dob} onChange={handleChange } /><br/>
            <label for="phone">Phone:</label><br/>
            <input type="text" id="lname" name="phone" value={formValues.phone} onChange={handleChange } /><br/>
            <label for="address">Address:</label><br/>
            <input type="text" id="lname" name="address" value={formValues.address} onChange={handleChange } /><br/><br/>
            <input type="submit" value="Submit" onChange={ handleSubmit } />
        </form>
  )
}

export default EditForm;