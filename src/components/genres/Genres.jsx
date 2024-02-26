import React from "react";
import "./Genres.css";
import { useSelector } from "react-redux";

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);
  return (
    <div className="genres">
      {data?.map((dataID) => {
        if (!genres[dataID]?.name) return;
        return (
          <div key={dataID} className="genre">
            {genres[dataID]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
