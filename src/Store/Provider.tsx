import React, { useState, useEffect, createContext, useMemo } from "react";
import axios from "axios";

export type TodoProviderProps = {
  children: React.ReactNode;
};

export interface Api {
  id: string;
  title: string;
  poster_path: string;
  backdrop_path : string;
  overview : string;
}

export interface Context {
  data: Api[];
  popular: Api[];
  playing: Api[];
}

const TodoContext = createContext<Context | null>(null);

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [data, setData] = useState<Api[]>([]);
  const [popular, setPopular] = useState<Api[]>([]);
  const [playing, setPlaying] = useState<Api[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [upcomingResponse, popularResponse, nowPlayingResponse] = await Promise.all([
          axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=6b35286ff05254fa4653b05f349d185e"),
          axios.get("https://api.themoviedb.org/3/movie/popular?api_key=6b35286ff05254fa4653b05f349d185e"),
          axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=6b35286ff05254fa4653b05f349d185e")
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

  const contextValue = useMemo(() => ({ data, popular, playing }), [data, popular, playing]);

  return <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  const context = React.useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
