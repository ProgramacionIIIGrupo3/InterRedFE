import { Box, Button, Drawer } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import "./formTuristico.scss";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { CreateLugarTuristico } from "../../../../services/admin/lugarTuristicoService";
import { GetDepartamentos } from "../../../../services/admin/departamentoService";
import { GetMunicipios, GetMunicipiosByDepto } from "../../../../services/admin/municipioService";


const FormTuristico = () => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const selectedDeptoId = watch("idDepartamento");

  const onSubmit = (data) => {
    // Crea un objeto FormData
    const formData = new FormData();

    // Agrega la imagen si está presente
    if (imageFile) {
      formData.append("ImagenFile", imageFile);
    }

    // Agrega otros campos del formulario
    formData.append("Nombre", data.nombre);
    formData.append("Descripcion", data.descripcion);
    formData.append("IdDepartamento", data.idDepartamento);
    formData.append("IdMunicipio", data.idMunicipio);

    // Envía los datos
    CreateLugarTuristico(formData)
      .then((response) => {
        console.log(response); // Maneja la respuesta
      })
      .catch((error) => {
        console.error(error);
      });

    // Reinicia el formulario y cierra el Drawer
    reset();
    setImageFile(null);
    setOpen(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleCancel = () => {
    reset();
    setImageFile(null);
    setOpen(false);
  };


const fetchMunicipios = async (departamentoId) => {
  console.log("Fetching municipios for departamento", departamentoId);
  if (departamentoId) {
    const response = await GetMunicipiosByDepto(departamentoId);
    console.log("Response from GetMunicipiosByDepto", response);
    if (!response.error) {
      setMunicipios(
        response.data.map((mun) => ({
          id: mun.id,
          nombre: mun.nombre,
        }))
      );
    } else {
      setMunicipios([]); // Limpiar municipios si no hay departamento seleccionado o error
    }
  } else {
    setMunicipios([]); // Limpiar municipios si no hay departamento seleccionado
  }
};

useEffect(() => {
  const fetchDepartamentos = async () => {
    const response = await GetDepartamentos();
    if (!response.error) {
      setDepartamentos(
        response.data.map((dep) => ({
          id: dep.id,
          nombre: dep.nombre,
        }))
      );
    }
  };

  fetchDepartamentos();
}, []);

// Asegúrate de que watch se esté usando correctamente para el departamento actual
useEffect(() => {
  fetchMunicipios(selectedDepartamento);
}, [selectedDepartamento]);

const handleDepartamentoChange = (e) => {
  const deptoId = e.target.value;
  setSelectedDepartamento(deptoId);
  fetchMunicipios(deptoId);
};

  const list = () => (
    <Box
      role="presentation"
      sx={{
        width: 800,
        padding: 2,
        backgroundColor: "#121212",
        height: "200vh",
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="formTuristic">
        <div className="containerleft">
          <div className="container">
            <div
              className={`file ${imageFile ? "noVisible" : ""} ${
                isHovered ? "hovered" : ""
              }`}
            >
              <div
                className="card"
                onClick={() => document.getElementById("file-input").click()}
              >
                <AddAPhotoOutlinedIcon
                  className="addPhotoIcon"
                  sx={{
                    fontSize: "12rem",
                    color: "rgba(28, 27, 31, 0.50)",
                    transition: "color 0.3s ease",
                    "&:hover": { color: "rgba(28, 27, 31, 1)" },
                  }}
                />
              </div>
            </div>
            {imageFile && (
              <div
                className="preview-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => document.getElementById("file-input").click()}
              >
                <img
                  className="previewImg"
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  style={{ border: isHovered ? "2px solid blue" : "none" }}
                />
              </div>
            )}
            <input
              type="file"
              id="file-input"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="containerRight">
          <div className="container">
            <label className="title">Departamento:</label>
            <Controller
  name="idDepartamento"
  control={control}
  defaultValue=""
  rules={{ required: "Debes seleccionar un Departamento" }}
  render={({ field }) => (
    <select
      {...field}
      onChange={(e) => {
        field.onChange(e); // Informar a react-hook-form del cambio
        handleDepartamentoChange(e); // Manejar cambio adicionalmente
      }}
      className={`select ${errors.idDepartamento ? "error-input" : ""}`}
    >
      <option value="">Selecciona el departamento</option>
      {departamentos.map((dep) => (
        <option key={dep.id} value={dep.id}>
          {dep.nombre}
        </option>
      ))}
    </select>
  )}
/>

            {errors.idDepartamento && (
              <p className="error">
                <ReportProblemIcon
                  sx={{
                    color: "rgba(204, 65, 65, 0.849)",
                    fontSize: "12px",
                    margin: "0 .5rem",
                  }}
                />
                {errors.idDepartamento.message}
              </p>
            )}
          </div>

          <div className="container">
            <label className="title">Municipio:</label>
<Controller
   name="idMunicipio"
   control={control}
   defaultValue=""
   rules={{ required: "Debes seleccionar un municipio" }}
   render={({ field }) => (
     <select {...field} className={`select ${errors.idMunicipio ? "error-input" : ""}`}>
       <option value="">Selecciona el municipio</option>
       {municipios.map((mun) => (
         <option key={mun.id} value={mun.id}>
           {mun.nombre}
         </option>
       ))}
     </select>
   )}
/>


            {errors.idMunicipio && (
              <p className="error">
                {
                  <ReportProblemIcon
                    sx={{
                      color: "rgba(204, 65, 65, 0.849)",
                      fontSize: "12px",
                      margin: "0 .5rem",
                    }}
                  />
                }
                {errors.idMunicipio.message}
              </p>
            )}
          </div>

          <div className="container">
            <label className="title">Nombre:</label>
            <input
              className={`input ${errors.nombre ? "error-input" : ""}`}
              type="text"
              id="nombre"
              {...register("nombre", {
                required: "Este campo es obligatorio",
                maxLength: {
                  value: 20,
                  message:
                    "El nombre del lugar turistico no puede exceder los 20 caracteres",
                },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "Solo se permiten caracteres alfabéticos",
                },
              })}
            />
            {errors.nombre && (
              <p className="error">
                {
                  <ReportProblemIcon
                    sx={{
                      color: "rgba(204, 65, 65, 0.849)",
                      fontSize: "12px",
                      margin: "0 .5rem ",
                    }}
                  />
                }
                {errors.nombre.message}
              </p>
            )}
          </div>
          <div className="container">
            <label className="title">Descripción:</label>
            <textarea
              className={`input ${errors.descripcion ? "error-input" : ""}`}
              id="descripcion"
              rows={2}
              style={{ resize: "none" }} // Agrega esta propiedad inline
              {...register("descripcion", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[A-Za-z0-9\s]+$/,
                  message: "Solo se permiten letras, números y espacios",
                },
              })}
            />
            {errors.descripcion && (
              <p className="error">
                {
                  <ReportProblemIcon
                    sx={{
                      color: "rgba(204, 65, 65, 0.849)",
                      fontSize: "12px",
                      margin: "0 .5rem",
                    }}
                  />
                }
                {errors.descripcion.message}
              </p>
            )}
          </div>
          <div className="footerButtons">
            <button
              className="buttonCancel"
              type="button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button className="buttonSubmit" type="submit">
              Guardar
            </button>
          </div>
        </div>
      </form>
    </Box>
  );

  return (
    <div>
      <Button
        sx={{
          background: "#EE811E",
          width: "150px",
          height: "40px",
          color: "white",
          fontSize: "12px",
          "&:hover": {
            backgroundColor: "#FFA64D", // Cambia el color de fondo al pasar el ratón sobre el botón
          },
        }}
        onClick={() => setOpen(true)}
      >
        {<AddIcon />} Agregar
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

export default FormTuristico;
