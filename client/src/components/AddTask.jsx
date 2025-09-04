import { useState, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";

const AddTask = ({ tasks, setTasks }) => {
  //hooks
  const [task, setTask] = useState("");
  const inputRef = useRef(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  //function para adicionar uma nova tarefa
  const handleAddTask = async (e) => {
    e.preventDefault();

    if (task.trim() === "") {
      toast.error("Por favor, digite uma tarefa válida.");
      return;
    }

    const token = localStorage.getItem("token"); // Obtém o token do localStorage

    //requisição par o backend (passando a tarefa)
    try {
      const response = await axios.post(
        `${apiUrl}/tasks`,
        { title: task },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token de autenticação
          },
        }
      );
      setTasks([response.data.task, ...tasks]); // Atualiza o estado com a nova tarefa
      setTask(""); // Limpa o campo de entrada após adicionar a tarefa

      toast.success("Tarefa adicionada com sucesso!");
      console.log("Tarefa adicionada:", response.data);
      inputRef.current.focus(); // Foca novamente no campo de entrada após adicionar a tarefa
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      toast.error("Erro ao adicionar tarefa.");
    }
  };

  return (
    <div>
      <div>
        <h3 className="mt-3 text-white text-xl">Cadastrar</h3>
      </div>
      <form className="flex justify-center my-2" onSubmit={handleAddTask}>
        <input
          className="flex-1 p-1 mr-4 border-4 border-gray-50 rounded-md outline-none focus:border-[#3f5170]"
          type="text"
          placeholder="Digite a tarefa"
          maxLength={64}
          value={task}
          onChange={(e) => setTask(e.target.value)}
          ref={inputRef} // Referência para o input
          autoFocus // Foca automaticamente no campo de entrada ao carregar o componente
        />
        <button
          className=" dark-blue-bg hover:bg-[#0a161f] text-white p-1 rounded-md"
          type="submit"
        >
          <FiPlus size={24} />
        </button>
      </form>
    </div>
  );
};

export default AddTask;
