"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
//import tokenCheck from "@utils/tokenCheck";

const meetingreq = () => {
  const [ButtonCond, setButtonCond] = useState(false);
  const [Meetings, setMeetings] = useState([]);
  const path = usePathname();
  const hallId = path.substring(17, 41);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/meeting/${hallId}`, {
        method: "GET",
      });
      if (res.status == 200) {
        const result = await res.json();
        setMeetings(result);
        setButtonCond(true);
      }
    };
    fetcher();
  }, [hallId]);

  const respond = async (decision, meet) => {
    try {
      // const token = await tokenCheck();
      // console.log(token);
      if (decision == "accepted") {
        const res1 = await fetch(`/api/zoom/token`, {
          method: "GET",
        });
        const token = await res1.json();
        const res2 = await fetch(`/api/zoom/meeting`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic: "Virtual Meeting",
            type: 2,
            start_time: "2023-01-01T12:00:00Z",
            duration: 60,
            timezone: "IST",
            id: meet._id,
            access_token: token,
          }),
        });
      }
      // await fetch("/api/meeting/updateStatus", {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ answer: decision, id: meet._id }),
      // });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Meeting Requests
      <div className="flex gap-4">
        {Meetings.map((meet, i) => (
          <div key={i}>
            <div className="flex gap-5">
              <span>{meet.meetDate}</span>
              <span>{meet.meetTime}</span> {"||"}
            </div>
            {meet.status === "pending" ? (
              <div className="flex gap-5">
                <button
                  onClick={() => respond("accepted", meet)}
                  // disabled={ButtonCond}
                >
                  Accept
                </button>
                <button
                  onClick={() => respond("declined", meet)}
                  // disabled={ButtonCond}
                >
                  Decline
                </button>
              </div>
            ) : (
              <span>Response send</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default meetingreq;
