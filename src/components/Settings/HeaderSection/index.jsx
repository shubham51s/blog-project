import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToTop } from "../../../utils/common";

function HeaderSection() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const menuOptions = [
    {
      id: 0,
      name: "Account",
      path: "",
    },
    {
      id: 1,
      name: "Publishing",
      path: "publishing",
    },
    {
      id: 2,
      name: "Security",
      path: "security",
    },
  ];

  const isTabActive = (id) => {
    if (id === 0) return !pathname.includes("publishing") && !pathname.includes("security");
    if (id === 1) return pathname.includes("publishing");
    if (id === 2) return pathname.includes("security");
    return false;
  };

  const handleNavigation = (path) => {
    navigate(path);
    scrollToTop();
  };

  return (
    <div className="margin56 margin54">
      <div className="margin-25" style={{ marginTop: 0, marginInline: 0 }}>
        <div>
          <h1 className="letter-spacing-7 height-53 line-h-10 font-12 break-all line-clamp-1 font-semibold color-3 m-0">Settings</h1>
        </div>
      </div>

      <div className="boxShadow13 overflow-hidden relative">
        <div className="flex items-center overflow-hidden">
          <div className="w-full flex justify-start">
            {/* map */}
            {menuOptions.map((item) => (
              <div key={item.id} className="flex margin52" style={{ marginLeft: item.id === 0 ? "0" : "" }}>
                <div className={`min-w-max padding-42 ${isTabActive(item.id) ? "bdr-7" : "bdr16"}`} style={{ borderTop: 0, borderInline: 0 }}>
                  <button onClick={() => handleNavigation(item.path)} className="cursor-pointer p-0 m-0">
                    <p className={`color-3 custom-fs-1 line20 font-medium m-0 transition-all duration-75 ease ${isTabActive(item.id) ? "opacity-100" : "opacity-[0.85] hover:opacity-100"}`}>
                      <span>{item.name}</span>
                    </p>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderSection;
