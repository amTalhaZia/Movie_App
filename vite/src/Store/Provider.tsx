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
export interface Blog {
  _id: string;
  title: string;
  description: string;
  slug: string;
  image: string;
  about: { type: string; children: { text: string }[] }[]; // Array of objects
}


export interface Context {
  data: Api[];
  popular: Api[];
  playing: Api[];
  todos: Todos[];
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  handleChnage: () => void;
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
  blog: Blog[]; 
  setBlog: React.Dispatch<React.SetStateAction<Blog[]>>; 
}

const TodoContext = createContext<Context | null>(null);

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [data, setData] = useState<Api[]>([]);
  const [popular, setPopular] = useState<Api[]>([]);
  const [playing, setPlaying] = useState<Api[]>([]);
  const [todos, setTodos] = useState<Todos[]>([]);
  const [comment, setComment] = useState<string>("");
  const [val, setVal] = useState<string>('');
  const [blog, setBlog] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [upcomingResponse, popularResponse, nowPlayingResponse] = await Promise.all([
          axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=6b35286ff05254fa4653b05f349d185e"),
          axios.get("https://api.themoviedb.org/3/movie/popular?api_key=6b35286ff05254fa4653b05f349d185e"),
          axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=6b35286ff05254fa4653b05f349d185e"),
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

  // Add functionality
  const handleChnage = () => {
    const update = todos.map((item) => {
      if (item.id === val) {
        return {
          ...item,
          comment: comment
        };
      }
      return item;
    });

    setTodos(update);
    setComment('');

    if (!update.some((item) => item.id === val)) {
      const now = Date.now();
      const formattedDate = new Date(now).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      const newTodo = {
        id: uuidv4(),
        comment: comment,
        date: formattedDate,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setComment("");
    }
  };

  // Delete functionality
  const handleDelete = (id: string) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  // Edit functionality
  const handleEdit = (id: string) => {
    const finding = todos.find((item) => item.id === id);
    console.log(finding)
    if (finding) {
      setComment(finding.comment);
    }
    setVal(id)
  };

  const contextValue = useMemo(
    () => ({
      data,
      popular,
      playing,
      handleChnage,
      todos,
      handleDelete,
      comment,
      setComment,
      handleEdit,
      blog, 
      setBlog
    }),
    [data, popular, playing, todos, comment, blog]
  );
  return <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  const context = React.useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
