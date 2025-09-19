import cn from "classnames";
import "./App.scss";

const colors = ["purple", "orangered", "teal", "green", "olive"];

function App() {
  return (
    <>
      <div className="parent">
        {colors.map((color) => (
          <div className={cn("card", color)}></div>
        ))}
      </div>
      <div className="buttonContainer">
        <button>left</button>
        <button>right</button>
      </div>
    </>
  );
}

export default App;
