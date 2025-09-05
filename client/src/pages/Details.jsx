import { Link } from "react-router-dom";
import Header from "../components/Header";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { detailsSchema } from "../validations/detailsSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";

const Details = () => {
  const { id } = useParams();

  const [task, setTask] = useState({});
  const [isEditing, setisEditing] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  //validar com zod
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      description: "",
    },
  });

  //busca
  const fetchTask = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Usuário não autenticado");
      return;
    }
    try {
      const response = await axios.get(`${apiUrl}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedTask = response.data.task;
      setTask(fetchedTask);

      setisEditing(!fetchedTask.description); //se nao tiver description sera true

      // Atualiza o textarea com o valor vindo do banco
      reset({ description: fetchedTask.description || "" });
    } catch (error) {
      console.error("Erro ao buscar a tarefa:", error);
      toast.error("Erro ao buscar a tarefa.");
    }
  };

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Usuário não autenticado");
      return;
    }

    try {
      const response = await axios.patch(
        `${apiUrl}/tasks/${id}`,
        { description: data.description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.msg);

      setTask((prev) => ({ ...prev, description: data.description }));

      //setar para false o isEditing,
      setisEditing(false);
    } catch (error) {
      console.error("Erro ao buscar a tarefa:", error);
      toast.error("Erro ao buscar a tarefa.");
    }
  };

  const handleClearDescription = async () => {
    //atualizar db
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Usuário não autenticado");
      return;
    }

    try {
      const response = await axios.patch(
        `${apiUrl}/tasks/${id}`,
        { description: "" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTask((prev) => ({ ...prev, description: "" }));
      setisEditing(true);
      toast.success("Descrição limpa com sucesso");
      reset({ description: "" });
    } catch (error) {
      console.error("Erro ao excluir a descrição:", error);
      toast.error("Erro ao excluir a descrição.");
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  return (
    <div className="bg-gradient-to-b from-[var(--dark-real)] to-blue-950  h-screen pb-2 pt-20 w-full overflow-y-auto">
      <Header />
      <div className="w-[90%] md:w-[70%] mx-auto ucla-blue-bg rounded-lg p-2 shadow-[inset_0_0_10px_rgba(0,0,0,0.3)]">
        <Link to="/home" className="inline-block">
          <HiOutlineArrowLeft className="text-white text-3xl ml-5 mt-2" />
        </Link>
        <div className="mt-7 flex-1 flex-col w-full flex justify-between bg-[#1E1E1E] p-2 rounded-lg text-white mb-2 hover:bg-[#2A2A2A] transition-colors duration-200 hover:scale-[1.008]">
          <p className="text-2xl mb-1 ">{task.title}</p>
          <p>
            <span className="text-green-500">Criada em:</span>{" "}
            {new Date(task.createdAt).toLocaleDateString()}{" "}
          </p>
          {task.finalizedAt && (
            <p>
              <span className="text-orange-500">Finalizada em:</span>{" "}
              {new Date(task.finalizedAt).toLocaleDateString()}{" "}
            </p>
          )}
        </div>
        <div className="w-full">
          <h1 className="mt-7 mb-2 italic text-white text-lg ">Descrição:</h1>
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <textarea
                placeholder="Digite os detalhes da tarefa"
                className="p-2 rounded-md w-full text-blue-800 border-2 border-blue-500 focus:border-blue-800 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
                rows={5}
                maxLength={300}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-white font-bold">
                  {errors.description.message}
                </p>
              )}
              <button className="w-full mt-2 dark-blue-bg p-2 rounded-lg text-white hover:bg-[#0a161f]">
                Salvar
              </button>
            </form>
          ) : (
            <div>
              <p className="text-white w-full p-3 border border-blue-300 min-h-[100px] rounded-md mb-5">
                {task.description}
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 w-full flex gap-2 justify-center"
                onClick={() => setisEditing(true)}
              >
                <FaEdit size={20} />
                Atualizar
              </button>
              <button
                className=" mt-2 bg-red-500 hover:bg-red-600 text-white rounded-md p-2 w-full flex gap-2 justify-center"
                onClick={handleClearDescription}
              >
                <FiTrash size={20} />
                Limpar descrição
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
