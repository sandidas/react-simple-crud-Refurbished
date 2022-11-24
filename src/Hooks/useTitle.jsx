import { useEffect } from "react";

const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} | Best-Refurbished.com`;
    }, [title]);
};
export default useTitle;
