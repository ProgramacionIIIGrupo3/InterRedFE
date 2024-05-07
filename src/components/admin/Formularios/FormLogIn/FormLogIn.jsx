import './formLogIn.scss';
import { useForm } from "react-hook-form";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const FormLogIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    
      const onSubmit = (data) => {
        console.log(data);
        JSON.stringify(data)
      }; 
    
      return (
        <form onSubmit={handleSubmit(onSubmit)} className='formLogIn'>
            <div className='container'>
                <label className='title'>Usuario:</label>
                <input
                     className={`input ${errors.usuario ? 'error-input' : ''}`}
                    type="text"
                    id="usuario"
                    {...register('usuario', {
                    required: 'Este campo es obligatorio',
                    maxLength: {
                        value: 20,
                        message: 'El usuario no puede exceder los 20 caracteres',
                    },
                    pattern: {
                        value: /^[A-Za-z]+$/i,
                        message: 'Solo se permiten caracteres alfabéticos',
                    }, 
                    })}
                />
                {errors.usuario && <p className='error'>{<ReportProblemIcon sx={{color:'rgba(204, 65, 65, 0.849)', fontSize:'12px', margin: '0 .5rem '}}/>}{errors.usuario.message}</p>}
            </div>
    
            <div className='container'>
                <label className='title'>Contraseña:</label>
                <input
                     className={`input ${errors.contraseña ? 'error-input' : ''}`}
                    type="password"
                    id="contraseña"
                    {...register('contraseña', {
                    required: 'Este campo es obligatorio',
                    minLength: {
                        value: 8,
                        message: 'La contraseña debe tener al menos 6 caracteres',
                    },
                    pattern: {
                        value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                        message: 'La contraseña debe tener al menos una mayúscula, un número, un signo especial y mínimo 8 caracteres',
                    },
                    })}
                />
                {errors.contraseña && <p className='error'>{<ReportProblemIcon sx={{color:'rgba(204, 65, 65, 0.849)', fontSize:'12px', margin: '0 .5rem '}}/>}{errors.contraseña.message}</p>}
            </div>
    
            <button className='button' type="submit">Iniciar sesión</button>
        </form>
    );

}

export default FormLogIn