import YouStory from "../components/uStory/YouStory";
import useStories from "../components/uStory/store";

const YouStoryPage = () => {
  const { uStories } = useStories();

  return (
    <>
      {!uStories.length && (
        <div className="information-wrap">
          <h2>Oops...</h2>
          <p>Your uStory gallery is empty</p>
        </div>
      )}{" "}
      <YouStory />
    </>
  );
};

export default YouStoryPage;
