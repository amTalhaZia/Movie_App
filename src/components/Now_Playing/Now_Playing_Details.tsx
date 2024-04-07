import React, { useState } from "react";
import { useTodoContext } from "../../Store/Provider";
import { useParams } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import Playing_Todo from "./Playing_Todo";

const Now_Playing_Details: React.FC = () => {
  const { playing, handleChnage } = useTodoContext();
  const { id } = useParams<{ id: string }>();
  const selectedItem = playing.find((item) => item.id.toString() === id);

  const [comment, setComment] = useState("");

  

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleChnage(comment);
    //  console.log(e);
    //  console.log(comment);
    setComment("");
  };

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
      <div className="form_handler">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Do comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Comment</button>
        </form>
         <div className="mappimg">
           <Playing_Todo comment={comment}/>
         </div>
      </div>
    </div>
  );
};

export default Now_Playing_Details;
