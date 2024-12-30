import React, { useState } from "react";
import API from "../utils/api";

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState({ name: "", email: "", bio: "" });

  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/profile");
      setProfileInfo(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const { data } = await API.put("/profile", profileInfo);
      console.log("Profile updated:", data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <input
        type="text"
        value={profileInfo.name}
        onChange={(e) => setProfileInfo({ ...profileInfo, name: e.target.value })}
        placeholder="Name"
      />
      <textarea
        value={profileInfo.bio}
        onChange={(e) => setProfileInfo({ ...profileInfo, bio: e.target.value })}
        placeholder="Bio"
      />
      <button onClick={handleUpdate}>Update Profile</button>
    </div>
  );
};

export default Profile;
