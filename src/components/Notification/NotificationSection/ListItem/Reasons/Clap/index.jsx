import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { formatMonthAndDayLong } from "../../../../../../utils/monthDateLongFormatter";
import { UserContext } from "../../../../../../context/userContext";

function Clapped({ item }) {
  const { userInfo } = useContext(UserContext);

  return (
    <button className="cursor-pointer">
      <div className="flex flex-col text-left color16 line22 group">
        <div>
          <div className="inline-flex items-center margin-23" style={{ marginLeft: 0, marginBlock: 0 }}>
            <Link to={`/profile/${item.sender.username}`} className="cursor-pointer inline-flex items-center transition-all duration-75 ease hover:underline">
              {item.sender.name}
            </Link>
          </div>
          {/* <div className="inline-flex items-center margin-23" style={{ marginLeft: 0, marginBlock: 0 }}>
              <div className="cursor-pointer flex items-center">+1 Other</div>
            </div> */}
          <span className="opacity-[0.7] transition-all duration-75 ease group-hover:opacity-100"> clapped to</span>{" "}
          {item.entityType === "blog" && (
            <Link to={`/${item.entity.slug}`} className="color16">
              {item.entity.previewTitle}
            </Link>
          )}
          {item.entityType === "list" && (
            <Link to={`/profile/${userInfo.username}/list/${item.entity.slug}`} className="color16">
              {item.entity.name}
            </Link>
          )}
        </div>
        <span className="opacity-[0.7] transition-all duration-75 ease group-hover:opacity-100">{formatMonthAndDayLong(item.createdAt)}</span>
      </div>
    </button>
  );
}

export default Clapped;
