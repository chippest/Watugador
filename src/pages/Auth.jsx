import { Navigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import "./css/auth.css";
import { useState } from "react";
import { auth, db, storage } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from "axios";

export function Auth() {
  const { loggedIn, setLoggedIn } = useApp();

  const [lEmail, setLEmail] = useState("");
  const [lPassword, setLPassword] = useState("");

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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, lEmail, lPassword);
      console.log(auth.currentUser.email);
    } catch (error) {
      console.error(error);
    }
  };

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
      await setDoc(userDocRef, userData);
      console.log("User document created with avatar:", avatarUrl);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return !loggedIn ? (
    <>
      <div className="auth">
        <div className="login">
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name=""
              required
              value={lEmail}
              onChange={(e) => {
                setLEmail(e.target.value);
              }}
            />
            <input
              type="password"
              name=""
              required
              value={lPassword}
              onChange={(e) => {
                setLPassword(e.target.value);
              }}
            />
            <button type="submit">Login</button>
          </form>
          {lPassword}
        </div>
        <div className="divider"></div>
        <div className="signUp">
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
                    border:
                      selectedImage === image ? "3px solid #4CAF50" : "none",
                    borderRadius: "5px",
                  }}
                />
              ))}
              <label htmlFor="img">
                <img
                  width={"100px"}
                  src={
                    !images[2]
                      ? "https://icons-for-free.com/iff/png/512/add+board+new+plus+icon-1320186882821780394.png"
                      : "https://icons.veryicon.com/png/o/education-technology/learning-to-bully-the-king/reset-14.png"
                  }
                  alt=""
                />
                <input
                  type="file"
                  name=""
                  id="img"
                  style={{ display: "none" }}
                  onChange={handleCustomImageUpload}
                />
              </label>
            </div>
            <input
              type="text"
              required
              value={sName}
              onChange={(e) => {
                setSName(e.target.value);
              }}
            />
            <input
              type="text"
              required
              value={sUserName}
              onChange={(e) => {
                setSUserName(e.target.value);
              }}
            />
            <input
              type="email"
              name=""
              required
              value={sEmail}
              onChange={(e) => {
                setSEmail(e.target.value);
              }}
            />
            <input
              type="password"
              name=""
              required
              value={sPassword}
              onChange={(e) => {
                setSPassword(e.target.value);
              }}
            />
            <button type="submit">SignUp</button>
          </form>
        </div>
      </div>
    </>
  ) : (
    <>
      <Navigate to={"/home"} replace={true} />
    </>
  );
}
