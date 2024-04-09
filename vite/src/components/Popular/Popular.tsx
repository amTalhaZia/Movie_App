import React from "react";
import { useTodoContext } from "../../Store/Provider";
import { ClockLoader } from "react-spinners";

const Popular: React.FC = () => {
  const { popular } = useTodoContext();

  return (
    <div className="wrapper">
      {popular.length > 0 ? (
        popular.map((item) => (
          <a href={`/details/${item.id}`} key={item.id}  className="box">
            <p className="heading">{item.title}</p>
            {item.poster_path && (
              <img
                className="poster"
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                alt={item.title}
              />
            )}
          </a>
        ))
      ) : (
        <div className="loading">
          <ClockLoader color="#36d7b7" />
        </div>
      )}
    </div>
  );
};

export default Popular;
