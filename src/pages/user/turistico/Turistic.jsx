/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetLugarTuristicoById } from "../../../services/admin/lugarTuristicoService";
import "./turistic.scss";

const Turistic = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  const fetchLugarTuristico = async () => {
    const response = await GetLugarTuristicoById(id);
    if (!response.error) {
      setPlace(response.data);
      console.log(response.data)
    }
  };
  useEffect(() => {

    fetchLugarTuristico();
  }, [fetchLugarTuristico, id]);

  if (!place) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="turistic">
      <div
        className="fullscreen-background"
        style={{
          backgroundImage: `url(${import.meta.env.VITE_API_URL_IMG}${
            place.imagen
          })`,
        }}
      ></div>
      <div className="content">
        <h1>{place.nombre}</h1>
        <p>{place.descripcion}</p>
      </div>
    </div>
  );
};

export default Turistic;