import Carousel from "./Carousel";
import useStories from "./store";
import "./styles-uStory.css";

export default function UStoryMain() {
  const { uStories } = useStories();

  //----ECS btn for closing opened setting in all uStory carousels------
  // useEffect(() => {
  //   if (!isUStoryRendered) return;

  //   const handleEvent = (e: KeyboardEvent) => {
  //     if (e.key === "Escape") {
  //       setIsAllUStorySettingClosed(true);
  //     }
  //   };

  //   document.addEventListener("keydown", handleEvent);

  //   return () => {
  //     document.removeEventListener("keydown", handleEvent);
  //   };
  // }, [isUStoryRendered]);

  // function unblockAllUStorySettings() {
  //   setIsAllUStorySettingClosed(false);
  // }



  // Reverse the uStory array if it exists
  const reversedUStory = uStories ? [...uStories].reverse() : [];

  return (
    <div className="ustories-wrap">
      {reversedUStory.map((story) => (
        <Carousel key={story.id} story={story} />
      ))}
    </div>
  );
}
