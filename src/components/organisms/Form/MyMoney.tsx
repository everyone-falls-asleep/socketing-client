import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { getUserPoints } from "../../../api/users/usersApi";
import { UserContext } from "../../../store/UserContext";
import Button from "../../atoms/buttons/Button";

const MyMoney = () => {
  const { userId } = useContext(UserContext);
  const [userPoints, setUserPoints] = useState<number>(-1);
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  if (!userId) return;

  const fetchUserPoints = async () => {
    try {
      if (!userId) {
        toast.error("사용자 정보를 가져올 수 없습니다.");
        return;
      }
      await delay(500);
      const response = await getUserPoints(userId);
      if (response.code === 0 && response.data) {
        setUserPoints(response.data.point ?? 0); // undefined일 경우 0으로 설정
      } else {
        toast.error("금액을 불러오지 못했습니다");
      }
    } catch (error) {
      console.error("금액 조회 중 오류 발생:", error);
      toast.error("금액 조회 중 문제가 발생했습니다.");
    }
  };
  return (
    <>
      <h2 className="mt-2 text-2xl font-bold text-gray-800 mb-4">
        보유 금액 조회
      </h2>

      <div className="bg-white pl-2 rounded-lg">
        <div className="flex justify-between">
          <p className="font-bold text-gray-800 mt-4 flex items-baseline justify-between space-x-5">
            <Button
              onClick={() => {
                fetchUserPoints().catch((error) => {
                  console.error("조회 중 오류 발생:", error);
                  toast.error("조회 중 문제가 발생했습니다.");
                });
              }}
            >
              보유 금액 조회
            </Button>{" "}
            <span className="text-lg">
              {userPoints === -1
                ? "조회를 눌러주세요"
                : `${userPoints.toLocaleString()} 원`}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default MyMoney;
