import useApp from "../context/useApp";
import setBackgroundImage from "../services/extFunctions";
import useAppSetting from "./setting/store";

const About = () => {
  const { setIsAboutRendered } = useApp();
 const {isDynamicBackground} = useAppSetting();

  {isDynamicBackground && setBackgroundImage(
    "https://images.unsplash.com/photo-1630334979993-dc4bf603b121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTM0MTl8MHwxfHNlYXJjaHwyfHwlMjBzZWElMjBwYXRlcm5zfGVufDB8fHx8MTcwNDc1MDgxMHww&ixlib=rb-4.0.3&q=80&w=1080"
  )}

  return (
    <div className="wrap-about-and-setting">
      <div>
        <button onClick={() => setIsAboutRendered(false)} className="close-btn">
          X
        </button>
      </div>
      <div
        className="about-and-setting"
      >
        <h1>About</h1>

        <div className="about-text">
          <h2>
            Enjoy the Photos2 has been created as a desktop-first application;
            nevertheless, all functionalities also work on smartphones.
          </h2>
          <h3>
            uStory is the main feature that enables the creation of your own
            stories.
          </h3>
          <h4>uStory creation</h4>
          <ol>
            <li>
              To start creating uStory, click the orange flower icon in the
              middle of a photo you like. Choose one of the available options;
              the photo will be added to uStory, and the chosen word(s) will be
              used for a new search.
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
          </ol>
          <h4>Usefull tips</h4>
          <ul>
            <li>
              Created uStory can be modified. To do so, click on the title of
              uStory.
            </li>
            <li>
              You can save your favorite photo to the gallery by clicking on the
              HEART icon and remove it in the same way.
            </li>
            <li>Move through uStory using the LEFT and RIGHT ARROW keys.</li>
            <li>Close all open uStory settings by the ECS key.</li>
          </ul>
          <footer >Current version: 2.1 <br />
          Created by:{" "}
          <a href="https://www.linkedin.com/in/michal-vili%C5%A1-483196251/">
            Michal Viliš
          </a>{" "}
          2024{" "}</footer>
        </div>
      </div>
    </div>
  );
};

export default About;
