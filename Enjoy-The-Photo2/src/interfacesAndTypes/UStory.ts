import UStoryPhoto from "./UStoryPhoto";

export default interface UStory {
  id: string;
  name: string;
  body: UStoryPhoto[];
}
