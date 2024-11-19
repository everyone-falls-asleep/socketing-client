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
          />
        }
        rightTopContent={<div>rightT</div>}
        rightBottomContent={<div>rightB</div>}
        isLeftSidebarOpen={isLeftSidebarOpen}
        toggleSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
      />
    </EventCreateProvider>
  );
};

export default RegisterEventPage;
