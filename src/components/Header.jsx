import { FaSearch } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";

const Header = () => {
  return (
    <div className="header-wrapper">
      <header>
        <h1>Students Register</h1>
        <div>
          <form>
            <input type='text' placeholder='Search student'/>
            <button type="submit"><FaSearch /></button>
          </form>
        </div>
        <button><IoPersonAdd /></button>
      </header>
    </div>
    
  )
}

export default Header;