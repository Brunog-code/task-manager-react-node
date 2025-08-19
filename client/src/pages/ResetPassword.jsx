import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetSchema } from "../validations/resetPassSchema";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  //hooks
  const navigate = useNavigate();

  //navigate
  const backHome = () => {
    navigate("/");
  };

  //validar com zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (email) => {
    console.log(`Campo Válido`, email);

    try {
      const response = await axios.post(
        `https://task-manager-react-node.onrender.com/password/forgot`,
        email
      );

      toast.success("Email de redefinição enviado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao enviar email de redefinição:", error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen blue-degr-bg relative">
      <div className="absolute top-5 left-7">
        <p className="text-yellow-400 text-3xl font-logo">To do list</p>
      </div>

      <div className="flex flex-col w-full max-w-md lvory-bg border-2 h-auto p-4 rounded-lg">
        <div>
          <button
            onClick={backHome}
            className="ucla-blue-bg p-2 text-white rounded-lg"
          >
            Voltar
          </button>
        </div>
        <div className="flex justify-center">
          <h4 className="font-bold text-2xl dark-blue-txt mb-5">
            Recuperar senha
          </h4>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label className="font-semibold dark-blue-txt mb-1" htmlFor="email">
              Email
            </label>
            <input
              {...register("email")}
              className="rounded-md border-2 border-blue-500 focus:border-blue-800 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
              placeholder="Digite seu email"
              type="email"
              id="email"
            />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col w-full mt-8 gap-2">
            <button className="dark-blue-bg p-2 rounded-lg text-white hover:bg-[#0a161f]">
              Recuperar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
