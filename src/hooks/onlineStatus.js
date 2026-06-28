import { useEffect, useRef, useState } from "react";

export default function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const timer = useRef(null);

  useEffect(() => {
    const handleOnline = () => {
      clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        setIsOnline(true);
      }, 700);
    };

    const handleOffline = () => {
      clearTimeout(timer.current);
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      clearTimeout(timer.current);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}
