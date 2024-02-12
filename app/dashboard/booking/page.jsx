"use client";
import { useEffect, useState } from "react";

const Booking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(`/api/hall/host`);
        const result = await res.json();
        const filteredResult = result.filter((res) => res.booked.length > 0);

        const bookingsData = await Promise.all(
          filteredResult.map(async (hall) => {
            const userPromises = hall.booked.map(async (detail) => {
              const response = await fetch(`/api/hosts/${detail.user}`);
              const userData = await response.json();
              return { user: userData, booking: detail };
            });
            const usersData = await Promise.all(userPromises);
            return { hall, usersData };
          }),
        );

        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetcher();
  }, []);

  return (
    <div>
      <h1>Bookings</h1>
      <div className="flex flex-col gap-10">
        {bookings.map(({ hall, usersData }, idx) => (
          <div key={idx}>
            <div>
              <h3>Booked Users</h3>
              <ul>
                {usersData.map(({ user, booking }) => (
                  <li key={booking.user}>
                    Start: {new Date(booking.dates.start).toLocaleString()}; ,
                    End:{new Date(booking.dates.end).toLocaleString()}, Name:
                    {user.name}, Email: {user.email}
                  </li>
                ))}
              </ul>
            </div>
            <h2>{hall.title}</h2>
            <p>Location: {hall.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booking;
