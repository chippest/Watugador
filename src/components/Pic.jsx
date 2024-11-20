import { useState } from "react";

export function ImageSelectionForm() {
  const [selectedImage, setSelectedImage] = useState(null);

  const defaultImages = [
    "https://i.pinimg.com/236x/68/31/12/68311248ba2f6e0ba94ff6da62eac9f6.jpg", // Male Avatar
    "https://i.pinimg.com/236x/4a/cb/4e/4acb4e3efd6a4eb18f758f8a2285ba8d.jpg", // Female Avatar
  ];

  const handleDefaultImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCustomImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setSelectedImage(previewUrl);
    }
  };

  return (
    <div>
      <div className="imgSelect">
        {defaultImages.map((image, index) => (
          <img
            key={index}
            width="100px"
            src={image}
            alt={`Avatar ${index + 1}`}
            onClick={() => handleDefaultImageClick(image)}
            style={{
              cursor: "pointer",
              border: selectedImage === image ? "3px solid #4CAF50" : "none",
              borderRadius: "5px",
            }}
          />
        ))}

        <label htmlFor="img">
          <img
            width="100px"
            src={
              selectedImage && !defaultImages.includes(selectedImage)
                ? selectedImage
                : ""
            }
            alt="Custom Avatar"
            style={{ cursor: "pointer", borderRadius: "5px" }}
          />
          <input
            type="file"
            id="img"
            style={{ display: "none" }}
            onChange={handleCustomImageUpload}
          />
        </label>
      </div>

      {/* Display the selected image separately */}
      {selectedImage && (
        <div className="selected-image">
          <h3>Selected Image:</h3>
          <img
            width="150px"
            src={selectedImage}
            alt="Selected Avatar"
            style={{ borderRadius: "5px", border: "2px solid #4CAF50" }}
          />
        </div>
      )}
    </div>
  );
}
