import "./App.css";
import Button from "./components/atoms/buttons/Button";

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button children="클릭"></Button>
    </div>
  );
}

export default App;
