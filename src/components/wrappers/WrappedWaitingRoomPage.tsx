import WaitingRoomPage from "../pages/WatingRoomPage";
import { QueueProvider } from "../../store/QueueContext";

export const WrappedWaitingRoomPage = () => (
  <QueueProvider>
    <WaitingRoomPage />
  </QueueProvider>
);
