import "./App.css";
import Component from "./Component";

// https://v0.dev/r/s1oOH1CHA5v
function App() {
  return (
    <div>
      <div className="p-6 border bg-slate-300">상단 메뉴</div>
      <div className="flex">
        <div className="w-16 p-6 border">사이드 메뉴</div>
        <Component />
      </div>
    </div>
  );
}

export default App;
