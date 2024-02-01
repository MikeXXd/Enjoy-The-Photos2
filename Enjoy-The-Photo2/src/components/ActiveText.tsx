import usePhotos from "../context/usePhotos";

interface Props {
  children: string;
}

const ActiveText = ({ children }: Props) => {
  const {setNewQuery } = usePhotos();
  const words = children.split(" ");

  const handleClick = (word: string) => {
    setNewQuery(word);
  };

  if (!words.length) return null;

  return (
    <>
      {words.map((word, index) => (
        <span
          key={index}
          onClick={() => handleClick(word)}
          className="active-text"
        >
          {word}{" "}
        </span>
      ))}{" "}
    </>
  );
};

export default ActiveText;
