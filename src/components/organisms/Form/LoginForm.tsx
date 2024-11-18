import SubTitle from "../../atoms/titles/subtitle/SubTitle";
import Button from "../../atoms/buttons/Button";
import LabeledInput from "../../molecules/labeledinput/LabeledInput";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { LoginData } from "../../../types/api/user";

interface LoginFormProps {
  register: UseFormRegister<LoginData>;
  handleSubmit: UseFormHandleSubmit<LoginData>;
  onSubmit: (data: LoginData) => void;
  errors: FieldErrors<LoginData>;
}

const LoginForm = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
}: LoginFormProps) => {
  return (
    <div className="mx-auto w-full sm:max-w-[25rem] md:max-w-[30rem] lg:max-w-[35rem] xl:max-w-[40rem] px-4">
      <SubTitle className="p-2 text-center">로그인</SubTitle>
      <div className="login-form-container mt-5">
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
          <Button type="submit">로그인</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
