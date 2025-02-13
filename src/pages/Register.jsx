import { useApp } from "../contexts/AppContext";
import "./css/register.css";
import { useState } from "react";
import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Register() {
  const {
    loggedIn,
    setLoggingIn,
    setLoggedIn,
    setCurrentUser,
    setChangingPage,
  } = useApp();

  const [loading, setLoading] = useState(false);
  const [sEmail, setSEmail] = useState("");
  const [sPassword, setSPassword] = useState("");
  const [sUserName, setSUserName] = useState("");
  const [sName, setSName] = useState("");
  const [images, setImages] = useState([
    "https://i.pinimg.com/236x/68/31/12/68311248ba2f6e0ba94ff6da62eac9f6.jpg", // Default Male Avatar
    "https://i.pinimg.com/236x/4a/cb/4e/4acb4e3efd6a4eb18f758f8a2285ba8d.jpg", // Default Female Avatar
  ]);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [customImageFile, setCustomImageFile] = useState(null);
  const [inpImage, setInpImage] = useState(null);

  const navigate = useNavigate();

  function handleNavButtonClick(page) {
    setChangingPage(true);
    setTimeout(() => {
      navigate(page);
    }, 100);
    setTimeout(() => {
      setChangingPage(false);
      setLoggingIn(false);
    }, 200);
  }

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCustomImageFile(index === 2 ? inpImage : null); // Only store file for custom upload
  };

  const handleCustomImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const customImageUrl = URL.createObjectURL(file);

      // Update the third image in the array
      setImages((prevImages) => [prevImages[0], prevImages[1], customImageUrl]);
      setSelectedImage(customImageUrl);
      setCustomImageFile(file);
      setInpImage(file);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoggingIn(true);
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        sEmail,
        sPassword
      );
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      let avatarUrl;

      if (customImageFile) {
        console.log("Uploading file:", customImageFile); // Log the file
        const formData = new FormData();
        formData.append("file", customImageFile); // Append the file
        formData.append("docId", userDocRef.id); // Append the document ID

        const response = await axios.post(
          "https://watugador.linkpc.net/UserAvatar.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Check if the upload was successful
        if (response.data.status === "success") {
          avatarUrl = response.data.downloadLink; // Store the download link
        } else {
          throw new Error("Failed to upload avatar: " + response.data.message);
        }
      } else {
        avatarUrl = selectedImage;
      }

      const userData = {
        uid: user.uid,
        username: sUserName,
        name: sName,
        email: sEmail,
        avatar: avatarUrl,
      };
      setCurrentUser(userData);
      await setDoc(userDocRef, userData);
      handleNavButtonClick("home");
      setLoggedIn(true);
    } catch (error) {
      console.error("Error signing up:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth">
        <form onSubmit={handleSignUp}>
          <div className="imgSelect">
            {images.map((image, index) => (
              <img
                key={index}
                width="100px"
                src={image}
                alt={`Avatar ${index + 1}`}
                onClick={() => handleImageClick(image, index)}
                style={{
                  cursor: "pointer",
                  boxShadow:
                    selectedImage === image
                      ? "0 0 5px black, 0 0 25px #564534, 0 0 50px #564534,0 0 100px #564534"
                      : "none",
                  borderRadius: "5px",
                }}
              />
            ))}
            <label htmlFor="img" className={!images[2] ? "select" : "reselect"}>
              <i
                className={
                  !images[2]
                    ? "fa-duotone fa-solid fa-square-plus"
                    : "fa-duotone fa-solid fa-rotate-left"
                }
              ></i>
              <input
                type="file"
                name=""
                id="img"
                style={{ display: "none" }}
                onChange={handleCustomImageUpload}
              />
            </label>
          </div>
          <div className="form-control">
            <input
              type="text"
              required
              value={sName}
              placeholder="Name"
              onChange={(e) => {
                setSName(e.target.value);
              }}
            />
            <span class="inpBDR"></span>
          </div>
          <div className="form-control">
            <input
              type="text"
              required
              value={sUserName}
              placeholder="Username"
              onChange={(e) => {
                setSUserName(e.target.value);
              }}
            />
            <span class="inpBDR"></span>
          </div>
          <div className="form-control">
            <input
              type="email"
              required
              value={sEmail}
              placeholder="Email"
              onChange={(e) => {
                setSEmail(e.target.value);
              }}
            />
            <span class="inpBDR"></span>
          </div>
          <div className="form-control">
            <input
              type="password"
              required
              value={sPassword}
              placeholder="Password"
              onChange={(e) => {
                setSPassword(e.target.value);
              }}
            />
            <span class="inpBDR"></span>
          </div>
          <button type="submit" className={loading ? "btnDis" : ""}>
            <span>{loading ? "Registering" : "Register"}</span>
          </button>
        </form>
        <div className="design">
          <div class="top">REGISTER</div>
          <div class="bottom" aria-hidden="true">
            REGISTER
          </div>
        </div>
      </div>
    </>
  );
}
