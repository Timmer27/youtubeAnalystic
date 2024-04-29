import "./App.css";
import Component from "./Component";

// https://v0.dev/r/s1oOH1CHA5v
function App() {
  return (
    <div>
      <div>nav bar</div>

      <div className="flex">
        <div>sidebar</div>
        <Component />
      </div>
    </div>
  );
}

export default App;
