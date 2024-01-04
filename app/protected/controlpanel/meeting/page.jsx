"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const meet = () => {
  const [PermanentData, setPermanentData] = useState([]);
  const [ActiveData, setActiveData] = useState([]);
  const [ActiveTab, setActiveTab] = useState("pending");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/meeting/user", {
          method: "GET",
        });
        const result = await response.json();
        setPermanentData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setActiveData(PermanentData.filter((item) => item.status == ActiveTab));
  }, [ActiveTab, PermanentData]);

  return (
    <div>
      <div className="flex gap-3 mb-10">
        <button onClick={() => setActiveTab("accepted")}>Accepted</button>
        <button onClick={() => setActiveTab("pending")}>Pending</button>
        <button onClick={() => setActiveTab("declined")}>Declined</button>
      </div>
      <div>
        <h2>{ActiveTab} Requests</h2>
        <ul>
          {ActiveData?.map((item, i) => (
            <span key={item._id}>
              <div className="flex flex-col ">
                <span>Status: {item.status}</span>
                <span>Time: {item.meetTime}</span>
                <span>Date: {item.meetDate}</span>
                {ActiveTab === "accepted" && item.meeting && (
                  <Link
                    href={item.meeting.join_url}
                    target="_blank"
                    className="text-blue-500"
                  >
                    Join URL
                  </Link>
                )}
              </div>
            </span>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default meet;
