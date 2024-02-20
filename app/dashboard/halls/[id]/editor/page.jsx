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
      return { msg: "success" };
    } else {
      return { msg: null };
    }
  };

  const handleSaveClick = async () => {
    if (ImageValue.length + data.length < 5)
      return setResult({ error: "At least 5 photos are required" });

    let res1 = { msg: null };
    let res2 = { msg: null };
    let res3 = { msg: null };

    try {
      if (ImageValue.length > 0) {
        const formData = new FormData();
        ImageValue.forEach((image) => formData.append("files", image));
        res1 = await uploadPhoto(formData, hallId);
      }

      res2 = await updateHall(data);
      res3 = await photoDeleter();

      if (
        res1.msg === "success" &&
        res2.msg === "success" &&
        res3.msg === "success"
      ) {
        setResult({
          success: "Successfully updated hall data",
        });
      } else if (!res1.null && res2.msg === "success" && !res3.msg) {
        setResult({
          success: "Nothing to update",
        });
      } else {
        setResult({
          error: "Error occurred, couldn't update hall",
        });
      }
    } catch (error) {
      setResult({
        error: error.message || "An unexpected error occurred",
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
    <div className="flex flex-col justify-center gap-4 ">
      <PhotoUpdater
        id={hallId}
        deleteButton={isEditing}
        ImageValue={ImageValue}
        setImageValue={setImageValue}
        deleteImage={setDeleteImage}
        setDeleteImage={setDeleteImage}
      />
      <div className="flex items-center justify-center mt-5">
        <div className="flex flex-col w-2/3 gap-3">
          {Object.entries(data).map(
            ([key, value]) =>
              key !== "_id" &&
              key !== "host" &&
              key !== "__v" &&
              key !== "booked" &&
              key !== "done" && (
                <div key={key} className="flex ">
                  <div className="w-1/2 font-medium">
                    {key === "veg"
                      ? "Vegetarian Price (in Rupees)"
                      : key === "nonveg"
                        ? "Non-Vegetarian Price (in Rupees)"
                        : key === "room"
                          ? "Private Room Price (in Rupees)"
                          : key === "decor"
                            ? "Decoration Price (in Rupees)"
                            : key === "maxcapacity"
                              ? "Max Capacity"
                              : key
                                .slice(0, 1)
                                .toUpperCase()
                                .concat(key.slice(1))}
                  </div>
                  {key === "description" ? (
                    <textarea
                      value={value}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      disabled={!isEditing}
                      rows={10}
                      className={`w-1/2 bg-gray-50 p-2 resize-none ${isEditing && "border rounded-md border-gray-500"}`}
                    />
                  ) : (
                    <input
                      type={
                        key === "title" || key === "location"
                          ? "text"
                          : "number"
                      }
                      value={value}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      disabled={!isEditing}
                      size={50}
                      className={`w-1/2 bg-gray-50 p-2 ${isEditing && "border rounded-md border-gray-500"}`}
                    />
                  )}
                </div>
              ),
          )}{" "}
        </div>
      </div>
      {isEditing ? (
        <button
          className="bg-red-500 text-white font-semibold rounded-md p-3 mt-8"
          onClick={handleSaveClick}
        >
          Save
        </button>
      ) : (
        <button
          className="bg-black text-white font-semibold rounded-md p-3 mt-8"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
      )}
      {result.success && (
        <span className="text-green-500">{result.success}</span>
      )}
      {result.error && <span className="text-red-500">{result.error}</span>}
    </div>
  );
};

export default Editor;
