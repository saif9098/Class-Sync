import { useState, useContext, createContext } from "react";

const SearchContext = createContext();
const NavProvider = ({ children }) => {
  const [key, setKey] = useState({
    jobtype: "",
    profession:""
  });

  return (
    <SearchContext.Provider value={[key, setKey]}>
      {children}
    </SearchContext.Provider>
  );
};

// custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, NavProvider };