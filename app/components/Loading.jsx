import { useEffect, useState } from "react";

const Loading = ({ fadeOut, loading }) => {
  const [dots, setDots] = useState(".");
  const maxDots = 3;
  const intervalTime = 500;

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length < maxDots) {
          return prevDots + ".";
        } else {
          return ".";
        }
        return prevDots;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`loading-wrapper ${fadeOut ? "loading-out" : ""} ${
        loading ? "block" : "hidden"
      }`}
    >
      <section>
        <div className="h-full w-full flex items-center justify-center">
          <h1 className="text-white w-44 text-left">Loading{dots}</h1>
        </div>
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="wave wave4"></div>
      </section>
    </div>
  );
};

export default Loading;
