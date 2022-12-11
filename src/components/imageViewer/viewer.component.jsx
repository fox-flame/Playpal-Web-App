import React, { useState, useCallback } from "react";
import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import ImageViewer from "react-simple-image-viewer";

const Viewer = ({ images = [] }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  useEffect(() => {
    if (isViewerOpen) {
      document.getElementsByClassName(
        "styles-module_wrapper__1I_qj"
      )[0].style.zIndex = "9999";
    }
  }, [isViewerOpen]);
  return (
    <div>
      {images.map((src, index) => (
        <img
          src={src}
          onClick={() => openImageViewer(index)}
          width="300"
          key={index}
          style={{ margin: "2px" }}
          alt=""
        />
      ))}

      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
          closeOnClickOutside={true}
        />
      )}
    </div>
  );
};

export default Viewer;
