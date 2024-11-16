import MainLayout from "../layout/MainLayout";
import EventRegisterForm from "../organisms/Form/EventRegisterForm";
import SeatMaker from "../organisms/event-register/SeatMaker";
import CardSubTitle from "../atoms/titles/cardsubtitle/CardSubTitle";
import { EventCreateProvider } from "../../store/EventCreateContext";

const RegisterEventPage = () => {
  return (
    <>
      <EventCreateProvider>
        <MainLayout>
          <CardSubTitle>공연 등록하기</CardSubTitle>
          <EventRegisterForm />
          <SeatMaker></SeatMaker>
        </MainLayout>
      </EventCreateProvider>
    </>
  );
};

export default RegisterEventPage;
