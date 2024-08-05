import Hero from "../components/Hero";
import About from "../components/About";
import ReadMoreHidden from "../components/ReadMoreHidden";
import { useState, useEffect } from "react";

export default function Index() {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const onPageLoad = () => {
      console.log("page loaded");
      setPageLoaded(true);
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  return (
    <div>
      {!pageLoaded ? (
        <div>
          <h1>LOADING</h1>
        </div>
      ) : (
        <div>
          <Hero />
          <About />
          <ReadMoreHidden />
        </div>
      )}
    </div>
  );
}
