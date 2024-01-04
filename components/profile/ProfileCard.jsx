import Image from "next/image";
import { useRef, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { uploadToCloudinary, savePhotoToLocal } from "@actions/uploadActions";
import { updateUser } from "@actions/userActions";

const ProfileCard = ({ user }) => {
  const [ImageValue, setImageValue] = useState(user?.image);
  const [FormImage, setFormImage] = useState([]);
  const ImageRef = useRef(null);

  const [Name, setName] = useState(user?.name);
  const [Email, setEmail] = useState(user?.email);

  const [Edit, setEdit] = useState(false);

  const handleSubmit = async () => {
    const formdata = new FormData();
    formdata.append("files", FormImage);
    const newfile = await savePhotoToLocal(formdata);
    const Link = await uploadToCloudinary(newfile);
    await updateUser(Name, Email, Link[0].secure_url);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file.type.startsWith("image/")) {
      setFormImage(file);
      setImageValue(URL.createObjectURL(file));
    } else {
      console.log("only image are allowed");
    }
  };

  return (
    <div>
      {!Edit ? (
        <button onClick={() => setEdit(true)}>Edit</button>
      ) : (
        <button onClick={() => handleSubmit()}>Save</button>
      )}

      <div className="flex flex-col justify-center items-center">
        {ImageValue ? (
          <Image
            src={ImageValue}
            alt="avatar"
            width={250}
            height={250}
            className="rounded-full border-2 cursor-pointer justify-center"
          />
        ) : (
          <div>
            <span className="text-white bg-[#ef4444] text-xl font-medium w-[2.8rem] h-[2.8rem] flex items-center justify-center rounded-full caret-transparent profile hover:brightness-75 transition-all">
              {user?.email.toUpperCase().toString()[0]}
            </span>
          </div>
        )}
        <span>
          <input
            type="file"
            ref={ImageRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          {Edit && <TbEdit onClick={() => ImageRef.current?.click()} />}
        </span>
      </div>

      <div className="flex justify-center items-center">
        <span>Name : </span>
        <input
          type="text"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          className={`w-60 rounded-lg ${Edit && "border-2"}`}
          disabled={!Edit}
        />
      </div>

      <div className="flex justify-center items-center">
        <span>Email : </span>
        <input
          type="text"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-60 rounded-lg ${Edit && "border-2"}`}
          disabled={!Edit}
        />
      </div>
      <div className="flex flex-col justify-center">
        <div>
          <span>Role : {user?.role}</span>
        </div>
        <div>
          <span>Provider : {user?.provider}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
