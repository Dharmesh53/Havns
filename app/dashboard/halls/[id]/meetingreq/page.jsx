"use client";
import { useEffect, useState } from "react";

const meetingreq = () => {
  const [Meetings, setMeetings] = useState({});
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("/api/meeting/fetch", {
        method: "GET",
      });
      const result = await res.json();
      setMeetings(result);
    };
    fetcher();
  }, []);

  return (
    <div>
      meetingreq
      <div className="flex gap-4">
        {Meetings && (
          <>
            <span>{Meetings.meetDate}</span>
            <span>{Meetings.meetTime}</span>
            <button>Accept</button>
            <button>Decline</button>
          </>
        )}
      </div>
    </div>
  );
};

export default meetingreq;
