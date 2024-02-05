export default interface Photo {
  id: string;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    thumb: string;
  };
  description: string;
  alt_description: string;
}
