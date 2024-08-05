export default function KeyWordScroll({
  showFullList,
  setShowFullList,
  slides,
}) {
  return (
    <div className="relative">
      {slides ? (
        slides.map((slideArray, i) => {
          const animationKey =
            slides.length === 4
              ? { 0: "one", 1: "two", 2: "three", 3: "four" }
              : { 0: "one", 1: "two", 2: "three" };
          return (
            <div
              className={`absolute flex w-full justify-between banner-scrolling fade-in-out-v${animationKey[i]}`}
              key={i}
            >
              {slideArray.map((text, i) => (
                <h3 key={i} className="banner-text">
                  {text}
                </h3>
              ))}
            </div>
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );
}
