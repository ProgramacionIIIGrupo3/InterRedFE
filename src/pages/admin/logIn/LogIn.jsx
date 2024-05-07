import FormLogIn from '../../../components/admin/Formularios/FormLogIn/FormLogIn';
import './login.scss';

const LogIn = () => {
  return (
    <div className='logIn'>
      <div className="titles">
        <h1 className="title">@interRedGT</h1>
        <h4 className="subtitle">Descubre Guatemala con Interred, tu mapa confiable</h4>
      </div>
      <div className="container">
        <FormLogIn />
      </div>
    </div>
  );
};

export default LogIn;