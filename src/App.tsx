import "./App.css";
import Router from "./shared/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./store/UserContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
