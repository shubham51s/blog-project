import React from "react";

function HomeRightSectionComp() {
  const staffPickedPosts = [
    {
      id: 0,
      name: "Elizabeth Villano",
      img: "https://miro.medium.com/v2/resize:fill:40:40/0*P8MtVUVSdQsZYtfM.",
      title: "This Is What Censorship Looks Like in a National Park: The First Park Sign That Came Down",
      date: "Jul 22",
    },
    {
      id: 1,
      name: "Dr. Cheryl Fogle-Hatch",
      img: "https://miro.medium.com/v2/resize:fill:40:40/1*StB59injG6ZBN2B2iksKYg.png",
      title: "Learning About Places Through Touch",
      date: "3d ago",
    },
    {
      id: 2,
      name: "Zach Fernandez",
      img: "https://miro.medium.com/v2/resize:fill:40:40/1*N3GI4jUlY2HugYm1EtWdPg.jpeg",
      title: "Message Undelivered",
      date: "May 28",
    },
    {
      id: 3,
      name: "Zach Fernandez",
      img: "https://miro.medium.com/v2/resize:fill:40:40/1*N3GI4jUlY2HugYm1EtWdPg.jpeg",
      title: "Message Undelivered",
      date: "May 28",
    },
  ];

  const index = 3;
  return (
    <div className="width-22 width-21 height-13 bdr-5 padding-3 custom-bg-8 padding-24" style={{ borderRight: 0, borderBlock: 0, paddingBlock: 0 }}>
      <div className="relative inline-block h-full w-full">
        {/* position sticky & scroll need to check */}
        <div className="sticky top-2 mt-0">
          <div className="height-14 flex flex-col">
            <div className="flex-grow flex-shrink-0 basis-auto">
              <div className="margin-22" style={{ marginBottom: 0, marginInline: 0 }}>
                <div className="margin-17" style={{ marginTop: 0 }}>
                  <a href="#" className="cursor-pointer m-0 p-0 no-underline">
                    <h2 className="font-10 font-medium color-3 custom-line-h-1 m-0 p-0">Staff Picks</h2>
                  </a>
                </div>

                <div className="margin-21" style={{ marginTop: 0, marginInline: 0 }}>
                  {/* staff pick posts */}
                  {staffPickedPosts.splice(0, 3).map((item, index) => (
                    <div key={index} className={index >= 2 ? "p-0" : "padding-14"} style={{ paddingTop: 0, paddingInline: 0 }}>
                      <div className="h-full w-full">
                        <div className="flex items-center margin-7" style={{ marginTop: 0, marginInline: 0 }}>
                          <div className="margin-9" style={{ marginLeft: 0, marginBlock: 0 }}>
                            <a href="#" className="no-underline">
                              <div className="relative">
                                {/* dynamic */}
                                <img src={item.img} alt="profile" className="border-radius-5 height-12 aspect-square align-middle" style={{ borderRadius: "50%" }} />
                                <div className="absolute border-radius-5 height-12 aspect-square top-0"></div>
                              </div>
                            </a>
                          </div>
                          {/* need to check */}
                          <div className="padding-23 flex-nowrap" style={{ paddingLeft: 0, paddingBlock: 0 }}>
                            <a href="#" className="cursor-pointer no-underline p-0 m-0 flex items-center">
                              <p className="break-all text-ellipsis height-6 overflow-hidden color-3 font-4 custom-line-h-1 font-normal m-0 p-0">{item.name}</p>
                            </a>
                          </div>
                        </div>
                        <a href="#" className="cursor-pointer m-0 p-0 no-underline">
                          <div className="margin-7" style={{ marginTop: 0, marginInline: 0 }}>
                            <h2 className="font-bold font-10 color-3 custom-line-h-1 m-0">{item.title}</h2>
                          </div>
                          <div className="flex items-center custom-gap-2">
                            <span className="font-4 color-4 custom-line-h-1 font-normal">{item.date}</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="custom-fs-1 color-4 custom-line-h-1 font-normal m-0 p-0"></p>
              </div>

              {/* middle content */}
              <div className=""></div>
            </div>
            {/* footer */}
            <div className="flex padding-3 flex-wrap" style={{ paddingInline: 0 }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeRightSectionComp;
