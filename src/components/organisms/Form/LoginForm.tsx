import { useState } from "react";
import Subtitle from "../../atoms/titles/subtitle/SubTitle";
import Container from "../../layout/Container";
import Input from "../../atoms/inputs/Input";
import Button from "../../atoms/buttons/Button";

const LoginForm = () => {
  const [id, setId] = useState(""); // 아이디 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태

  return (
    <div>
      <Subtitle>로그인</Subtitle>
      <Container width="400px">
        <Input
          value={id}
          onChange={(e) => setId(e.target.value)} // onChange로 상태 업데이트
          placeholder="아이디를 입력해주세요"
        />
        <br />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)} // onChange로 상태 업데이트
          placeholder="비밀번호를 입력해주세요"
          type="password" // 비밀번호 입력 타입
        />
        <br />
        <Button onClick={() => console.log("로그인 시도", { id, password })}>
          로그인
        </Button>
      </Container>
    </div>
  );
};

export default LoginForm;
