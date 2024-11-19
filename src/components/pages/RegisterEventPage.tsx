import React, { useState } from "react";
import EventRegisterForm from "../organisms/Form/EventRegisterForm";
import SeatMaker from "../organisms/event-register/SeatMaker";
import SeatControlPanel from "../organisms/event-register/SeatControlPanel";
import { EventCreateProvider } from "../../store/EventCreateContext";
import FourSectionLayout from "../layout/FourSectionLayout";
import { Seat } from "../../types/api/event";

const RegisterEventPage: React.FC = () => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState<boolean>(true);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const [currentArea, setCurrentArea] = useState<number>(1);
  const [currentRow, setCurrentRow] = useState<number>(1);
  const [currentNumber, setCurrentNumber] = useState<number>(1);
  const [currentPrice, setCurrentPrice] = useState<string>("50000");
  const [seats, setSeats] = useState<Seat[]>([]);
  const [snapToGrid, setSnapToGrid] = React.useState<boolean>(false);

  return (
    <EventCreateProvider>
      <FourSectionLayout
        topContent={<EventRegisterForm />}
        leftSidebarContent={
          <SeatControlPanel
            seats={seats}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            currentArea={currentArea}
            setCurrentArea={setCurrentArea}
            currentRow={currentRow}
            setCurrentRow={setCurrentRow}
            currentNumber={currentNumber}
            setCurrentNumber={setCurrentNumber}
            currentPrice={currentPrice}
            setCurrentPrice={setCurrentPrice}
            onComplete={(updatedSeats: Seat[]) => setSeats(updatedSeats)}
            snapToGrid={snapToGrid}
            setSnapToGrid={setSnapToGrid}
          />
        }
        centerContent={
          <SeatMaker
            isEditMode={isEditMode}
            scale={scale}
            setScale={setScale}
            currentArea={currentArea}
            currentRow={currentRow}
            currentNumber={currentNumber}
            setCurrentNumber={setCurrentNumber}
            seats={seats}
            setSeats={setSeats}
            isDateSidebarOpen={isLeftSidebarOpen}
            snapToGrid={snapToGrid}
            setSnapToGrid={setSnapToGrid}
          />
        }
        rightTopContent={
          <div className="bg-gray-100 shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold">우측 상단 콘텐츠</h2>
            <p>이곳에 필요한 내용을 추가하세요.</p>
          </div>
        }
        rightBottomContent={
          <div className="bg-gray-50 shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold">우측 하단 콘텐츠</h2>
            <p>여기도 마찬가지로 내용을 입력하세요.</p>
          </div>
        }
        isLeftSidebarOpen={isLeftSidebarOpen}
        toggleSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
      />
    </EventCreateProvider>
  );
};

export default RegisterEventPage;
