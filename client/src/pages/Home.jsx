import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import AddTask from "../components/AddTask";
import SearchTask from "../components/SearchTask";
import Tasks from "../components/Tasks";
import Header from "../components/Header";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const apiUrl = import.meta.env.VITE_API_URL;

  //funcao para buscar as tarefas
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data.tasks); //Atualiza o estado com as tarefas recebidas
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      toast.error("Erro ao buscar tarefas.");
    }
  };

  //renderiza a funcao fetchTasks quando o componente for montado
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="bg-gradient-to-b from-[var(--dark-real)] to-blue-950  h-screen pb-2 pt-20 w-full overflow-y-auto">
      <Header />
      <div className="w-[90%] md:w-[70%] mx-auto ucla-blue-bg rounded-lg p-2 shadow-[inset_0_0_10px_rgba(0,0,0,0.3)]">
        <p className="text-center text-2xl mt-4 text-white font-bold">
          Gerenciar tarefas
        </p>
        <AddTask tasks={tasks} setTasks={setTasks} />
        <SearchTask filter={filter} setFilter={setFilter} />
        {tasks.length > 0 && (
          <p className="text-white text-sm">
            Clique no titulo para ver detalhes
          </p>
        )}
        <Tasks filter={filter} tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
};

export default Home;
