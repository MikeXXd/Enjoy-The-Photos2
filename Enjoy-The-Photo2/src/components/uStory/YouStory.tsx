import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import useStories from "./store";
import "./styles-uStory.css";

export default function UStoryMain() {
  const { uStories } = useStories();
  const [closingTrigger, setClosingTrigger] = useState(0)
 

  useEffect(() => {
    const handleEvent = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        //setting closingTrigger is used to close the setting menu in child components
        setClosingTrigger(Math.random());
      }
    };
    document.addEventListener("keydown", handleEvent);

    return () => {
      document.removeEventListener("keydown", handleEvent);
    };
  }, []);

  return (
    <div className="ustories-wrap">
      {uStories.map((story) => (
        <Carousel key={story.id} story={story} closingTrigger={closingTrigger}/>
      ))}
    </div>
  );
}
