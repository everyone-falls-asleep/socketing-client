import MainLayout from "../layout/MainLayout";
import LoginForm from "../organisms/Form/LoginForm";
import LoginTemplate from "../templates/login/LoginTemplate";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "../../types/api/common";
import { LoginData, LoginResponse } from "../../types/api/user";
import { useMutation } from "@tanstack/react-query";
import { sendLoginRequest } from "../../api/authentication/authApi";
import { useAuth } from "../../hooks/useAuth";
import { loginErrorMessages } from "../../constants/errorMessages";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { saveAuthInfo } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginData>();

  const mutation = useMutation<
    LoginResponse,
    AxiosError<ApiErrorResponse>,
    LoginData
  >({
    mutationFn: sendLoginRequest,

    onSuccess: (response: LoginResponse) => {
      const token = response.data?.accessToken;
      if (token) {
        saveAuthInfo(token);
      }
    },

    onError: (error: AxiosError<ApiErrorResponse>) => {
      if (error.response) {
        const code = error.response.data.code;
        if (code === 5) {
          const field = error.response.data.details?.[0].field;
          const message =
            field === "email"
              ? loginErrorMessages.validation.emailInvalid
              : loginErrorMessages.validation.passwordInvalid;

          if (field) {
            setError(field as keyof LoginData, { type: "manual", message });
          }
        } else if (code === 2) {
          setError("password", {
            type: "manual",
            message: loginErrorMessages.noMatch,
          });
        } else {
          toast.error(loginErrorMessages.generic);
        }
      }
    },
  });

  const onSubmit = (data: LoginData) => {
    mutation.mutate(data);
  };

  return (
    <MainLayout>
      <LoginTemplate
        loginForm={
          <LoginForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
          />
        }
      />
    </MainLayout>
  );
};

export default LoginPage;
