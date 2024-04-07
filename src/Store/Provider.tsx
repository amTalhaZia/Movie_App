import React, { useState, useEffect, createContext, useMemo } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export type TodoProviderProps = {
  children: React.ReactNode;
};

export interface Api {
  id: string;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
}

export interface Todos {
  id: string;
  comment: string;
  date: string;
}
export interface Context {
  data: Api[];
  popular: Api[];
  playing: Api[];
  todos: Todos[];
  handleChnage: (task: string) => void;
  handleDelete: (id: string) => void;
  editFunct: (id: string, comment : string) => void;
}


const TodoContext = createContext<Context | null>(null);

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [data, setData] = useState<Api[]>([]);
  const [popular, setPopular] = useState<Api[]>([]);
  const [playing, setPlaying] = useState<Api[]>([]);
  const [todos, setTodos] = useState<Todos[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [upcomingResponse, popularResponse, nowPlayingResponse] =
          await Promise.all([
            axios.get(
              "https://api.themoviedb.org/3/movie/upcoming?api_key=6b35286ff05254fa4653b05f349d185e"
            ),
            axios.get(
              "https://api.themoviedb.org/3/movie/popular?api_key=6b35286ff05254fa4653b05f349d185e"
            ),
            axios.get(
              "https://api.themoviedb.org/3/movie/now_playing?api_key=6b35286ff05254fa4653b05f349d185e"
            ),
          ]);
        setData(upcomingResponse.data.results);
        setPopular(popularResponse.data.results);
        setPlaying(nowPlayingResponse.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // todo functionality

  const handleChnage = (task: string) => {
    const now = Date.now();
    const formattedDate = new Date(now).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const newTodo = {
      id: uuidv4(),
      comment: task,
      date: formattedDate,
    };
    setTodos([...todos, newTodo]);
  };

    
  // delete functionality

  const handleDelete = (id: string) => {
    setTodos(todos.filter((item) => item.id!== id));
  };

  //   update  functionality

  // const  editFunct =(id :string) =>{
  //   const find = todos.find((item)=>{
  //     return item.id === id;
  //   })
  

  // }

  // use memo

  const contextValue = useMemo(
    () => ({ data, popular, playing, handleChnage, todos, handleDelete }),
    [data, popular, playing, todos,]
  );

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = React.useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
