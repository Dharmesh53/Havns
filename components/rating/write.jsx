import { useState } from "react";
import Stars from "./stars";

const write = () => {
  const [Rating, setRating] = useState(0);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.loog(Rating)
  };
  const handleRating = (Rating) => {
    setRating(Rating);
  };
  return (
    <div>
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <div>
          <h2>How's the experience</h2>
          <Stars onRatingChange={handleRating} />
        </div>
        <div className="relative">
          <textarea
            placeholder="Give your FeedBack"
            rows={10}
            cols={50}
            className="p-3 outline rounded-xl"
            required
          />
          <button
            type="submit"
            className="absolute right-0 bottom-0 m-3 cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default write;
