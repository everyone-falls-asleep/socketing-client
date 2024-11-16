import { useState } from "react";
import { NewEvent } from "../../../types/api/event";
import Container from "../../layout/Container";
import Input from "../../atoms/inputs/Input";
import Button from "../../atoms/buttons/Button";
import { createNewEvent } from "../../../api/events/eventsApi";
import { useMutation } from "@tanstack/react-query";
import { NewEventResponse } from "../../../types/api/event";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "../../../types/api/common";
import { toast } from "react-toastify";
import { useEventCreate } from "../../../store/EventCreateContext";

const EventRegisterForm = () => {
  const { setEvent } = useEventCreate();

  const [formData, setFormData] = useState<NewEvent>({
    title: "",
    thumbnail: "",
    place: "",
    cast: "",
    ageLimit: 12,
    eventDates: [new Date().toISOString().slice(0, 16)],
    svg: "",
  });

  const mutation = useMutation<
    NewEventResponse,
    AxiosError<ApiErrorResponse>,
    NewEvent,
    unknown
  >({
    mutationFn: createNewEvent,

    onSuccess: (response: NewEventResponse) => {
      console.log(response);
      toast.success(
        "공연이 등록되었습니다. 좌석을 배치하여 좌석 배치도를 등록해주세요."
      );
      if (response.data) {
        setEvent(response.data);
      }
    },

    onError: (error: AxiosError<ApiErrorResponse>) => {
      if (error.response) {
        toast.error("공연 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
  });

  const handleChange = (
    field: keyof NewEvent,
    value: string | number | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (index: number, value: string) => {
    const updatedDates = [...formData.eventDates];
    updatedDates[index] = value;
    handleChange("eventDates", updatedDates);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      handleChange("svg", event.target?.result as string);
      console.log(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  const onSubmit = () => {
    mutation.mutate(formData);
  };

  return (
    <div>
      <Container width="2000px" className="flex items-start">
        <label>
          공연 이름:
          <Input
            className="w-[200px]"
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </label>
        <label>
          포스터 URL:
          <Input
            className="w-[200px]"
            type="text"
            value={formData.thumbnail}
            onChange={(e) => handleChange("thumbnail", e.target.value)}
          />
        </label>
        <label>
          장소:
          <Input
            className="w-[200px]"
            type="text"
            value={formData.place}
            onChange={(e) => handleChange("place", e.target.value)}
          />
        </label>
        <label>
          가수:
          <Input
            className="w-[200px]"
            type="text"
            value={formData.cast}
            onChange={(e) => handleChange("cast", e.target.value)}
          />
        </label>
        <label>
          연령 제한:
          <Input
            className="w-[200px]"
            type="number"
            value={formData.ageLimit}
            onChange={(e) => handleChange("ageLimit", Number(e.target.value))}
          />
        </label>
      </Container>
      <Container width="2000px" className="flex items-start">
        <label className="pr-3">공연 날짜:</label>
        <Input
          className="w-[250px]"
          type="datetime-local"
          value={formData.eventDates}
          onChange={(e) => handleDateChange(0, e.target.value)}
        />
        <div className="flex items-center">
          <label className="pl-10 p-3 w-[200px]">배치도 업로드:</label>
          <input
            type="file"
            accept="image/svg+xml,.svg"
            className="w-full"
            onChange={handleImageUpload}
          />
        </div>
        <Button
          variant="primary"
          onClick={() => {
            onSubmit();
          }}
        >
          공연 등록
        </Button>
      </Container>
    </div>
  );
};

export default EventRegisterForm;
