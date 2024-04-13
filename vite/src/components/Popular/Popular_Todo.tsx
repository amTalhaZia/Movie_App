import React from "react";
import { useTodoContext } from "../../Store/Provider";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";




const Popular_Todo: React.FC = () => {
  const { todos, handleDelete,handleEdit} = useTodoContext();

  return (
    <div className="playing-todo__container">
      {todos.map((item) => (
        <div key={item.id} className="playing-todo__box">
          <div className="butons">
            <p className="playing-todo__comment"  >{item.comment}</p>
            <MdDeleteOutline  className="delet_btn"   onClick={()=>handleDelete(item.id)}  />
            <FaRegEdit  className="delet_btn " onClick={()=>handleEdit(item.id)}  />
          </div>
          <p className="playing-todo__date">{item.date}</p>
        </div>
      ))}
    </div>
  );
};

export default Popular_Todo;
;
