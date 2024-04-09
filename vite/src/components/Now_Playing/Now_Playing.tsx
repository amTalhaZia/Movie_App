import React from "react";
import { useTodoContext } from "../../Store/Provider";
import { ClockLoader } from "react-spinners";

const Now_Playing: React.FC = () => {
  const { playing } = useTodoContext();

  return (
    <div className="wrapper">
      {playing.length > 0 ? (
        playing.map((item) => (
          <a href={`/Now_Playing_Movies/${item.id}`} key={item.id}>
            <div className="box">
              <p className="heading">{item.title}</p>
              {item.poster_path && (
                <div>
                  <img
                    className="poster"
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    alt={item.title}
                  />
                </div>
              )}
            </div>
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

export default Now_Playing;
