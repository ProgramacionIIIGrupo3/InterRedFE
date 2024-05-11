import './formUser.scss';
import { useForm } from "react-hook-form";
import { Box, Button, Drawer } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useState, useEffect } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { UpdateUser, GetUsers } from '../../../../services/admin/userService';

const FormUser = () => {
        
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState([null]);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            const result = await GetUsers();
            console.log("this is the result", result)
            if (result && !result.error) {
                const user = result[0];
                console.log("this is the user", user);
                setUserData(user);
                reset({
                    correo: user.correo,
                    usuario: user.nombreUsuario,
                    contraseña: '',
                    contraseñaAuth: ''
                });
            }
        };
        if (open) {
            fetchData();
        }
    }, [open, reset])
    
    const onSubmit = (data) => {
        if (data.contraseña !== data.contraseñaAuth) {
            alert('Las contraseñas no coinciden');
            return;
        }
        console.log(data);
        const userData = {
            id: 1,
            correo: data.correo,
            nombreUsuario: data.usuario,
            contrasena: data.contraseña,
        };
        UpdateUser(userData);
        reset();
        setOpen(false);
    }; 
    
    const handleCancel = () => {
        reset();
        setOpen(false);
    };
    
    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setOpen(open);
    };
  
    const list = () => (
        <Box
        role="presentation"
        sx={{ width: 450, padding: 2, backgroundColor: '#121212', height: '200vh', '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        >        
        <form onSubmit={handleSubmit(onSubmit)} className='formUser'>
            <div className='container'>
                <label className='title'>Correo:</label>
                <input
                        className={`input ${errors.correo ? 'error-input' : ''}`}
                        type="email"
                        id="correo"
                        {...register('correo', {
                        required: 'Este campo es obligatorio',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'El correo no es válido',
                        },
                        })}
                    />
                    {errors.correo && <p className='error'>{<ReportProblemIcon sx={{color:'rgba(204, 65, 65, 0.849)', fontSize:'12px', margin: '0 .5rem '}}/>}{errors.correo.message}</p>}
            </div>
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
                
            <div className='container'>
                <label className='title'>Confirmar Contraseña:</label>
                <input
                    className={`input ${errors.contraseñaAuth ? 'error-input' : ''}`}
                    type="password"
                    id="contraseñaAuth"
                    {...register('contraseñaAuth', {
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
                {errors.contraseñaAuth && <p className='error'>{<ReportProblemIcon sx={{color:'rgba(204, 65, 65, 0.849)', fontSize:'12px', margin: '0 .5rem '}}/>}{errors.contraseñaAuth.message}</p>}
            </div>
    
            <div className="footerButtons">
                <button className='buttonCancel' type="button" onClick={handleCancel}>Cancelar</button>
                <button className='buttonSubmit' type="submit">Actualizar</button>
            </div>        
        </form>
      </Box>
    );
  
    return (
      <div>
        <Button onClick={toggleDrawer(true)}>
            {<AccountCircleOutlinedIcon sx={{fontSize:'35px', color:'white'}}/>}
        </Button>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </div>
    );

}

export default FormUser