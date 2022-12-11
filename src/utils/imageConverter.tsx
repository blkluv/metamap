import Resizer from "react-image-file-resizer";

const convertImage = async (file: File, width: number, height: number) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      width,
      height,
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
