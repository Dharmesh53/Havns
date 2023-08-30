"use client";
import ProfileCard from "./ProfileCard";
const account = ({user}) => {
  return <div>
    profile Server Page
    <ProfileCard user={user}/>
  </div>;
};

export default account;
