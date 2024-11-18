import MainLayout from "../layout/MainLayout";
import CardList from "../templates/cardList/CardList";
import MainBanner from "../templates/mainBanner/MainBanner";
// import CategorySection from "../templates/category/CategorySection";
import { fetchAllEvents } from "../../api/events/eventsApi";
import { EventsResponse } from "../../types/api/event";
import { createResourceQuery } from "../../hooks/useCustomQuery";
import { fetchErrorMessages } from "../../constants/errorMessages";

const MainPage = () => {
  const useEvents = createResourceQuery<EventsResponse>(
    "all-events",
    fetchAllEvents
  );

  const { data, isLoading, isError } = useEvents();

  if (isLoading) return <p>{fetchErrorMessages.isLoading}</p>;
  if (isError) return <p>{fetchErrorMessages.general}</p>;
  if (!data?.data) return <p>{fetchErrorMessages.noEventData}</p>;

  const eventData = data.data;

  return (
    <MainLayout>
      <MainBanner events={eventData}></MainBanner>
      {/* <CategorySection></CategorySection> */}
      <CardList events={eventData}></CardList>
    </MainLayout>
  );
};

export default MainPage;
