import { useState } from "react";
import { Subtitle } from "../../atoms/title/Title";
import Container from "../../layout/Container";
import LabeledInput from "../../molecules/labeled-input/LabeledInput";
import Button from "../../atoms/buttons/Button";

const JoinForm = () => {
  const [nickname, setNickname] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Subtitle textAlign="center">회원가입</Subtitle>
      <Container width="400px">
        <LabeledInput
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력해주세요"
          label="NICKNAME"
        />
        <br />
        <LabeledInput
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디를 입력해주세요"
          label="ID"
        />
        <br />
        <LabeledInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          label="PASSWORD"
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
