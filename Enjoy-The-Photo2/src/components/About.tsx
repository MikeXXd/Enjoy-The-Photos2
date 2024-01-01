interface AboutProps {
  onClose: (isOpen: boolean) => void;
}

const About = ({ onClose }: AboutProps) => {

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
      <div className="modal-text-container">
        Hello User, <br />
        First of all, enjoy the photos and appreciate the BEAUTY OF GEOMETRY as
        it is. Using the application is, I believe, pretty straightforward. You
        will explore most of the features yourself, but here are just a few
        points. <br />
        <ul>
          <li>
            The most amazing feature of this app is uStory.
            <ul>
              <li>
                To start creating uStory, click the orange flower icon in the
                middle of a photo you like. Choose one of the available options;
                the photo will be added to uStory, and the chosen word(s) will
                be used for a new search.
              </li>
              <li>Continue in this manner to add another photo and so on...</li>
              <li>
                Alternatively, you can add a photo to uStory by clicking on the
                "ONLY ADD" option without initiating another search.
              </li>
              <li>You can also continue uStoring using the search bar.</li>
              <li>
                To end uStory, click on the rotating flower at the top of the
                webpage or open the Gallery or uStories.
              </li>
              <li>The uStory is now available in uStories.</li>
            </ul>
          </li>
          <li>
            Created uStory can be modified. To do so, click on the title of
            uStory.
          </li>
          <li>
            You can save your favorite photo to the gallery by clicking on the
            HEART icon and remove it in the same way.
          </li>
          <li>Escape all modals by pressing the ESC key.</li>
          <li>Move through uStory using the LEFT and RIGHT ARROW keys.</li>
          <li>Close all open uStory settings by pressing the ECS key.</li>
        </ul>
        Current version: 2.0 <br />
        Created by:{" "}
        <a href="https://www.linkedin.com/in/michal-vili%C5%A1-483196251/">
          Michal Viliš
        </a>{" "}
        2024
      </div>
    </div>
  );
};

export default About;
