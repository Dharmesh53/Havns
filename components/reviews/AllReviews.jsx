import { useEffect, useState } from "react";
import ReviewBox from "./reviewBox";

const Reviews = ({ Id }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`api/review/${Id}`);
      const result = await res.json();
      setData(result);
    };
    fetcher();
  }, [Id]);
  return (
    <div>
      <div className="font-bold text-2xl ">Reviews</div>
      <div className="flex flex-wrap">
        <div className="w-1/2 py-4 pr-4 ">
          {data.map((review) => {
            return (
              <ReviewBox
                name={review.name}
                stars={review.stars}
                image={review?.image ? review.image : false}
                feedback={review.feedback}
                date={review.createdAt}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
