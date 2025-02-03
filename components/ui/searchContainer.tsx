"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
  const searchParams = useSearchParams();

  const { replace } = useRouter();

  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() || ""
  );

  const handleChange = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    replace(`/?${params.toString()}`);
  });

  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearch("");
    }
  }, [searchParams.get("search")]);
  return (
    <div className="py-4  bg-black ">
      <div className="group relative px-2">
        <label
          htmlFor="searchbox"
          className="absolute top-0 left-0 h-full flex items-center justify-center px-10 "
        >
          <BsSearch className="w-6 h-6 text-gray-500   group-focus-within:text-twitter" />
        </label>

        <input
          id="searchbox"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleChange(e.target.value);
          }}
          className="bg-neutral-900 text-lg w-full h-full px-20  py-4 outline-none  group-focus-within:border-twitter group-focus-within:border rounded-3xl"
        />
      </div>
    </div>
  );
};

export default SearchBar;

//  <input
// type="text"
// placeholder="find a property..."
// className="max-w-xs dark:bg-muted"
// onChange={(e) => {
//   setSearch(e.target.value);
//   handleChange(e.target.value);
// }}
// value={search}
// />
//           <BsSearch className="w-6 h-6 text-gray-500   group-focus-within:text-twitter" />
//         </label>

//         <input
//           id="searchbox"
//           type="text"
//           placeholder="Search"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="bg-neutral-900 text-lg w-full h-full px-20  py-4 outline-none  group-focus-within:border-twitter group-focus-within:border rounded-3xl"
//         />
//       </div>
//     </div>
//   );
// };
