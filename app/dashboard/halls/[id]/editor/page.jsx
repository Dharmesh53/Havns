"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateHall } from "@actions/createActions";
import PhotoUpdater from "./photoUpdater";

const Editor = () => {
  const path = usePathname();
  const router = useRouter();
  const hallId = path.substring(17, 41);
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/hall/${hallId}`, {
        method: "GET",
      });
      if (res.status === 404) {
        router.push(`/errors?error=${"Sneaky bastard"}`);
      } else {
        const result = await res.json();
        setData(result);
      }
    };
    fetcher();
  }, [hallId]);

  const handleSaveClick = async () => {
    await updateHall(data);
    setIsEditing(false);
  };

  const handleInputChange = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <div className="flex flex-col justify-center">
      <PhotoUpdater id={hallId} deleteButton={isEditing} />
      {Object.entries(data).map(
        ([key, value]) =>
          key !== "_id" &&
          key !== "host" &&
          key !== "__v" &&
          key !== "done" && (
            <div key={key} className="flex justify-evenly">
              <label>{key}</label>
              <input
                type={
                  key == "title" || key == "description" || key == "location"
                    ? "text"
                    : "number"
                }
                value={value}
                onChange={(e) => handleInputChange(key, e.target.value)}
                disabled={!isEditing}
              />
            </div>
          )
      )}
      {isEditing ? (
        <button onClick={handleSaveClick}>Save</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}
    </div>
  );
};

export default Editor;
