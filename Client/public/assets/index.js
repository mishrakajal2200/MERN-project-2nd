import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserProfile.css";

import img1 from "../assets/images/img1.jpg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/img3.jpg";
import img4 from "../assets/images/img4.jpg";
import img5 from "../assets/images/img5.webp";

const UserProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFolderSelect = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.setAttribute("directory", "true");
    inputElement.setAttribute("webkitdirectory", "true");
    inputElement.setAttribute("mozdirectory", "true");
    inputElement.setAttribute("msdirectory", "true");
    inputElement.setAttribute("odirectory", "true");
    inputElement.click();
  };

  const handleChooseDefaultImage = () => {
    const defaultImagesContainer = document.getElementById(
      "defaultImagesContainer"
    );
    // Toggle the visibility of the default images container
    defaultImagesContainer.classList.toggle("hidden");
  };

  const selectDefaultImage = (image) => {
    setSelectedImage(image);
    const defaultImagesContainer = document.getElementById(
      "defaultImagesContainer"
    );
    defaultImagesContainer.classList.add("hidden");
  };

  const uploadSelectedImage = () => {
    // Upload selectedImage to another id
    console.log("Uploaded image:", selectedImage);
  };

  return (
    <>
      <div className="Container-fluid profile">
        <div className="row">
          <div className="col-sm-6 d-flex">
            <div className="logo mt-5">
              <img
                src="https://turnthewheel.org/wp-content/uploads/2018/06/dribbble-logo.png"
                alt="dribble-img"
                srcSet=""
              />
            </div>
            <div className="main-profile col">
              <h1>Welcome! Let's create your profile</h1>
              <p>Let others get to know you better! You can do these later</p>
              <div className="d-flex">
                <div className="profile-image">
                  <h5>Add an avatar</h5>
                  <div
                    id="selectedProfileImage"
                    className="circle-image"
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      backgroundColor: "#f0f0f0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {selectedImage && (
                      <img
                        src={selectedImage}
                        alt="Selected"
                        style={{
                          borderRadius: "50%",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="desktop-folder">
                  <button onClick={handleFolderSelect} value="Choose Image">
                    Choose Image
                  </button>
                  <br />
                  <br />
                  <div className="choose-defaults-image">
                    <button onClick={handleChooseDefaultImage}>
                      ➡️ Or choose one of our defaults
                    </button>
                    <div id="defaultImagesContainer" className="hidden">
                      {/* Default images will be shown here */}
                      <img
                        src={img1}
                        alt="Image 1"
                        className="defaultImage"
                        onClick={() => selectDefaultImage(img1)}
                      />
                      <img
                        src={img2}
                        alt="Image 2"
                        className="defaultImage"
                        onClick={() => selectDefaultImage(img2)}
                      />
                      <img
                        src={img3}
                        alt="Image 3"
                        className="defaultImage"
                        onClick={() => selectDefaultImage(img3)}
                      />
                      <img
                        src={img4}
                        alt="Image 4"
                        className="defaultImage"
                        onClick={() => selectDefaultImage(img4)}
                      />
                      <img
                        src={img5}
                        alt="Image 5"
                        className="defaultImage"
                        onClick={() => selectDefaultImage(img5)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="add-location">
                <h4>Add Your Location</h4>
                <input type="line" />
              </div>
              <div className="next-btn">
                <button onClick={uploadSelectedImage}>Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
