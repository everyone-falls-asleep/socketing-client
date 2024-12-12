import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../../atoms/buttons/Button";
import Modal from "../../molecules/modal/Modal";
import Input from "../../atoms/inputs/Input";
import { User } from "../../../types/api/user";
import { getUserInfoByEmail } from "../../../api/users/usersApi";
import { toast } from "react-toastify";
import { useEventFriendContext } from "../../../store/EventFriendContext";
import { UserContext } from "../../../store/UserContext";
import { useContext } from "react";

interface FriendRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventFriends: User[];
  addFriend: (friend: User) => void;
  deleteFriend: (friendId: string) => void;
}

type EmailOnlyData = {
  email: string;
};

const FriendRegisterModal = ({ isOpen, onClose }: FriendRegisterModalProps) => {
  const { eventFriends, addFriend, deleteFriend } = useEventFriendContext();
  const { userId } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmailOnlyData>({
    defaultValues: {
      email: "",
    },
  });

  const fetchUserInfo = async (email: string) => {
    try {
      const data = await getUserInfoByEmail(email);
      console.log(data.data);
      if (data.data) {
        if (data.data.id === userId) {
          toast.error("다른 사용자의 이름을 입력해주세요.");
        } else {
          addFriend(data.data);
        }
      }
    } catch (error) {
      console.error("사용자 정보 불러오기 실패: ", error);
      toast.error("가입되지 않은 사용자입니다.");
    }
  };

  const handleClose = () => {
    onClose();
  };

  const onSubmit: SubmitHandler<EmailOnlyData> = (data) => {
    if (!data.email) {
      setError("email", {
        type: "manual",
        message: "이름을 입력해 주세요",
      });
      return;
    }
    void fetchUserInfo(data.email);
    reset();
  };

  if (!eventFriends) {
    return;
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="space-y-4">
        <h3 className="text-lg font-bold pl-2">함께할 친구 등록하기</h3>
        <form
          onSubmit={(e) => void handleSubmit(onSubmit)(e)}
          className="space-y-4"
        >
          <div className="mt-4">
            <div className="flex flex-col w-full">
              <div className="flex justify-between space-x-3">
                <Input
                  {...register("email", {
                    required: "이름을 입력해 주세요",
                    validate: (value) =>
                      value.trim() !== "" || "빈 문자열은 입력할 수 없습니다",
                  })}
                  placeholder="친구 이름을 입력해 주세요"
                />
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? "조회 중..." : "친구 등록"}
                </Button>
              </div>
              <div>
                {errors?.email?.message && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors?.email?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </form>
        {eventFriends.length > 0 && (
          <div className="mb-4 p-3 bg-gray-50 rounded-md flex flex-col gap-1">
            {eventFriends.map((eventFriend, index) => (
              <div
                key={index}
                className="text-sm text-gray-700 flex flex-row space-x-2 md:space-x-2 space-y-2 md:space-y-0 justify-between items-center"
              >
                <div className="flex flex-col md:flex-row">
                  <div>{eventFriend.nickname} </div>
                  <div>({eventFriend.email})</div>
                  {/* <div>승낙 상태: {eventFriend.status}</div> */}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      deleteFriend(eventFriend.id);
                    }}
                  >
                    취소
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* <div className="flex justify-center items-center">
          <div>전체 친구 수: 1/{eventFriends.length}명</div>
        </div>
      </div>
      <div className="flex justify-center">
      */}
      </div>
    </Modal>
  );
};

export default FriendRegisterModal;
