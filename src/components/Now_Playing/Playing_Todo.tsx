import React from "react";
import { useTodoContext } from "../../Store/Provider";
import { MdDeleteOutline } from "react-icons/md";

const Playing_Todo: React.FC = () => {
  const { todos } = useTodoContext();

  return (
    <div className="playing-todo__container">
      {todos.map((item) => (
        <div key={item.id} className="playing-todo__box">
          <div className="butons">
            <p className="playing-todo__comment"  >{item.comment}</p>
            <MdDeleteOutline />
          </div>
          <p className="playing-todo__date">{item.date}</p>
        </div>
      ))}
    </div>
  );
};

export default Playing_Todo;
``;
