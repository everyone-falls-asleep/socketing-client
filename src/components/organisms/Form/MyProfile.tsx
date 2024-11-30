import React, { useState, useEffect, useContext } from "react";
import { getUserInfo, updateUserNickname } from "../../../api/users/usersApi"; // 사용자 정보 API 가져오기
import Container from "../../layout/Container";
import Button from "../../atoms/buttons/Button";
import { UserContext } from "../../../store/UserContext";

const MyProfile = () => {
  const [profileData, setProfileData] = useState({
    nickname: "",
    email: "",
  }); // 사용자 프로필 데이터
  const { userId } = useContext(UserContext);

  const fetchProfile = async () => {
    if (!userId) return;
    try {
      const data = await getUserInfo(userId);
      const user = data.data;
      if (user) {
        setProfileData({
          nickname: user.nickname,
          email: user.email,
        });
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  useEffect(() => {
    if (userId) {
      void fetchProfile();
    }
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNicknameUpdate = async () => {
    if (!userId) return;
    try {
      const updatedData = await updateUserNickname(
        userId,
        profileData.nickname
      );
      if (!updatedData) throw new Error("No update");
      alert(`새로운 닉네임 : ${updatedData.data?.nickname}`);
    } catch (error) {
      alert("닉네임 업데이트 중 문제가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    <Container width="400px">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">나의 프로필</h2>

      {/* 이메일 */}
      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          이메일
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={profileData.email}
          readOnly // 이메일은 수정 불가능
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
        />
      </div>
      {/* 닉네임 */}
      <div className="mb-6">
        <label
          htmlFor="nickname"
          className="block text-gray-700 font-medium mb-2"
        >
          닉네임
        </label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          value={profileData.nickname}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
      </div>

      {/* 수정 버튼 */}
      <Button onClick={() => void handleNicknameUpdate()}>수정</Button>
    </Container>
  );
};

export default MyProfile;
