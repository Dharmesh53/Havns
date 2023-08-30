import Image from "next/image";
const ProfileCard = ({ user }) => {
  return (
    <div>
      {user?.name}
      <Image src={user?.image} alt="avatar" width={50} height={50} />
      <p>Email:{user?.email}</p>
      <p>Role:{user?.role}</p>
      <p>Provider:{user?.provider}</p>
    </div>
  );
};

export default ProfileCard;
