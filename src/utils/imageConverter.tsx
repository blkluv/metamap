import Resizer from "react-image-file-resizer";

const convertImage = async (file: File) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      800,
      600,
      "JPG",
      90,
      0,
      (result) => {
        resolve(result);
      },
      "base64"
    );
  });
};

export default convertImage;
