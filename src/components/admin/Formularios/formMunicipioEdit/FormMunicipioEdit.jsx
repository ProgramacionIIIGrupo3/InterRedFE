import { Box, Button, Drawer } from "@mui/material";
import "./formMunicipioEdit.scss";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { useEffect } from "react";
import {
  GetDepartamentos,
} from "../../../../services/admin/departamentoService";
import {
  UpdateMunicipio,
  GetMunicipioById,
} from "../../../../services/admin/municipioService";

const FormMunicipioEdit = ({ municipioEditar, onClose, recargarMunicipios}) => {
  const [open, setOpen] = useState(false);
  const [departamentos, setDepartamentos] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // UseEffect para cargar los departamentos
  useEffect(() => {
    const fetchDepartamentos = async () => {
      const result = await GetDepartamentos();
      if (!result.error) {
        setDepartamentos(result.data);
      }
    };

    fetchDepartamentos();
  }, []);

  // UseEffect para cargar los datos del municipio a editar
  useEffect(() => {
    if (municipioEditar) { 
      GetMunicipioById(municipioEditar.id).then((response) => {
        if (!response.error && response.data) {
          setValue("nombre", response.data.nombre);
          setValue("descripcion", response.data.descripcion);
          setValue("poblacion", response.data.poblacion);
          setValue("idDepartamento", response.data.idDepartamento);
        }
      });
    } else {
      reset();
    }
  }, [municipioEditar, setValue, reset, departamentos]);
  
  // Función para enviar los datos del formulario y actualizar el municipio
  const onSubmit = async (data) => {
    if (municipioEditar && municipioEditar.id) {
      const updateData = {
        id: municipioEditar.id,
        nombre: data.nombre,
        descripcion: data.descripcion,
        poblacion: parseInt(data.poblacion, 10),
        idDepartamento: parseInt(data.idDepartamento, 10)
      };
  
      const result = await UpdateMunicipio(municipioEditar.id, updateData);
      if (!result.error) {
        console.log("Municipio actualizado correctamente");
        recargarMunicipios();
        onClose(); // Cierra el formulario si la actualización es exitosa
      } else {
        console.error("Error al actualizar el municipio", result.message);
      }
    } else {
      console.error("No hay datos de municipio para actualizar");
    }
  };
  
  // Función para cancelar la edición del municipio
  const handleCancel = () => {
    reset(); 
    onClose(); 
  };

  // Función para abrir y cerrar el Drawer
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };



  const list = () => (
    <Box
      role="presentation"
      sx={{
        width: 450,
        padding: 2,
        backgroundColor: "#121212",
        height: "200vh",
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="formMunicipio">
        <div className="container">
          <label className="title">Departamento:</label>
          <Controller
            name="idDepartamento"
            control={control}
            defaultValue=""
            rules={{ required: "Debes seleccionar un departamento" }}
            render={({ field }) => (
              <select
                {...field}
                className={`select ${
                  errors.idDepartamento ? "error-input" : ""
                }`}
              >
                <option value="">Selecciona el departamento</option>
                {departamentos.map((depto) => (
                  <option key={depto.id} value={depto.id}>
                    {depto.nombre}
                  </option>
                ))}
              </select>
            )}
          />

          {errors.idDepartamento && (
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
              {errors.idDepartamento.message}
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
                  "El nombre del municipio no puede exceder los 20 caracteres",
              },
              pattern: {
                value: /^[A-Za-z0-9\s.,ñÑáéíóúÁÉÍÓÚüÜ'"\?!]+$/,
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
          <label className="title">Poblacion:</label>
          <input
            className={`input ${errors.poblacion ? "error-input" : ""}`}
            type="number"
            id="poblacion"
            {...register("poblacion", {
              required: "Este campo es obligatorio",
              pattern: {
                value: /^[0-9]+$/,
                message: "La poblacion no puede tener decimales.",
              },
            })}
          />
          {errors.poblacion && (
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
              {errors.poblacion.message}
            </p>
          )}
        </div>

        <div className="container">
          <label className="title">Descripción:</label>
          <textarea
            className={`input ${errors.descripcion ? "error-input" : ""}`}
            id="descripcion"
            rows={3}
            style={{ resize: "none" }} // Agrega esta propiedad inline
            {...register("descripcion", {
              required: "Este campo es obligatorio",
              pattern: {
                value: /^[A-Za-z0-9\s.,ñÑáéíóúÁÉÍÓÚüÜ'"\?!]+$/,

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
          <button className="buttonCancel" type="button" onClick={handleCancel}>
            Cancelar
          </button>
          <button className="buttonSubmit" type="submit">
            Guardar
          </button>
        </div>
      </form>
    </Box>
  );

  return (
    <Drawer anchor="right" open={Boolean(municipioEditar)} onClose={onClose}>
        {list()}
      </Drawer>
  );
};

export default FormMunicipioEdit;
