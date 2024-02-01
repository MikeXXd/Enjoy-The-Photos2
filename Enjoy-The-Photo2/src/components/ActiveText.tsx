import { useNavigate } from "react-router-dom";
import usePhotos from "../context/usePhotos";
import { cc } from "../utils/cc";
import { useEffect, useState } from "react";

interface Props {
  children: string;
}

const ActiveText = ({ children }: Props) => {
    
  const words = children.split(" ");

  if (!words.length) return null;

  return (
    <>
      {words.map((word, index) => (
        <ActiveWord key={index} word={word} />
      ))}{" "}
    </>
  );
};

export default ActiveText;





interface ActiveWordProps {
    word: string
}

const ActiveWord = ({word}: ActiveWordProps) => {
    const navigate = useNavigate()
    const [isGlittering, setIsGlittering] = useState(false)
    const {setNewQuery } = usePhotos();

    useEffect(() => {

        const interval = setTimeout(() => {
            setIsGlittering(true);
        }, Math.floor(Math.random() * 9000) + 1000);

        setIsGlittering(false);

        return () => clearTimeout(interval);
    }, []);

    const handleClick = (word: string) => {
        setNewQuery(word);
        navigate("/");
      };

  return (
    <span
          onClick={() => handleClick(word)}
          className={cc("active-text", isGlittering && "glittering")}
        >
          {word}{" "}
        </span>
  )
}

