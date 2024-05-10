import { Box, Button, Drawer } from "@mui/material";
import "./formMunicipioEdit.scss";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { useEffect } from "react";
import {
  GetDepartamentos,
  GetDepartamentoById,
} from "../../../../services/admin/departamentoService";
import {
  GetMunicipios,
  UpdateMunicipio,
  GetMunicipioById,
} from "../../../../services/admin/municipioService";

const FormMunicipioEdit = ({ municipioId, onEditar }) => {
  const [open, setOpen] = useState(false);
  const [municipioEditar, setMunicipioEditar] = useState(null);
  const [departamentos, setDepartamentos] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (municipioId) {
      GetMunicipioById(municipioId)
        .then((response) => {
          if (!response.error && response.data) {
            setMunicipioEditar(response.data);
            setValue("nombre", response.data.nombre || "");
            setValue("descripcion", response.data.descripcion || "");
            setValue("poblacion", response.data.poblacion || 0);
            setValue("idDepartamento", response.data.idDepartamento || "");

            // Carga el nombre del departamento
            GetDepartamentoById(response.data.idDepartamento).then(
              (deptoResponse) => {
                console.log("este es mi depto response", deptoResponse);
                if (!deptoResponse.error && deptoResponse.data) {
                  setValue(
                    "nombreDepartamento",
                    deptoResponse.data.nombre || ""
                  );
                }
              }
            );
          }
        })
        .catch((error) => {
          console.error("Error al obtener municipio", error);
        });
    } else {
      reset();
    }
  }, [municipioId, setValue, reset]);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      const result = await GetDepartamentos();
      if (!result.error) {
        setDepartamentos(result.data);
      }
    };

    fetchDepartamentos();
  }, []);

  const onSubmit = async (data) => {
    // Aquí, decide si actualizar o crear en base a si `municipioEditar` tiene datos
    if (municipioEditar && municipioEditar.id) {
      const result = await UpdateMunicipio(municipioEditar.id, data);
      if (!result.error) {
        console.log("Municipio actualizado correctamente");
      } else {
        console.error("Error al actualizar municipio", result.message);
      }
    } else {
      const result = await CreateMunicipio(data);
      if (!result.error) {
        console.log("Municipio creado correctamente");
      } else {
        console.error("Error al crear municipio", result.message);
      }
    }
    reset();
    setOpen(false);
    setMunicipioEditar(null);
  };

  const handleCancel = () => {
    reset();
    setOpen(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  useEffect(() => {
    if (municipioId) {
      GetMunicipioById(municipioId).then((response) => {
        if (!response.error && response.data) {
          setMunicipioEditar(response.data);
          setValue("nombre", response.data.nombre);
          setValue("descripcion", response.data.descripcion);
          setValue("poblacion", response.data.poblacion);
          setValue("idDepartamento", response.data.idDepartamento); // Asegúrate de que este valor exista en tus opciones del select
        }
      });
    } else {
      reset();
    }
  }, [municipioId, setValue, reset, departamentos]); // Incluye departamentos en las dependencias si es necesario asegurar que estén cargados

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
    <div>
      <Button
        sx={{
          display: "inline-flex",
          padding: "5px 10px",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "5px",
          border: "2px dashed #729627",
          color: "#729627",
          fontFamily: "Montserrat Alternates",
          fontSize: "12px",
          fontStyle: "normal",
          fontWeight: "800",
          "&:hover": {
            backgroundColor: "#729627",
          },
        }}
        onClick={() => setOpen(true)}
      >
        Edit
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

export default FormMunicipioEdit;
