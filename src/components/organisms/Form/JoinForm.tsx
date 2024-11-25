import SubTitle from "../../atoms/titles/subtitle/SubTitle";
import Container from "../../layout/Container";
import LabeledInput from "../../molecules/labeledinput/LabeledInput";
import Button from "../../atoms/buttons/Button";

import {
  sendRegisterRequest,
  sendLoginRequest,
} from "../../../api/authentication/authApi";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  LoginData,
  RegisterResponse,
  LoginResponse,
} from "../../../types/api/user";
import { JoinConfirmData } from "../../../types/form/user";
import { ApiErrorResponse } from "../../../types/api/common";
import { AxiosError } from "axios";
import { registerErrorMessages } from "../../../constants/errorMessages";
import { toast } from "react-toastify";

import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const JoinForm = () => {
  const { saveAuthInfo } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<JoinConfirmData>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      role: "user",
    },
  });

  const mutation = useMutation<
    RegisterResponse,
    AxiosError<ApiErrorResponse>,
    LoginData,
    unknown
  >({
    mutationFn: sendRegisterRequest,

    onSuccess: async () => {
      const loginData = {
        email: watch("email"),
        password: watch("password"),
        // role: watch("role"),
      };

      try {
        const loginResponse: LoginResponse = await sendLoginRequest(loginData);
        console.log(loginResponse.data);
        const loginToken = loginResponse.data?.accessToken;
        if (loginToken) {
          saveAuthInfo(loginToken);
        }
      } catch (error) {
        console.error("자동 로그인 실패:", error);
        toast.error("자동 로그인에 실패했습니다. 로그인 페이지로 이동합니다.");
        navigate("/login");
      }
    },

    onError: (error: AxiosError<ApiErrorResponse>) => {
      if (error.response) {
        const code = error.response.data.code;
        if (code === 5) {
          const field = error.response.data.details?.[0].field;
          const message =
            field === "email"
              ? registerErrorMessages.validation.emailInvalid
              : registerErrorMessages.validation.passwordInvalid;

          if (field) {
            setError(field as keyof LoginData, { type: "manual", message });
          }
        } else if (code === 1) {
          setError("email", {
            type: "manual",
            message: registerErrorMessages.duplicateUser,
          });
        } else {
          toast.error(registerErrorMessages.generic);
        }
      }
    },
  });

  const onSubmit = (data: JoinConfirmData) => {
    mutation.mutate({
      email: data.email,
      password: data.password,
      role: data.role,
    });
  };

  const password = watch("password");

  return (
    <div>
      <SubTitle>회원가입</SubTitle>
      <Container width="400px">
        <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
          <LabeledInput
            {...register("email")}
            placeholder="이메일을 입력해주세요"
            label="EMAIL"
          />
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}
          <br />
          <LabeledInput
            {...register("password")}
            placeholder="비밀번호를 입력해주세요"
            label="PASSWORD"
            type="password"
          />
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password.message}</span>
          )}
          <br />
          <LabeledInput
            {...register("passwordConfirm", {
              validate: (value) =>
                value === password || "비밀번호가 일치하지 않습니다.",
            })}
            placeholder="비밀번호를 확인해주세요"
            label="PASSWORD CONFIRM"
            type="password"
          />
          {errors.passwordConfirm && (
            <span style={{ color: "red" }}>
              {errors.passwordConfirm.message}
            </span>
          )}
          <br />

          <div>
            <label>
              <input
                type="radio"
                value="user"
                {...register("role", {
                  required: "사용자 유형을 선택해주세요.",
                })}
                className="mr-1"
              />
              일반 사용자
            </label>
            <label style={{ marginLeft: "10px" }}>
              <input
                type="radio"
                value="manager"
                {...register("role", {
                  required: "사용자 유형을 선택해주세요.",
                })}
                className="mr-1"
              />
              판매자
            </label>
          </div>
          {errors.role && (
            <span style={{ color: "red" }}>{errors.role.message}</span>
          )}
          <br />

          <Button type="submit">회원가입</Button>
        </form>
      </Container>
    </div>
  );
};

export default JoinForm;
