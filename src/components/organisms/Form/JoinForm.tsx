import { useState } from "react";
import Subtitle from "../../atoms/titles/subtitle/SubTitle";
import Container from "../../layout/Container";
import Button from "../../atoms/buttons/Button";
import Input from "../../atoms/inputs/Input";

const JoinForm = () => {
  const [nickname, setNickname] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Subtitle>회원가입</Subtitle>
      <Container width="400px">
        <Input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력해주세요"
        />
        <br />
        <Input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디를 입력해주세요"
        />
        <br />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          type="password"
        />
        <br />
        <Button
          onClick={() =>
            console.log("회원가입 시도", { nickname, id, password })
          }
        >
          회원가입
        </Button>
      </Container>
    </div>
  );
};

export default JoinForm;
