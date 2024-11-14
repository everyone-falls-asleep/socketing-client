import SubTitle from "../../atoms/titles/subtitle/SubTitle";
import Container from "../../layout/Container";
import LabeledInput from "../../molecules/labeledinput/LabeledInput";
import Button from "../../atoms/buttons/Button";

import { sendRegisterRequest } from "../../../api/authentication/authApi";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { LoginData, RegisterResponse } from "../../../types/api/user";
import { ApiErrorResponse } from "../../../types/api/common";
import { AxiosError } from "axios";

const JoinForm = () => {

  const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginData>();

  const mutation = useMutation<
    RegisterResponse,
    AxiosError<ApiErrorResponse>,
    LoginData,
    unknown
  >({
    mutationFn: sendRegisterRequest,

    onSuccess: (response: RegisterResponse) => {
      alert(`환영합니다, ${response.data?.nickname}님 !`);
    },

    onError: (error: AxiosError<ApiErrorResponse>) => {
      if (error.response) {
        const code = error.response.data.code;
        if (code === 5) {
          const field = error.response.data.details?.[0].field;
          const message = field === 'email'
            ? '이메일 형식이 올바르지 않습니다.'
            : '비밀번호는 6글자 이상이어야 합니다.';
          
          if (field) {
            setError(field as keyof LoginData, { type: 'manual', message });
          }
        } else if (code === 1) {
          setError('email', { type: 'manual', message: '이미 가입된 사용자입니다.' });
        } else {
          alert('회원가입에 실패하였습니다.');
        }
      }
    },
  });

  const onSubmit = (data: LoginData) => {
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <div>
      <SubTitle>회원가입</SubTitle>
      <Container width="400px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabeledInput
            {...register('email')}
            placeholder="이메일을 입력해주세요"
            label="EMAIL"
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
          <br />
          <LabeledInput
            {...register('password')}
            placeholder="비밀번호를 입력해주세요"
            label="PASSWORD"
            type="password"
          />
          {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
          <br />
          <Button type="submit">회원가입</Button>
        </form>
      </Container>
    </div>
  );
};

export default JoinForm;
