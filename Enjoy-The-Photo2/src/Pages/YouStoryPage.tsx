import InformationMessage from "../components/messages/InfoMessage";
import YouStory from "../components/uStory/YouStory";
import useStories from "../components/uStory/store";

const YouStoryPage = () => {
  const { uStories } = useStories();

  return (
    <>
      {!uStories.length && (
        <InformationMessage>Your uStory gallery is empty.</InformationMessage>
      )}
      <YouStory />
    </>
  );
};

export default YouStoryPage;
