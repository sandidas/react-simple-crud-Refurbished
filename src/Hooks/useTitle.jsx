import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | DevsKing.com`;
  }, [title]);
};
export default useTitle;
