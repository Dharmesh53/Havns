import { BiSearch } from "react-icons/bi";
import { useSearchContext } from "@context/searchContext";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const search = () => {
  const router = useRouter();
  const q = useSearchParams().get("q");
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
      <button
        className="search_btn"
        onClick={() => router.push(`/?q=${query}`)}
      >
        <BiSearch />
      </button>
    </div>
  );
};

export default search;
