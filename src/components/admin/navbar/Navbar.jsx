import "./navbar.scss";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = ({title}) => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="title-container">
            <p className="title">{title}</p>
        </div>
        <div className="containerBtn">
          <div className="search">
            <SearchOutlinedIcon className="icon" />
            <input type="text" />
          </div>
          <div className="user">
            <AccountCircleIcon className="icon"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar