import { BiSearch, BiX } from "react-icons/bi";
import { useSearchContext } from "@context/searchContext";

const search = () => {
  const { query, setQuery } = useSearchContext();
  return (
    <div>
      <input
        type="text"
        className="search_input max-[768px]:w-full"
        placeholder="Search Destinations"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search_btn" onClick={() => setQuery("")}>
        {query === "" ? <BiSearch /> : <BiX />}
      </button>
    </div>
  );
};

export default search;
