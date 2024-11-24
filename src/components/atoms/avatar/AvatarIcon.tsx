import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { getUserInfo } from "../../../api/users/usersApi";
import { UserResponse } from "../../../types/api/user";

interface AvatarIconProps {
  userId: string; // 사용자 ID를 props로 받음
}

const AvatarIcon: React.FC<AvatarIconProps> = ({ userId }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null); // 프로필 이미지 상태
  const navigate = useNavigate();

  useEffect(() => {
    // 사용자 정보 가져오기
    const fetchUserInfo = async () => {
      try {
        const response: UserResponse = await getUserInfo(userId); // API 호출
        const user = response?.data; // API 응답 데이터에서 사용자 정보 추출
        if (user) {
          setProfileImage(user.profileImage || null); // 프로필 이미지 설정
        } else {
          console.warn("User data is undefined or null");
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    void fetchUserInfo();
  }, [userId]); // userId가 변경될 때마다 호출

  return (
    <div className="flex items-center justify-center">
      {profileImage ? (
        <img
          src={profileImage}
          alt="User Avatar"
          className="h-8 w-8 rounded-full object-cover cursor-pointer"
          onClick={() => navigate(`/mypage/${userId}`)} // 클릭 시 마이페이지로 이동
        />
      ) : (
        <UserCircleIcon
          aria-hidden="true"
          className="h-8 w-8 text-gray-100 cursor-pointer"
          onClick={() => navigate(`/mypage/${userId}`)} // 클릭 시 마이페이지로 이동
        />
      )}
    </div>
  );
};

export default AvatarIcon;
