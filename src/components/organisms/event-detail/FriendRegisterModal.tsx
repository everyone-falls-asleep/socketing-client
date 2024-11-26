import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../../atoms/buttons/Button";
import Modal from "../../molecules/modal/Modal";
import Input from "../../atoms/inputs/Input";
import { mockEventFriends } from "../../../mocks/mockEventFriendData";
import { useEffect, useState } from "react";
import { useMockEventFriendContext } from "../../../mocks/MockEventFriendContext";

interface FriendRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type EmailOnlyData = {
  email: string;
};

const FriendRegisterModal = ({ isOpen, onClose }: FriendRegisterModalProps) => {
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

  const { eventFriends, addEventFriend, deleteEventFriend } =
    useMockEventFriendContext();

  const [eventFriendIndex, setEventFriendIndex] = useState(0);

  const handleClose = () => {
    onClose();
  };

  // // Mock API request
  // const mockPostEventFriend = async (email: string) => {
  //   console.log(email, "로 친구 요청 보내기");
  //   await new Promise((resolve) => setTimeout(resolve, 500));

  //   setEventFriendIndex(eventFriendIndex + 1);
  //   console.log(eventFriendIndex);

  //   return {
  //     code: "200",
  //     message: "success",
  //     data: mockEventFriends[eventFriendIndex - 1],
  //   };
  // };

  // 디버깅용
  useEffect(() => {
    console.log("eventFriends updated:", eventFriends);
  }, [eventFriends]);

  const onSubmit: SubmitHandler<EmailOnlyData> = (data) => {
    if (!data.email) {
      setError("email", {
        type: "manual",
        message: "이메일을 입력해 주세요",
      });

      return;
    }
    const newEventFriend = mockEventFriends[eventFriendIndex];
    console.log(newEventFriend);
    addEventFriend(newEventFriend);
    setEventFriendIndex(eventFriendIndex + 1);
    console.log("modal", eventFriends); // 상태 업데이트가 안 됨
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="space-y-4">
        <h3 className="text-lg font-bold">연석 친구 등록하기</h3>
        <form
          onSubmit={(e) => void handleSubmit(onSubmit)(e)}
          className="space-y-4"
        >
          <div className="mt-4">
            <div className="flex flex-col w-full">
              <div className="flex justify-between">
                <Input
                  {...register("email", {
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "유효한 이메일 주소를 입력해 주세요",
                    },
                  })}
                  placeholder="친구 이메일을 입력해 주세요"
                />
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? "조회 중..." : "친구 요청"}
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

          <div className="flex justify-end mt-6">
            {/* <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              className="mr-2"
            >
              취소
            </Button> */}
          </div>
        </form>
        {eventFriends.length > 0 && (
          <div className="mb-4 p-3 bg-gray-50 rounded-md flex flex-col gap-1">
            {eventFriends.map((eventFriend, index) => (
              <div
                key={index}
                className="text-sm text-gray-700 flex flex-col md:flex-row space-x-2 md:space-x-2 space-y-2 md:space-y-0 justify-between items-center"
              >
                <div>
                  {eventFriend.user.nickname} ({eventFriend.user.email})
                  <div>승낙 상태: {eventFriend.status}</div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      deleteEventFriend(eventFriend.id);
                    }}
                  >
                    취소
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center items-center">
          <div>전체 친구 수: 1/{eventFriends.length}명</div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          variant="primary"
          onClick={() => {
            // EventFriend 테이블 get 요청 로직
          }}
        >
          친구 조회
        </Button>
      </div>
    </Modal>
  );
};

export default FriendRegisterModal;
