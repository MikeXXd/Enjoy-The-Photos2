import Carousel from "./Carousel";
import useStories from "./store";
import "./styles-uStory.css";

export default function UStoryMain() {
  const { uStories } = useStories();

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
