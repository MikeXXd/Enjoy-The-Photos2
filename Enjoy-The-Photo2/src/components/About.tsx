interface AboutProps {
  onClose: (isOpen: boolean) => void;
  handleUStory: () => void;
}

const About = ({ onClose, handleUStory }: AboutProps) => {
  return (
    <div
      className="about-container"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1501761095094-94d36f57edbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTM0MTl8MHwxfHNlYXJjaHwxMXx8d2F0ZXJmYWxsfGVufDB8fHx8MTY5ODI2NTIxOHww&ixlib=rb-4.0.3&q=80&w=1080")',
      }}
    >
      <div>
        <button onClick={() => onClose(false)} className="modal-btn-close" >
          X
        </button>
      </div>
      <h4 className="about-text">
        WE ARE creators, MIGHTY CREATORS, mostly unaware of our power and having no
        clear instruction how to use it. Using only a fraction of it is
        more then enought to harm ourselves and other beings. WE ARE more then
        just what we thing we are and more we know who we are the BETTER LIFE
        enjoy the photos and KNOW THYSELF. You Create the{" "}
        <a role="button" onClick={handleUStory}>
          <em>u</em>Story
        </a>
      </h4>
    </div>
  );
};

export default About;
