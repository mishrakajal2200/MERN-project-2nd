// export default UserProfile;
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserProfile.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/images/img1.jpg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/img3.jpg";
import img4 from "../assets/images/img4.jpg";
import img5 from "../assets/images/img5.webp";

const UserProfile = ({ onSave }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [location, setLocation] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSave = async () => {
    if (!selectedImage || !location) return; // Check if both image and location are present

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("name", selectedImage.name); // Assuming the image file has a name property
    formData.append("location", location);
    try {
      const response = await fetch("http://localhost:60001/upload", {
        method: "POST",
        body: formData,
      });
      const imageName = await response.text();
      // onSave({ image: imageName, location });
      setSelectedImage(null);
      setLocation("");
      navigate("/cards");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // const handleImageChange = (event) => {
  //   const selectedImage = event.target.files[0];
  //   if (selectedImage) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       // setImage(reader.result);
  //     };
  //     reader.readAsDataURL(selectedImage);
  //   }
  // };

  const handleChooseDefaultImage = () => {
    const defaultImagesContainer = document.getElementById(
      "defaultImagesContainer"
    );
    defaultImagesContainer.classList.toggle("hidden");
  };

  const selectDefaultImage = (image) => {
    setSelectedImage(image);
    const defaultImagesContainer = document.getElementById(
      "defaultImagesContainer"
    );
    defaultImagesContainer.classList.add("hidden");
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const formData = new FormData();
  //     formData.append("image", selectedFile);

  //     await axios.post("http://localhost:60001/upload", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     // Handle success, maybe show a success message
  //     console.log("Image uploaded successfully!");

  //     // Clear the selected file after successful upload
  //     setSelectedFile(null);
  //   } catch (error) {
  //     // Handle error, maybe show an error message
  //     console.error("Error uploading image:", error);
  //   }
  // };

  return (
    <div className="container row col-lg-12 col-md-6 col-sm-12">
      <div className="header mt-5">
        <h1>Welcome! Let's create your profile</h1>
        <p>Let others get to know you better! You can do these later</p>
      </div>
      <form className="d-flex mt-5 form-container">
        <div className="row">
          <h5>Add an avatar</h5>
          <div className="avatar-image col-md-6 col-lg-6 col-sm-6">
            {selectedImage &&
              selectedImage.type &&
              selectedImage.type.startsWith("image/") && (
                <div className="avatar-circle">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                  />
                </div>
              )}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 col-sm-6 col-lg-4 offset-md-1 ">
            <input
              type="file"
              onChange={handleImageChange}
              id="image"
              accept="image/*"
              required
              style={{
                backgroundColor: "transparent",
                outline: "none",
                border: "none",
              }}
            />
          </div>
          <br />
          <br />

          {/* <div
            type="button"
            className="default-image offset-md-1"
            onClick={selectDefaultImage}
          >
            ➡️ Or choose one of our defaults
          </div> */}
          <div className="default-image col">
            <div id="defaultImagesContainer" className="hidden">
              {[img1, img2, img3, img4, img5].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${index + 1}`}
                  className="defaultImage"
                  onClick={() => selectDefaultImage(img)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* <div className="mt-5 col-lg-6 col-md-6 col-sm-6">
          <div className="avatar-input">
            <input
              type="file"
              onChange={handleImageChange}
              id="image"
              accept="image/*"
              required
            />
            <button onClick={selectDefaultImage}>
              ➡️ Or choose one of our defaults
            </button>
          </div>
          <br />
          <br />

          <div className="default-image col">
            <div id="defaultImagesContainer" className="hidden">
              {[img1, img2, img3, img4, img5].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${index + 1}`}
                  className="defaultImage"
                  onClick={() => selectDefaultImage(img)}
                />
              ))}
            </div>
          </div>
        </div> */}
      </form>

      <br />
      <br />
      <div className="add-location col-md-7 ">
        <h6 className="mt-3">Add Your Location</h6>
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />
        <br />
        <div className="next-btn col-md-6">
          <button onClick={handleSave}>Next</button>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};
UserProfile.propTypes = {
  onSave: PropTypes.func.isRequired,
};
export default UserProfile;
