import React from 'react';
import { useTodoContext } from '../../Store/Provider';
import { useParams } from 'react-router-dom';
import { ClockLoader } from "react-spinners";

const Details: React.FC = () => {
  const { popular } = useTodoContext();
  const { id } = useParams<{ id: string }>();
  const selectedItem = popular.find((item) => item.id.toString() === id);

  return (
    <div className="details-container">
      {selectedItem ? (
        <div key={selectedItem.id} className="details-content">
          {selectedItem.backdrop_path && (
            <img
              className="details-poster"
              src={`https://image.tmdb.org/t/p/w500/${selectedItem.backdrop_path}`}
              alt={selectedItem.title}
            />
          )}
          <h1 className="detail-heading">{selectedItem.title}</h1>
          <p className="detail-para">{selectedItem.overview}</p>
        </div>
      ) : (
        <div className="loading">
          <ClockLoader color="#36d7b7" />
        </div>
      )}
    </div>
  );
};

export default Details;
