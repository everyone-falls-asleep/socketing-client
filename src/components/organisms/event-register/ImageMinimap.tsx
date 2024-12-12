import React from "react";
import { useEventCreate } from "../../../store/EventCreateContext";

const ImageMinimap: React.FC = () => {
  const { imageUrl } = useEventCreate();

  return (
    <div className="bg-gray-100 shadow p-1">
      {imageUrl ? (
        <div className="w-full flex items-center justify-center">
          <img
            className="max-w-full object-contain"
            src={imageUrl}
            alt="Uploaded"
          />
        </div>
      ) : (
        <div className="text-gray-500 h-[220px] flex items-center justify-center">
          <p>이미지를 업로드해주세요.</p>
        </div>
      )}
    </div>
  );
};

export default ImageMinimap;
