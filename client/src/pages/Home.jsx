import React from "react";
import AddTask from "../components/AddTask";
import SearchTask from "../components/SearchTask";
import Tasks from "../components/Tasks";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="bg-dark-real h-screen pt-20 w-full">
      <Header />
      <div className="w-[90%] md:w-[70%] mx-auto ucla-blue-bg rounded-lg p-2 shadow-[inset_0_0_10px_rgba(0,0,0,0.3)]">
        <p className="text-center text-2xl mt-4 text-white font-bold">
          Lista de tarefas
        </p>
        <AddTask />
        <SearchTask />
        <Tasks />
      </div>
    </div>
  );
};

export default Home;
