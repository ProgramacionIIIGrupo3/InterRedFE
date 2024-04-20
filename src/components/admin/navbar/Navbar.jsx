import "./navbar.scss";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Navbar = ({title}) => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="title-container">
            <p className="title">{title}</p>
        </div>
        <div className="containerBtn">
          <div className="search">
            <SearchOutlinedIcon sx={{fontSize:"20px", marginLeft:"0.5rem"}} />
            <input type="text" />
          </div>
          <div className="user">
            <AccountCircleOutlinedIcon className="icon"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar