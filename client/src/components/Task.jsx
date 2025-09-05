import { FiTrash, FiCheck } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { gsap } from "gsap";

const Task = ({ task, setTasks }) => {
  const { title, createdAt, _id, completed, finalizedAt } = task;
  const date = new Date(createdAt).toLocaleDateString();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const taskRef = useRef(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  //funcao para deletar a tarefa
  const handleDeleteTask = async () => {
    const token = localStorage.getItem("token"); // Obtém o token do localStorage

    //altura da tela para o descer
    const screenHeight = window.innerHeight;

    //timeline
    const tl = gsap.timeline({
      onComplete: async () => {
        deleteTaskFromAPI();
      },
    });

    //só executa o delete quando finaliza animação
    const deleteTaskFromAPI = async () => {
      try {
        const deleteTask = await axios.delete(`${apiUrl}/tasks/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token de autenticação
          },
        });

        if (deleteTask.status === 200) {
          toast.success(deleteTask.data.msg);
          // Aqui você pode atualizar o estado da lista de tarefas, se necessário
          setTasks((prevTasks) => prevTasks.filter((t) => t._id !== _id)); // Remove a tarefa deletada do estado
        }
      } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
        toast.error("Erro ao deletar tarefa.");
      }
    };

    //animacao
    // animação: sobe
    tl.to(taskRef.current, {
      y: -150,
      duration: 0.3,
      ease: "power2.out",
    });

    // animação: desce para fora da tela
    tl.to(taskRef.current, {
      y: screenHeight,
      duration: 0.5,
      ease: "power2.in",
    });
  };

  //funcao para atualizar o status da tarefa
  const handleToogleTask = async () => {
    const token = localStorage.getItem("token"); // Obtém o token do localStorage
    try {
      const updatedTask = await axios.patch(
        `${apiUrl}/tasks/${_id}`,
        {
          completed: !completed,
          finalizedAt: !completed ? new Date() : null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token de autenticação
          },
        }
      );

      if (updatedTask.status === 200) {
        toast.success("Status da tarefa atualizado com sucesso.");
        // Atualiza o estado das tarefas
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t._id === _id
              ? {
                  ...t,
                  completed: !t.completed,
                  finalizedAt: !completed ? new Date() : null,
                }
              : t
          )
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar status da tarefa:", error);
      toast.error("Erro ao atualizar status da tarefa.");
    }
  };

  // Atualizar título da tarefa
  const handleUpdateTask = async () => {
    if (editedTitle.trim() === "") {
      toast.error("O título da tarefa não pode estar vazio.");
      return;
    }

    const token = localStorage.getItem("token"); // Obtém o token do localStorage
    try {
      const response = await axios.patch(
        `${apiUrl}/tasks/${_id}`,
        { title: editedTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token de autenticação
          },
        }
      );

      if (response.status === 200) {
        toast.success("Tarefa atualizada com sucesso.");
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t._id === _id ? { ...t, title: editedTitle } : t
          )
        );
        setIsEditing(false); // Fecha o modo de edição
      }
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      toast.error("Erro ao atualizar tarefa.");
    }
  };

  return (
    <div
      className="flex-1 w-full flex justify-between bg-[#1E1E1E] p-2 rounded-lg text-white mb-2 hover:bg-[#2A2A2A] transition-colors duration-200 hover:scale-[1.008]"
      ref={taskRef}
    >
      <div className="flex gap-2 items-center">
        <button
          onClick={handleToogleTask}
          className={clsx("rounded-lg p-1", {
            "bg-orange-500 hover:bg-orange-600": task.completed,
            "bg-green-500 hover:bg-green-600": !task.completed,
          })}
        >
          <FiCheck size={17} />
        </button>
        <div className="flex flex-col">
          {isEditing ? (
            <input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleUpdateTask} //salva ao sair do input
              onKeyDown={(e) => {
                e.key === "Enter" && handleUpdateTask();
              }} //salva ao pressionar Enter
              className="p-1 rounded-lg bg-white text-black w-[170px] md:w-[240px]"
              autoFocus
              maxLength={64}
            />
          ) : (
            <Link
              to={`/details/${_id}`}
              className={clsx("text-2xl mb-1 cursor-pointer select-none", {
                "line-through text-gray-400": task.completed,
                "text-white": !task.completed,
              })}
            >
              {title}
            </Link>
          )}
          <p className="text-sm">
            <span className="text-green-500">Criada em:</span> {date}
            {task.completed && task.finalizedAt && (
              <>
                {" | "}
                <span className="text-orange-500">Finalizada em: </span>
                {new Date(finalizedAt).toLocaleDateString()}
              </>
            )}
          </p>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        {!task.completed && !task.finalizedAt && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-lg p-1 bg-blue-500 hover:bg-blue-600"
          >
            <FaEdit size={20} />
          </button>
        )}
        {isEditing && (
          <button
            onClick={handleUpdateTask}
            className="rounded-lg p-1 bg-blue-500 hover:bg-blue-600"
          >
            Salvar
          </button>
        )}
        {!isEditing && (
          <button
            onClick={handleDeleteTask}
            className="bg-red-500 rounded-lg p-1 hover:bg-red-600"
          >
            <FiTrash size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
