import useApp from "../../context/useApp";
import Carousel from "./Carousel";
import './styles-uStory.css'

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

// <main className="ustories-container">
//       {reversedUStory.map((story) => (
//         <div key={story.id} className="one-uStory-container">
//           <h2 className="one-ustory-title">{story.name}</h2>
//           <div className="one-ustory-body">
//             {story.body.map((photo) => (
//               <img
//                 className="ustory-img"
//                 key={photo.id}
//                 src={photo.urls.small}
//                 alt={photo.alt_description}
//               />
//             ))}
//           </div>
//           <h2 className="one-ustory-title last">{story.name}</h2>
//         </div>
//       ))}
//     </main>
