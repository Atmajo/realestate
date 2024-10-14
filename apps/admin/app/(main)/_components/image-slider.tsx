import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

interface ImageSliderProps {
  images: string[];
  insideImages: string[];
  onDeleteImage: (index: number) => void;
  onDeleteInsideImage: (index: number) => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images: initialImages,
  insideImages: initialInsideImages,
  onDeleteImage,
  onDeleteInsideImage,
}) => {
  const [currentTab, setCurrentTab] = useState<"image" | "inside">("image");
  const [images, setImages] = useState(initialImages);
  const [insideImages, setInsideImages] = useState(initialInsideImages);
  const [imageIndex, setImageIndex] = useState(0);
  const [insideImageIndex, setInsideImageIndex] = useState(0);

  const currentImages = currentTab === "image" ? images : insideImages;
  const currentIndex = currentTab === "image" ? imageIndex : insideImageIndex;
  const setCurrentIndex =
    currentTab === "image" ? setImageIndex : setInsideImageIndex;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? currentImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === currentImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDelete = () => {
    if (currentTab === "image") {
      const newImages = images.filter((_, index) => index !== imageIndex);
      setImages(newImages);
      onDeleteImage(imageIndex);
      if (imageIndex >= newImages.length) {
        setImageIndex(Math.max(0, newImages.length - 1));
      }
    } else {
      const newInsideImages = insideImages.filter(
        (_, index) => index !== insideImageIndex
      );
      setInsideImages(newInsideImages);
      onDeleteInsideImage(insideImageIndex);
      if (insideImageIndex >= newInsideImages.length) {
        setInsideImageIndex(Math.max(0, newInsideImages.length - 1));
      }
    }
  };

  if (images.length === 0 && insideImages.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex mb-4">
        <button
          className={`flex-1 py-2 px-4 ${currentTab === "image" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setCurrentTab("image")}
        >
          Image
        </button>
        <button
          className={`flex-1 py-2 px-4 ${currentTab === "inside" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setCurrentTab("inside")}
        >
          Inside Images
        </button>
      </div>
      <div className="relative w-full h-96">
        {currentImages.length > 0 ? (
          <>
            <div className="absolute top-0 left-0 w-full h-full">
              <img
                src={currentImages[currentIndex]}
                alt={`property-${currentIndex}`}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1 hover:bg-opacity-75 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={goToNext}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1 hover:bg-opacity-75 transition-opacity"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={handleDelete}
              className="absolute top-2 right-2 bg-red-500 bg-opacity-75 rounded-full p-1 hover:bg-opacity-100 transition-opacity"
            >
              <Trash2 className="w-5 h-5 text-white" />
            </button>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {currentImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? "bg-white" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            No images available
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
