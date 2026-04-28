import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { useRequestHandler } from "../../../../hooks/requestHandler";

function Notification() {
  const { pathname } = useLocation();
  const { requestHandler } = useRequestHandler();
  const [count, setCount] = useState(0);

  const getUnreadNotificationCount = async () => {
    try {
      const response = await requestHandler("/notification/unread-count");
      const result = await response.json();

      if (response?.status === 200 && result?.data?.count) {
        setCount(result.data.count);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUnreadNotificationCount();
  }, []);

  return (
    <div className="margin-14 flex" style={{ marginLeft: 0, marginBlock: 0 }}>
      <Link to="/me/notifications" onClick={() => setCount(0)} className="border-0 cursor-pointer p-0 m-0 group">
        <div className="relative custom-fs-1 color-6 custom-line-h-1 flex items-center font-normal">
          <div className="width-10 height-5 align-middle color-6 opacity-[0.75] transition-all duration-75 ease-in-out hover:opacity-100">
            <IoNotificationsOutline className="w-full h-full" />
          </div>

          {count > 0 && !pathname.includes("/me/notifications") && (
            <span className="absolute top9 rightCustom-1 br14 width93 height88 font-8 line-h-7 padding-23 inline-block font-normal text-white bg-[#1a8917] text-center bdr21 border-white" style={{ paddingBlock: 0 }}>
              {count}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}

export default Notification;
