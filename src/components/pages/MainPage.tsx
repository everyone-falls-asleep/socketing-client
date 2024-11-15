import MainLayout from "../layout/MainLayout";
import CardList from "../templates/cardList/CardList";
import MainBanner from "../templates/mainBanner/MainBanner";
import { MOCK_EVENTS } from "../templates/event-overview/EventOverviewTemplate";
import CategorySection from "../templates/category/CategorySection";

function MainPage() {
  return (
    <MainLayout>
      <MainBanner events={MOCK_EVENTS}></MainBanner>
      <CategorySection></CategorySection>
      <CardList events={MOCK_EVENTS}></CardList>
    </MainLayout>
  );
}

export default MainPage;
