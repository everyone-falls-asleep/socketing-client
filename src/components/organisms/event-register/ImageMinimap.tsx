import React from "react";
import { useEventCreate } from "../../../store/EventCreateContext";

const ImageMinimap: React.FC = () => {
  const { imageUrl } = useEventCreate();

  return (
    <div className="bg-gray-100 shadow-md rounded-lg  p-1">
      {imageUrl ? (
        <div className="w-full h-[200px] flex items-center justify-center">
          <img
            className="max-w-full max-h-full object-contain"
            src={imageUrl}
            alt="Uploaded"
          />
        </div>
      ) : (
        <div className="text-gray-500 text-center">
          이미지를 업로드해주세요.
        </div>
      )}
    </div>
  );
};

export default ImageMinimap;
