import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";
import { newPasswordSchema } from "../validations/newPasswordSchema";

const NewPassword = () => {
  //validação com zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newPasswordSchema),
  });

  const navigate = useNavigate();

  const { token } = useParams();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `https://task-manager-react-node.onrender.com/password/reset/${token}`,
        { newPassword: data.password }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Erro ao atualizar senha";
      toast.error(msg);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen blue-degr-bg relative">
      <div className="absolute top-5 left-7">
        <p className="text-yellow-400 text-3xl font-logo">To do list</p>
      </div>

      <div className="flex flex-col w-[95%] max-w-md bg-white border-2 h-auto p-4 rounded-lg">
        <div className="flex justify-center">
          <h4 className="font-bold text-2xl dark-blue-txt mb-5">
            Digite a nova senha
          </h4>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <input
              className="rounded-md border-2 border-blue-500 focus:border-blue-800 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 p-1 mb-2 placeholder-slate-500"
              placeholder="Digite sua senha"
              type="password"
              id="password"
              {...register("password")}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <input
              className="rounded-md border-2 border-blue-500 focus:border-blue-800 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 p-1 placeholder-slate-500"
              placeholder="confirme sua senha"
              type="password"
              id="confirm-password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex flex-col w-full mt-8 gap-2">
            <button className="dark-blue-bg p-2 rounded-lg text-white hover:bg-[#0a161f]">
              Atualizar senha
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
