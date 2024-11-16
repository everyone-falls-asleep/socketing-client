import { useState } from "react";
import { NewEvent } from "../../../types/api/event";
import Container from "../../layout/Container";
import Input from "../../atoms/inputs/Input";
import Button from "../../atoms/buttons/Button";
import { createNewEvent } from "../../../api/events/eventsApi";

const EventRegisterForm = () => {
  const [formData, setFormData] = useState<NewEvent>({
    title: "",
    thumbnail: "",
    place: "",
    cast: "",
    ageLimit: 12,
    eventDates: [new Date().toISOString().slice(0, 16)],
    svg: "",
  });
  // const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

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

  const handleSubmit = () => {
    console.log(formData);
    const response = createNewEvent(formData);
    console.log(response);
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
            handleSubmit();
          }}
        >
          공연 등록
        </Button>
      </Container>
    </div>
  );
};

export default EventRegisterForm;
