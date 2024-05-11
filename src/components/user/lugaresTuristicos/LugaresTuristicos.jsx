import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import {
  GetDepartamentoById,
  GetDepartamentos,
} from "../../../services/admin/departamentoService";
import "./lugaresTuristicos.scss";
import { GetLugaresTuristicosByDepartamentoId } from "../../../services/admin/lugarTuristicoService";
import RadioGroupRating from "./RadioGroupRating";
import { InsertCalificacion } from "../../../services/user/calificacionService";
import Checkbox from "@mui/material/Checkbox";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { InsertVisita } from "../../../services/user/visitaService";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

const LugaresTuristicos = () => {
  const [open, setOpen] = useState(false);
  const [departamento, setDepartamento] = useState(null);
  const [departamentos, setDepartamentos] = useState([]);
  const [turisticos, setTuristicos] = useState([]);
  const [ratings, setRatings] = useState({});
  const [visits, setVisits] = useState({});

  const handleRatingChange = (lugarTuristicoId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [lugarTuristicoId]: {
        ...prevRatings[lugarTuristicoId],
        puntuacion: String(rating),
      },
    }));
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleCommentChange = (event, lugarTuristicoId) => {
    const { value } = event.target;
    setRatings((prevRatings) => ({
      ...prevRatings,
      [lugarTuristicoId]: {
        ...prevRatings[lugarTuristicoId],
        comentario: value,
      },
    }));
  };

  const handleVisitChange = async (event, lugarTuristicoId) => {
    const checked = event.target.checked;

    if (visits[lugarTuristicoId]) {
      return;
    }

    setVisits((prev) => ({
      ...prev,
      [lugarTuristicoId]: checked,
    }));

    if (checked) {
      try {
        const response = await InsertVisita({
          id: 0, // El ID puede ser ignorado según la implementación del backend
          lugarTuristicoId: lugarTuristicoId,
        });
        if (response.status === 201) {
          console.log("Visita registrada con éxito");
        } else {
          console.error("No se pudo registrar la visita");
        }
      } catch (error) {
        console.error("Error al crear visita", error);
      }
    }
  };
  //   const { register, handleSubmit, control, setValue, reset, formState: { errors } } = useForm();

  const {
    control,
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

  const fetchDepartamentos = async () => {
    const response = await GetDepartamentos();
    if (!response.error) {
      setDepartamentos(response.data);
    }
  };

  const fetchDepartamento = async (departamentoId) => {
    if (departamentoId) {
      const response = await GetDepartamentoById(departamentoId);
      if (!response.error) {
        setDepartamento(response.data);
      }
    }
  };

  const fetchLugaresTuristicos = async (departamentoId) => {
    if (departamentoId) {
      const response = await GetLugaresTuristicosByDepartamentoId(
        departamentoId
      );
      if (!response.error) {
        setTuristicos(response.data);
      }
    }
  };

  useEffect(() => {
    fetchDepartamentos();
    fetchLugaresTuristicos();
  }, []);

  const handleDepartamentoChange = (e) => {
    const selectedDepartamentoId = e.target.value;
    fetchDepartamento(selectedDepartamentoId);
    fetchLugaresTuristicos(selectedDepartamentoId);
  };

  const submitRating = async (lugarTuristicoId) => {
    const data = {
      ...ratings[lugarTuristicoId],
      lugarTuristicoId,
    };
    const result = await InsertCalificacion(data);
    if (!result.error) {
      alert("Calificación enviada con éxito");
    } else {
      alert("Error al enviar la calificación");
    }
  };

  console.log(departamento);
  console.log(turisticos);

  const listt = () => (
    <Box
      sx={{
        width: 600,
        padding: 2,
        height: "500vh",
        backgroundColor: "#121212",
      }}
      role="presentation"
    >
      <div className="VistaDepartamento">
        <form className="formSeleccion">
          <div className="containerForm">
            <label className="title">Departamento:</label>
            <Controller
              name="idDepartamento"
              control={control}
              defaultValue=""
              rules={{ required: "Debes seleccionar un municipio" }}
              render={({ field }) => (
                <select
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleDepartamentoChange(e);
                  }}
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
        </form>
        <div className="container">
          {departamento && (
            <>
              ]<div className="espacio"></div>
              <div className="arriba">
                <br></br>
                <h3 className="subtitle">Lugares Turísticos</h3>
                {turisticos.map((item) => (
                  <div key={item.id} className="lugar-turistico">
                    {item.imagen && (
                      <img 
                        src={`${import.meta.env.VITE_API_URL_IMG}${
                          item.imagen
                        }`}
                        alt={item.nombre}
                        className="lugar-imagen imgTuristico"
                      />
                    )}
                    <div className="container">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <h3 className="lugar-nombre">{item.nombre}</h3>
                        <RadioGroupRating
                          lugarTuristicoId={item.id}
                          onChange={handleRatingChange}
                        />
                        <Checkbox
                          {...label}
                          icon={<BookmarkBorderIcon sx={{ color: "white" }} />}
                          checkedIcon={<BookmarkIcon sx={{ color: "white" }} />}
                          checked={!!visits[item.id]}
                          onChange={(e) => handleVisitChange(e, item.id)}
                          disabled={visits[item.id]}
                        />
                      </div>
                      <p className="lugar-descripcion">{item.descripcion}</p>
                      <TextField
                        fullWidth
                        type="text"
                        placeholder="Agrega un comentario..."
                        value={ratings[item.id]?.comentario || ""}
                        onChange={(e) => handleCommentChange(e, item.id)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => submitRating(item.id)}
                                edge="end"
                                sx={{ color: "white" }} // Estilo para el icono
                              >
                                <SendIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                          style: { color: "white" },
                        }}
                        sx={{
                          backgroundColor: "#121212",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "white",
                            },
                            "&:hover fieldset": {
                              borderColor: "white",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "white",
                            },
                          },
                        }}
                        variant="outlined"
                        margin="normal"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        {<CameraAltIcon sx={{ color: "white", fontSize: "30px" }} />}
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {listt()}
      </Drawer>
    </div>
  );
};

export default LugaresTuristicos;
