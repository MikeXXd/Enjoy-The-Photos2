import useApp from "../../context/useApp";
import Carousel from "./Carousel";
import "./styles-uStory.css";

export default function UStoryMain() {
  const { uStory } = useApp();

  // Reverse the uStory array if it exists
  const reversedUStory = uStory ? [...uStory].reverse() : [];

  return (
    <div className="ustories-wrap">
      {reversedUStory.map((story) => (
        <Carousel key={story.id} story={story} />
      ))}
    </div>
  );
}
