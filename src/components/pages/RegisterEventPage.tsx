import React, { useState } from "react";
import EventRegisterForm from "../organisms/Form/EventRegisterForm";
import SeatMaker from "../organisms/event-register/SeatMaker";
import SeatControlPanel from "../organisms/event-register/SeatControlPanel";
import { EventCreateProvider } from "../../store/EventCreateContext";
import FourSectionLayout from "../layout/FourSectionLayout";
import OverallControlPanel from "../organisms/event-register/OverallControlPanel";
import ImageMinimap from "../organisms/event-register/ImageMinimap";

const RegisterEventPage: React.FC = () => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState<boolean>(true);

  return (
    <EventCreateProvider>
      <FourSectionLayout
        topContent={<EventRegisterForm />}
        leftSidebarContent={<SeatControlPanel />}
        centerContent={<SeatMaker isDateSidebarOpen={isLeftSidebarOpen} />}
        rightTopContent={<ImageMinimap />}
        rightBottomContent={<OverallControlPanel />}
        isLeftSidebarOpen={isLeftSidebarOpen}
        toggleSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
      />
    </EventCreateProvider>
  );
};

export default RegisterEventPage;
