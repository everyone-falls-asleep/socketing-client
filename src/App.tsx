import "./App.css";
import Router from "./shared/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./store/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router />
        <ToastContainer position="top-center" autoClose={3000} />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
