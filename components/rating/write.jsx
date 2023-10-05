import { useState } from "react";
import Stars from "./stars";
import { useRouter } from "next/navigation";

const write = ({Id}) => {
  const router = useRouter();
  const [Rating, setRating] = useState(0);
  const [FeedBack, setFeedBack] = useState("");
  const [Result, setResult] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Rating === 0) return;
    const data = {Id, Rating, FeedBack };
    try {
      const res = await fetch("/api/review/new", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (res.status === 404) {
        router.push("/signin");
      }
      if (res.status === 200) {
        setResult("Done!!");
        setInterval(() => {
          setResult("");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
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
            value={FeedBack}
            onChange={(event) => setFeedBack(event.target.value)}
            className="p-3 outline rounded-xl"
            required
          />
          {Result == "" ? (
            <button
              type="submit"
              className="absolute left-0 bottom-0 m-3 cursor-pointer"
            >
              Submit
            </button>
            ) : (
            <div className="absolute left-0 bottom-0 m-3">{Result}</div>
          )}
        </div>
      </form>
    </div>
  );
};

export default write;
