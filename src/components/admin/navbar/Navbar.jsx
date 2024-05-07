import FormUser from "../Formularios/formUser/FormUser";
import "./navbar.scss";

const Navbar = ({title}) => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="title-container">
            <p className="title">{title}</p>
        </div>
        <div className="user">
          <FormUser/>
        </div>
      </div>
    </div>
  )
}

export default Navbar