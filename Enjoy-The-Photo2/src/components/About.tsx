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
      <h1>About</h1>
      <div className="about-text">
        Hello User, <br />
        first of all, enjoy the photos and see the BEAUTY OF GEOMETRY as it is.
        Using the aplication is, I thing, preaty straight forward, you will
        explore most of the features yourself, but just a few points. <br />
        
        <ul>
          <li>you can save your favorite photo into gallery by clicking on the HEART
        and remove it in the same way </li>
        <li>if you unlike and again like photo in gallery and then refresh galery by clicking on 'gallery' button the photo will appear as the first one, unless you changed the order of saving photos in 'setting'</li>
          <li>escape all modals by <kbd>ESC</kbd> button</li>
          <li>the second main concept of this aplication will be uStory, which is currently under develepment. </li>
          <li>explore options in setting to get better experience</li>
        </ul>
        current version: 1.0 <br />
        created by: <a href="https://www.linkedin.com/in/michal-vili%C5%A1-483196251/">Michal Viliš</a> 2023

      </div>
      
    </div>
  );
};

export default About;
