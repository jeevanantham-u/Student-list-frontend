import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <div className="header-wrapper">
      <header>
        <h1>Students Register</h1>
        <div>
          <form>
            <input type='text' placeholder='Search student'/>
            <button><FaSearch /></button>
          </form>
        </div>
      </header>
    </div>
    
  )
}

export default Header;