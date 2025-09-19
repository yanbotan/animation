import cn from "classnames";
import "./App.scss";
import { useState } from "react";

const CARDS = ["one", "two", "three", "four", "five"];
const GAP = 20;
const WIDTH = 250;
const LEFT = 30;
const NUMBER_OF_FRAMES = 20;

function App() {
  const [leftMostCard, setLeftMostCard] = useState(0);
  const [leftValues, setLeftValues] = useState(() =>
    Array.from({ length: CARDS.length * 2 }, (_, idx) =>
      idx === leftMostCard
        ? 0
        : idx === leftMostCard + 1
          ? LEFT
          : idx === leftMostCard + 2
            ? LEFT * 2
            : LEFT * 2 + (GAP + WIDTH) * (idx - leftMostCard - 2),
    ),
  );
  // const [opacityValues, setOpacityValues] = useState(() =>
  //   Array.from({ length: CARDS.length }, (_, idx) =>
  //     idx < leftMostCard
  //       ? 0
  //       : idx === leftMostCard
  //         ? 0.3
  //         : idx === leftMostCard + 1
  //           ? 0.5
  //           : 1,
  //   ),
  // );

  return (
    <>
      <div className="parent">
        {[...CARDS, ...CARDS].map((card, idx) => (
          <div
            className={cn("card", card)}
            style={{
              left: leftValues[idx],
              // opacity: opacityValues[idx],
            }}
          >
            {Array.from({ length: 6 }, (_, idx) => (
              <p style={{ fontWeight: "bold" }} key={idx}>
                {idx}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div className="buttonContainer">
        <button
          onClick={() => {
            const prevLeftMostCard = leftMostCard;
            setLeftMostCard((prev) => Math.min(CARDS.length, prev + 1));
            let count = NUMBER_OF_FRAMES - 1;
            const handler = () => {
              setLeftValues((prev) => {
                return prev.map((_, idx) =>
                  idx === prevLeftMostCard ||
                  idx === prevLeftMostCard + 1 ||
                  idx === prevLeftMostCard + 2
                    ? prev[idx] - LEFT / NUMBER_OF_FRAMES
                    : prev[idx] - (GAP + WIDTH) / NUMBER_OF_FRAMES,
                );
              });
              if (count-- > 0) {
                requestAnimationFrame(handler);
              }
            };
            requestAnimationFrame(handler);
          }}
        >
          left
        </button>
        <button
          onClick={() => {
            const prevLeftMostCard = leftMostCard;
            setLeftMostCard((prev) => Math.max(0, prev - 1));
            let count = NUMBER_OF_FRAMES - 1;
            const handler = () => {
              setLeftValues((prev) => {
                return prev.map((_, idx) =>
                  idx === prevLeftMostCard - 1 ||
                  idx === prevLeftMostCard ||
                  idx === prevLeftMostCard + 1
                    ? prev[idx] + LEFT / NUMBER_OF_FRAMES
                    : prev[idx] + (GAP + WIDTH) / NUMBER_OF_FRAMES,
                );
              });
              if (count-- > 0) {
                requestAnimationFrame(handler);
              }
            };
            requestAnimationFrame(handler);
          }}
        >
          right
        </button>
      </div>
    </>
  );
}

export default App;
