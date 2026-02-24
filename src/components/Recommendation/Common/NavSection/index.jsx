import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavSection() {
  const navOptions = [
    {
      id: 0,
      name: "Following",
      path: "following",
    },
    {
      id: 1,
      name: "Reading history",
      path: "readinghistory",
    },
    {
      id: 2,
      name: "Muted",
      path: "settings/mute",
    },
    {
      id: 3,
      name: "Suggestions",
      path: "following/suggestions",
    },
  ];

  const { pathname } = useLocation();

  const isTabActive = (id) => {
    if (id === 0) return pathname.includes("following") && !pathname.includes("following/suggestions");
    if (id === 1) return pathname.includes("readingHistory");
    if (id === 2) return pathname.includes("settings/mute");
    if (id === 3) return pathname.includes("following/suggestions");
  };

  return (
    <div className="margin56 margin54">
      <div className="margin-25" style={{ marginTop: 0, marginInline: 0 }}>
        <div>
          <h1 className="letter-spacing-7 height-53 line-h-10 font-12 break-words line-clamp-1 font-semibold color-3 m-0">Refine recommendations</h1>
        </div>
        <div className="margin-37">
          <p className="custom-fs-1 color-4 line20 font-normal m-0">Adjust recommendations by updating what you're following, your reading history, and who you've muted.</p>
        </div>
      </div>
      <div className="relative boxShadow10 overflow-hidden">
        <div className="flex items-center overflow-y-hidden overflow-x-scroll" style={{ scrollbarWidth: "none" }}>
          <div className="w-full flex justify-start">
            {navOptions.map((item) => (
              <div key={item.id} className={`min-w-max margin52 padding-42 ${isTabActive(item.id) ? "bdr-7" : "bdr-5"}`} style={{ borderTop: 0, borderInline: 0, marginLeft: item.id === 0 ? "0" : "" }}>
                <Link to={`/me/${item.path}`} className="p-0 cursor-pointer no-underline">
                  <p className={`color-3 custom-fs-1 line20 font-normal m-0 transition-all duration-75 ease ${isTabActive(item.id) ? "opacity-100" : "opacity-[0.9] hover:opacity-100"}`}>
                    <span>{item.name}</span>
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavSection;
