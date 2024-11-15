import MainLayout from "../layout/MainLayout";
import CardList from "../templates/cardList/CardList";
import MainBanner from "../templates/mainBanner/MainBanner";
import { MOCK_EVENTS } from "../templates/event-overview/EventOverviewTemplate";
import CategorySection from "../templates/category/CategorySection";
import { fetchAllEvents } from "../../api/events/eventsApi";
import { useQuery } from "@tanstack/react-query";
import { EventsResponse } from "../../types/api/event";

const MainPage = () => {
  const useEvents = () => {
    return useQuery<EventsResponse, Error>({
      queryKey: ["events"],
      queryFn: fetchAllEvents,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  };

  const { data, isLoading, isError, error } = useEvents();

  if (isLoading) {
    console.log(data);
    return <p>이벤트를 불러오는 중...</p>;
  }

  if (isError) {
    return <p>오류 발생: {error.message}</p>;
  }

  return (
    <MainLayout>
      <MainBanner events={data?.data ?? MOCK_EVENTS}></MainBanner>
      <CategorySection></CategorySection>
      <CardList events={data?.data ?? MOCK_EVENTS}></CardList>
    </MainLayout>
  );
};

export default MainPage;
