import { useForm, Controller } from "react-hook-form";
import { NewEvent } from "../../../types/api/event";
import Container from "../../layout/Container";
import Input from "../../atoms/inputs/Input";
import Button from "../../atoms/buttons/Button";
import { createNewEvent } from "../../../api/events/eventsApi";
import { usePostMutation } from "../../../hooks/usePostMutation";
import { NewEventResponse } from "../../../types/api/event";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "../../../types/api/common";
import { toast } from "react-toastify";
import { useEventCreate } from "../../../store/EventCreateContext";
import { postEventErrorMessages } from "../../../constants/errorMessages";

const EventRegisterForm = () => {
  const { setEvent } = useEventCreate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewEvent>({
    defaultValues: {
      title: "",
      thumbnail: "",
      place: "",
      cast: "",
      ageLimit: 12,
      eventDates: [new Date().toISOString().slice(0, 16)],
      svg: "",
    },
  });

  const createEventMutation = usePostMutation<
    NewEventResponse,
    AxiosError<ApiErrorResponse>,
    NewEvent
  >(createNewEvent, {
    onSuccess: (response: NewEventResponse) => {
      toast.success(
        "공연이 등록되었습니다. 이제 좌석을 배치하여 좌석 배치도를 등록해주세요."
      );
      if (response.data) {
        setEvent(response.data);
      }
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      if (error.response) {
        if (error.response.data.code === 8) {
          toast.error(postEventErrorMessages.invalidToken);
        } else {
          toast.error(postEventErrorMessages.general);
        }
      }
    },
  });

  const onSubmit = (data: NewEvent) => {
    createEventMutation.mutate(data);
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      onChange(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  return (
    <form
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
      className="w-full h-full"
    >
      <div className="w-full h-full flex items-center">
        <Container width="2000px" className="flex items-start ">
          <div className="flex flex-col items-start mr-4">
            <label>공연 이름:</label>
            <Input
              className="w-[200px]"
              type="text"
              {...register("title", {
                required: "공연 이름은 필수 항목입니다.",
              })}
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>

          <div className="flex flex-col items-start mr-4">
            <label>포스터 URL:</label>
            <Input
              className="w-[200px]"
              type="text"
              {...register("thumbnail", {
                required: "포스터 URL은 필수 항목입니다.",
              })}
            />
            {errors.thumbnail && (
              <span className="text-red-500">{errors.thumbnail.message}</span>
            )}
          </div>

          <div className="flex flex-col items-start mr-4">
            <label>장소:</label>
            <Input
              className="w-[200px]"
              type="text"
              {...register("place", { required: "장소는 필수 항목입니다." })}
            />
            {errors.place && (
              <span className="text-red-500">{errors.place.message}</span>
            )}
          </div>

          <div className="flex flex-col items-start mr-4">
            <label>가수:</label>
            <Input
              className="w-[200px]"
              type="text"
              {...register("cast", { required: "가수는 필수 항목입니다." })}
            />
            {errors.cast && (
              <span className="text-red-500">{errors.cast.message}</span>
            )}
          </div>

          <div className="flex flex-col items-start mr-4">
            <label>연령 제한:</label>
            <Input
              className="w-[200px]"
              type="number"
              {...register("ageLimit", {
                required: "연령 제한은 필수 항목입니다.",
                valueAsNumber: true,
              })}
            />
            {errors.ageLimit && (
              <span className="text-red-500">{errors.ageLimit.message}</span>
            )}
          </div>

          <div className="flex flex-col items-start mr-4">
            <label>공연 날짜:</label>
            <Controller
              control={control}
              name="eventDates.0"
              rules={{ required: "공연 날짜는 필수 항목입니다." }}
              render={({ field }) => (
                <Input className="w-[250px]" type="datetime-local" {...field} />
              )}
            />
            {errors.eventDates?.[0] && (
              <span className="text-red-500">
                {errors.eventDates[0]?.message}
              </span>
            )}
          </div>

          <div className="flex flex-col items-start mr-4">
            <label>배치도 업로드:</label>
            <Controller
              control={control}
              name="svg"
              rules={{ required: "배치도 업로드는 필수 항목입니다." }}
              render={({ field }) => (
                <input
                  type="file"
                  accept="image/svg+xml,.svg"
                  className="w-full"
                  onChange={(e) => handleImageUpload(e, field.onChange)}
                />
              )}
            />
            {errors.svg && (
              <span className="text-red-500">{errors.svg.message}</span>
            )}
          </div>

          <Button variant="primary" type="submit" className="mt-6">
            공연 등록
          </Button>
        </Container>
      </div>
    </form>
  );
};

export default EventRegisterForm;
