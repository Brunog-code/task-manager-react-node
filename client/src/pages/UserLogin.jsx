import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/loginSchema";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const UserLogin = () => {
  //hooks
  const navigate = useNavigate();

  //navigate
  const navigateToReset = () => {
    navigate("/ResetPassword");
  };

  const navigateToSignUp = () => {
    navigate("/signup");
  };

  //validar com zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  //validando token e fazendo login
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://task-manager-react-node.onrender.com/auth/login",
        data
      );

      if (response.data.token) {
        console.log(`Token: `, response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error(
        "Erro ao fazer login. Verifique suas credenciais e tente novamente."
      );
      return;
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen blue-degr-bg relative">
      <div className="absolute top-5 left-7">
        <p className="text-yellow-400 text-3xl font-logo">To do list</p>
      </div>

      <div className="flex flex-col w-[95%] max-w-md bg-white border-2 h-auto p-4 rounded-lg">
        <div className="flex justify-center">
          <h4 className="font-bold text-2xl dark-blue-txt mb-5">Login</h4>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            {/* <label className="font-semibold dark-blue-txt mb-1" htmlFor="email">
              Email
            </label> */}
            <input
              className="rounded-md border-2 border-blue-500 focus:border-blue-800 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 p-2 placeholder-slate-500"
              type="email"
              {...register("email")}
              id="email"
              placeholder="Digite seu email"
            />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col mt-5">
            {/* <label className="font-semibold dark-blue-txt mb-1" htmlFor="senha">
              Senha
            </label> */}
            <input
              className="rounded-md border-2 border-blue-500 focus:border-blue-800 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200  p-2 placeholder-slate-500"
              type="password"
              {...register("password")}
              id="password"
              placeholder="Digite sua senha"
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password.message}</p>
            )}
          </div>

          <div className="flex">
            <p
              onClick={navigateToReset}
              className="hover: cursor-pointer dark-blue-txt ml-auto"
            >
              Esqueci minha senha
            </p>
          </div>
          <div className="flex flex-col w-full mt-8 gap-2">
            <button className="dark-blue-bg p-2 rounded-lg text-white hover:bg-[#0a161f]">
              Entrar
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                navigateToSignUp();
              }}
              className="border-2 border-[#3f5170] p-2 rounded-lg dark-blue-txt hover:bg-[#3f5170] hover:text-white "
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
