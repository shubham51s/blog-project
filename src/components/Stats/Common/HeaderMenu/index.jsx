import React from "react";
import { Link, useLocation } from "react-router-dom";

function HeaderMenuSection() {
  const { pathname } = useLocation();
  const navOptions = [
    {
      id: 0,
      name: "Stories",
      path: "/me/stats",
    },
    {
      id: 1,
      name: "Audience",
      path: "/me/audience",
    },
  ];

  const isActive = (item) => {
    if (item.id === 0) return pathname.includes("/me/stats");
    if (item.id === 1) return pathname.includes("/me/audience");
  };

  return (
    <div className="relative overflow-hidden boxShadow13">
      <div className="flex items-center overflow-y-hidden overflow-x-auto">
        <div className="w-full flex justify-start">
          {navOptions.map((item) => (
            <div className="flex gap13 margin52" style={{ marginLeft: item.id === 0 ? 0 : "" }} key={item.id}>
              <div className={`min-w-max padding-42 ${isActive(item) ? "bdr-7" : "bdr16"}`} style={{ borderTop: 0, borderInline: 0 }}>
                <Link to={item.path} className="cursor-pointer p-0 m-0">
                  <p className={`color-3 custom-fs-1 line20 font-normal m-0 ${isActive(item) ? "opacity-100" : "opacity-[0.85]"} transition-all duration-75 ease hover:opacity-100`}>
                    <span>{item.name}</span>
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeaderMenuSection;
