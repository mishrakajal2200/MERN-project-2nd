// import React, { useState } from "react";
// import axios from "axios";
// const ImageUpload = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   // const [location, setLocation] = useState("");

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   // const handleLocationChange = (event) => {
//   //   setLocation(event.target.value);
//   // };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("image", selectedFile);

//       await axios.post("http://localhost:60001/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       // Handle success, maybe show a success message
//       console.log("Image uploaded successfully!");

//       // Clear the selected file after successful upload
//       setSelectedFile(null);
//     } catch (error) {
//       // Handle error, maybe show an error message
//       console.error("Error uploading image:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Image Upload</h2>
//       <input type="file" onChange={handleFileChange} />
//       {previewImage && (
//         <div>
//           <img
//             src={previewImage}
//             alt="Preview"
//             style={{ maxWidth: "100%", maxHeight: "50%" }}
//           />
//         </div>
//       )}
//       {/* <input
//         type="text"
//         placeholder="Enter your location"
//         value={location}
//         onChange={handleLocationChange}
//       /> */}
//       <button onClick={handleSubmit} disabled={!selectedFile}>
//         Upload
//       </button>
//     </div>
//   );
// };

// export default ImageUpload;
// components/ImageUpload.js
import React, { useState } from "react";

const ImageUpload = ({ onSave }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [location, setLocation] = useState("");

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSave = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await fetch("http://localhost:60001/upload", {
        method: "POST",
        body: formData,
      });
      const imageName = await response.text();
      onSave({ image: imageName, location });
      setSelectedImage(null);
      setLocation("");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleSave}>Save</button>
      {selectedImage && (
        <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
      )}
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </div>
  );
};

export default ImageUpload;
