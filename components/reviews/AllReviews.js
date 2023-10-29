import ReviewBox from "./reviewBox";

const Reviews = () => {
  return (
    <div>
      <div className="font-bold text-2xl ">Reviews</div>
      <div className="flex flex-wrap">
        <div className="w-1/2 py-4 pr-4 ">
          <ReviewBox />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
