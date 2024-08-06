import Hero from "../components/Hero";
import About from "../components/About";
import ReadMoreHidden from "../components/ReadMoreHidden";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

export default function Index() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const startTime = Date.now();

    const onPageLoad = () => {
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
      const minimumLoadTime = 1000;

      const remainingTime = minimumLoadTime - elapsedTime;
      if (remainingTime > 0) {
        setTimeout(() => {
          setPageLoaded(true);
        }, remainingTime);
      } else {
        setPageLoaded(true);
      }
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  useEffect(() => {
    if (pageLoaded && imagesLoaded) {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
        setFadeOut(false);
      }, 1500);
    }
  }, [pageLoaded, imagesLoaded]);

  return (
    <div>
      <Loading fadeOut={fadeOut} loading={loading} />
      <div
        className={`${
          fadeOut ? "main-content loading-in !block w-full mx-auto" : "block"
        } ${!loading ? "block" : "hidden"}
        `}
      >
        <Hero onImageLoad={handleImageLoad} />
        <About />
        <ReadMoreHidden />
      </div>
    </div>
  );
}
