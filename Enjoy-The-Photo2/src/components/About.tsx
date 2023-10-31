interface AboutProps {
  onClose: (isOpen: boolean) => void;
  handleUStory: () => void;
}

const About = ({ onClose, handleUStory }: AboutProps) => {
  return (
    <div
    className="modal-inside inside-container"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1501761095094-94d36f57edbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTM0MTl8MHwxfHNlYXJjaHwxMXx8d2F0ZXJmYWxsfGVufDB8fHx8MTY5ODI2NTIxOHww&ixlib=rb-4.0.3&q=80&w=1080")',
      }}
    >
      <div>
        <button onClick={() => onClose(false)} className="modal-btn-close">
          X
        </button>
      </div>
      <div className="about-text">
        Hello User, <br />
        first of all, enjoy the photos, an see the BEAUTY OF GEOMETRY as it is.
        Using the aplication is, I thing, preaty straight forward, you will
        explore most of the features yourself, but just a few points. <br /> -
        you can save your favorite photo into galery by clicking on the HEART
        and remove it in the same way <br /> - you can create your uStory, you
        can do so by clicking in the middle of a photo, it will offer you some
        options , which can be seen as a crossroad in your story, choose one and
        let yourself indulge by the geometry further and furt... then just
        explore the story like watching movie, or just like remembering your
        dream...sweet or sour, all within your power.
      </div>
      <div className="about-text">
        <h6>minor hints for comfy usage</h6>
        <ul>
          <li>
            escape all modals by <kbd>ecs</kbd> button
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
