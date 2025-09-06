import { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadSchema } from "../validations/cadSchema";
import axios from "axios";

const SignUp = () => {
  //hooks
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  //exibir/esconder a senha
  const tooglePassword = () => setShowPassword(!showPassword);
  const toogleConfirmPassword = () =>
    setshowConfirmPassword(!showConfirmPassword);

  //validar com zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(cadSchema),
  });

  const onSubmit = async (data) => {
    console.log(`Dados válidos`, data);

    try {
      const response = await axios.post(`${apiUrl}/user/cadUser`, data);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Erro ao cadastrar";
      toast.error(msg);
    }
  };

  //navegar
  const backHome = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center w-full h-screen blue-degr-bg relative">
      <div className="absolute top-5 left-7">
        <p className="text-yellow-400 text-3xl font-logo">To-do list</p>
      </div>

      <div className="flex flex-col w-[95%] max-w-md bg-white border-2 h-auto p-4 rounded-lg">
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
            Cadastro de usuario
          </h4>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <input
              {...register("name")}
              className="rounded-md border-2 border-blue-500 focus:border-blue-800 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200  p-1 placeholder-slate-500"
              placeholder="Digite seu nome"
              type="text"
              id="name"
            />
            {errors.name && (
              <p style={{ color: "red" }}>{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <input
              {...register("email")}
              className="rounded-md border-2 border-blue-500 focus:border-blue-800 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200  p-1 placeholder-slate-500"
              placeholder="Digite seu email"
              type="email"
              id="email"
            />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <div className="relative w-full">
              <input
                {...register("password")}
                className="w-full rounded-md border-2 border-blue-500 focus:border-blue-800 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200  p-1 placeholder-slate-500"
                placeholder="Digite sua senha"
                type={showPassword ? "text" : "password"}
                id="password"
              />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password.message}</p>
              )}
              <span
                onClick={tooglePassword}
                className="cursor-pointer absolute right-3 top-2"
              >
                {showPassword ? (
                  <AiOutlineEye size={20} />
                ) : (
                  <AiOutlineEyeInvisible size={20} />
                )}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="relative w-full">
              <input
                {...register("confirmPassword")}
                className="w-full rounded-md border-2 border-blue-500 focus:border-blue-800 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 p-1 placeholder-slate-500"
                placeholder="Confirme sua senha"
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
              />
              {errors.confirmPassword && (
                <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
              )}
              <span
                onClick={toogleConfirmPassword}
                className="cursor-pointer absolute right-3 top-2"
              >
                {showConfirmPassword ? (
                  <AiOutlineEye size={20} />
                ) : (
                  <AiOutlineEyeInvisible size={20} />
                )}
              </span>
            </div>
          </div>

          <div className="flex flex-col w-full mt-8 gap-2">
            <button className="dark-blue-bg p-2 rounded-lg text-white hover:bg-[#0a161f]">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
