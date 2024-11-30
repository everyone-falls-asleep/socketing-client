import { useForm, Controller } from "react-hook-form";
import { NewEvent, NewSeat } from "../../../types/api/event";
import Input from "../../atoms/inputs/Input";
import Button from "../../atoms/buttons/Button";
import { createNewEvent, createNewSeat } from "../../../api/events/eventsApi";
import { usePostMutation } from "../../../hooks/usePostMutation";
import { NewEventResponse, NewSeatResponse } from "../../../types/api/event";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "../../../types/api/common";
import { toast } from "react-toastify";
import { useEventCreate } from "../../../store/EventCreateContext";
import {
  postEventErrorMessages,
  postSeatErrorMessages,
} from "../../../constants/errorMessages";

const EventRegisterForm = () => {
  const {
    setEvent,
    setImageUrl,
    contours,
    setSelectedContour,
    setSelectedContours,
  } = useEventCreate();

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
      eventDates: [
        new Date(new Date().setDate(new Date().getDate() + 7))
          .toISOString()
          .slice(0, 16),
      ],
      svg: "",
      ticketingStartTime: new Date(new Date().setDate(new Date().getDate() + 7))
        .toISOString()
        .slice(0, 16),
    },
  });

  // Event 생성을 위한 mutation
  const createEventMutation = usePostMutation<
    NewEventResponse,
    AxiosError<ApiErrorResponse>,
    NewEvent
  >(createNewEvent, {
    onSuccess: async (response: NewEventResponse) => {
      if (response.data) {
        setEvent(response.data);
        // Event 생성 성공 후 좌석 생성 시작
        await handleSeatCreation(response.data.id);
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

  // Seat 생성을 위한 mutation
  const createSeatMutation = usePostMutation<
    NewSeatResponse,
    AxiosError<ApiErrorResponse>,
    NewSeat
  >(createNewSeat);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);

    const reader = new FileReader();
    reader.onload = (event) => {
      onChange(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  // SVG 데이터 생성
  const generateSVGData = () => {
    const svgElement = document.querySelector("svg");
    if (!svgElement) return null;

    const clonedSvg = svgElement.cloneNode(true) as SVGElement;
    const seatsGroup = clonedSvg.querySelector("g.seats");
    if (seatsGroup) {
      seatsGroup.remove();
    }
    console.log("Generated SVG:", clonedSvg.outerHTML); // 저장되는 내용 확인

    return {
      svgString: clonedSvg.outerHTML,
    };
  };

  // 좌석 생성 핸들러
  const handleSeatCreation = async (eventId: string) => {
    try {
      const seatContours = contours.filter((c) => c.type === "seat");

      const results = await Promise.allSettled(
        seatContours.map((contour) => {
          const newSeat: NewSeat = {
            event_id: eventId,
            cx: contour.cx || 0,
            cy: contour.cy || 0,
            area: parseInt(contour.area?.toString() || "0"),
            row: contour.row || 0,
            number: contour.number || 0,
          };
          return createSeatMutation.mutateAsync(newSeat);
        })
      );

      const hasError = results.some((result) => result.status === "rejected");

      if (hasError) {
        const firstError = results.find(
          (result): result is PromiseRejectedResult =>
            result.status === "rejected"
        );

        if (firstError) {
          const error = firstError.reason as AxiosError<ApiErrorResponse>;
          if (error.response) {
            const code = error.response.data.code;
            switch (code) {
              case 8:
                toast.error(postSeatErrorMessages.invalidToken);
                break;
              case 5:
                toast.error(postSeatErrorMessages.validation);
                break;
              case 9:
                toast.error(postSeatErrorMessages.inValidevent);
                break;
              case 10:
                toast.error(postSeatErrorMessages.duplicatesSeat);
                break;
              default:
                toast.error(postSeatErrorMessages.general);
            }
          }
        }
      } else {
        toast.success("공연과 좌석이 성공적으로 등록되었습니다.");
      }
    } catch (error) {
      console.error("Seat creation error:", error);
      toast.error(postSeatErrorMessages.general);
    }
  };

  const onSubmit = (data: NewEvent) => {
    setSelectedContour(null);
    setSelectedContours([]);
    const svgData = generateSVGData();
    if (!svgData) {
      toast.error("SVG 데이터를 찾을 수 없습니다.");
      return;
    }

    const eventData = {
      ...data,
      svg: JSON.stringify(svgData),
    };

    createEventMutation.mutate(eventData);
  };

  return (
    <form
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
      className="w-full h-full"
    >
      <div className="w-full h-full flex items-center">
        <div className="px-8 gap-6 flex items-center">
          <div className="flex flex-col items-start">
            <label className="font-bold mb-1">공연 이름</label>
            <Input
              className=""
              type="text"
              {...register("title", {
                required: "공연 이름은 필수 항목입니다.",
              })}
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>

          <div className="flex flex-col items-start">
            <label className="font-bold mb-1">포스터 URL</label>
            <Input
              className=""
              type="text"
              {...register("thumbnail", {
                required: "포스터 URL은 필수 항목입니다.",
              })}
            />
            {errors.thumbnail && (
              <span className="text-red-500">{errors.thumbnail.message}</span>
            )}
          </div>

          <div className="flex flex-col items-start">
            <label className="font-bold mb-1">장소</label>
            <Input
              className=""
              type="text"
              {...register("place", { required: "장소는 필수 항목입니다." })}
            />
            {errors.place && (
              <span className="text-red-500">{errors.place.message}</span>
            )}
          </div>

          <div className="flex flex-col items-start">
            <label className="font-bold mb-1">아티스트</label>
            <Input
              className=""
              type="text"
              {...register("cast", { required: "가수는 필수 항목입니다." })}
            />
            {errors.cast && (
              <span className="text-red-500">{errors.cast.message}</span>
            )}
          </div>

          <div className="flex w-[130px] flex-col items-start">
            <label className="font-bold mb-1">연령 제한</label>
            <Input
              className=""
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
          <div className="space-y-2">
            <div className="flex flex-col items-start">
              <label className="font-bold mb-1">
                <span className="text-rose-400">티켓팅</span> 날짜
              </label>
              <Controller
                control={control}
                name="ticketingStartTime"
                rules={{ required: "티켓팅 날짜는 필수 항목입니다." }}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="w-[235px] h-6"
                    type="datetime-local"
                    onChange={(e) => {
                      // UTC 시간으로 변환
                      const localDate = new Date(e.target.value);
                      const utcDate = localDate.toISOString();
                      field.onChange(utcDate);
                    }}
                    // 화면에 보여줄 때는 다시 로컬 시간으로 변환
                    value={
                      field.value
                        ? new Date(field.value)
                            .toLocaleString("sv-SE", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })
                            .replace(" ", "T")
                        : ""
                    }
                  />
                )}
              />
              {errors.eventDates?.[0] && (
                <span className="text-red-500">
                  {errors.eventDates[0]?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col items-start">
              <label className="font-bold mb-1">
                <span className="text-rose-400">공연</span> 날짜
              </label>
              <Controller
                control={control}
                name="eventDates.0"
                rules={{ required: "공연 날짜는 필수 항목입니다." }}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="w-[235px] h-6"
                    type="datetime-local"
                    onChange={(e) => {
                      // UTC 시간으로 변환
                      const localDate = new Date(e.target.value);
                      const utcDate = localDate.toISOString();
                      field.onChange(utcDate);
                    }}
                    // 화면에 보여줄 때는 다시 로컬 시간으로 변환
                    value={
                      field.value
                        ? new Date(field.value)
                            .toLocaleString("sv-SE", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })
                            .replace(" ", "T")
                        : ""
                    }
                  />
                )}
              />
              {errors.eventDates?.[0] && (
                <span className="text-red-500">
                  {errors.eventDates[0]?.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-start">
            <label className="font-bold mb-1">배치도 업로드</label>
            <Controller
              control={control}
              name="svg"
              rules={{ required: "배치도 업로드는 필수 항목입니다." }}
              render={({ field }) => (
                <input
                  type="file"
                  accept="image/jpeg,.jpg" // JPG 파일만 허용
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
        </div>
      </div>
    </form>
  );
};

export default EventRegisterForm;
