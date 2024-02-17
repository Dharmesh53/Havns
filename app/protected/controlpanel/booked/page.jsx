"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import WriteReview from "@components/rating/write";

const booked = () => {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    const fetcher = async () => {
      try {
        if (session) {
          const response = await fetch(`/api/booking/user/${session.user._id}`);
          const bookingsData = await response.json();
          setBookings(bookingsData);

          const hallsPromises = bookingsData.map((booking) =>
            fetch(`/api/hall/${booking.hall}`),
          );
          const hallsResponses = await Promise.all(hallsPromises);
          const hallsData = await Promise.all(
            hallsResponses.map((response) => response.json()),
          );
          setHalls(hallsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetcher();
  }, [session]);

  return (
    <div>
      <h2>Halls that you booked:</h2>
      <ul>
        {bookings.map((booking, index) => (
          <li key={index}>
            <p>Start Date: {new Date(booking.dates.start).toLocaleString()}</p>
            <p>End Date: {new Date(booking.dates.end).toLocaleString()}</p>
            {halls[index] && (
              <div>
                <p>Hall Name: {halls[index].title}</p>
                <p>Hall Location: {halls[index].description}</p>
              </div>
            )}
            {new Date() > new Date(booking.dates.end) && (
              <button>
                <WriteReview Id={halls[index]?._id} />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default booked;
