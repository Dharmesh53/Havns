"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateHall } from "@actions/createActions";
import { uploadPhoto, deletePhoto } from "@actions/uploadActions";
import PhotoUpdater from "./photoUpdater";

const Editor = () => {
  const path = usePathname();
  const hallId = path.substring(17, 41);

  const router = useRouter();

  const [data, setData] = useState([]);
  const [ImageValue, setImageValue] = useState([]);
  const [deleteImage, setDeleteImage] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [result, setResult] = useState({
    success: "",
    error: "",
  });

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

  const photoDeleter = async () => {
    if (deleteImage.length > 0) {
      deleteImage.forEach(async (public_id) => {
        await deletePhoto(public_id);
      });
    } else {
      return;
    }
  };

  const handleSaveClick = async () => {
    if (ImageValue.length + data.length < 5)
      return setResult({ error: "At least 5 photos are required" });

    if (ImageValue.length > 0) {
      const formData = new FormData();
      ImageValue.forEach((image) => formData.append("files", image));
      var res1 = await uploadPhoto(formData, hallId);
    }
    const res2 = await updateHall(data);
    const res3 = await photoDeleter();
    if (res1 == "success" && res2 == "success" && res3 == "success") {
      setResult({
        success: "Successfully updated hall data",
      });
    } else {
      setResult({
        success: "Error occured, Couldn't update hall",
      });
    }
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
      <PhotoUpdater
        id={hallId}
        deleteButton={isEditing}
        ImageValue={ImageValue}
        setImageValue={setImageValue}
        deleteImage={setDeleteImage}
        setDeleteImage={setDeleteImage}
      />
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
      {result.success && (
        <span className="text-green-500">{result.success}</span>
      )}
      {result.error && <span className="text-red-500">{result.error}</span>}
    </div>
  );
};

export default Editor;
