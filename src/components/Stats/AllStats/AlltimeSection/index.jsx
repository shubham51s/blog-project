import React, { useState } from "react";
import ActionBtn from "./ActionBtn";
import ListItem from "./ListItem";
import ListItemLoader from "./ListItem/skeleton";
import Skeleton from "react-loading-skeleton";

function AllTimeSection() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex justify-center">
      <div className="w-full min-w-0 custom-max-w-1">
        <div className="margin-27 flex items-start justify-between" style={{ marginTop: 0, marginInline: 0 }}>
          <div className="grow-0 shrink-0 basis-auto margin-18" style={{ marginLeft: 0 }}>
            <h2 className="letter-spacing-6 line-h-9 font-11 font-semibold color-3 m-0">Lifetime</h2>
            <div className="margin68" style={{ marginBottom: 0 }}>
              <div className="font-4 color-4 line20 font-normal">
                {isLoading && (
                  <div className="flex flex-wrap relative">
                    April 1, 2026 - Today (UTC)
                    <div className="margin73">
                      <span className="color-4 font-4">•</span>
                    </div>{" "}
                    Updated daily
                    <div className="absolute inset-0 overflow-hidden">
                      <Skeleton width={3434} height={23434} />
                    </div>
                  </div>
                )}
                {!isLoading && (
                  <div className="flex flex-wrap">
                    April 1, 2026 - Today (UTC)
                    <div className="margin73">
                      <span className="color-4 font-4">•</span>
                    </div>{" "}
                    Updated daily
                  </div>
                )}
              </div>
            </div>
          </div>
          <ActionBtn isLoading={isLoading} />
        </div>

        <div>
          <table className="w-full table-fixed h-fit border-collapse" style={{ border: "0" }}>
            <thead className="sticky custom-bg-8 height-3 top-2 text-left display-[table-header-group] bdr-5" style={{ borderTop: 0, borderInline: 0 }}>
              <tr>
                <th className="w-full min-w-full padding-42 color-4 custom-fs-1 line20 font-normal">
                  <span>Story</span>
                </th>
                {/* <th className="width100 padding-42 padding-24 text-center color-4 custom-fs-1 line20 font-normal"></th> */}
                <th className="width101 padding-42 padding-24 text-center color-4 custom-fs-1 line20 font-normal">
                  <span>Views</span>
                </th>
                <th className="width101 padding-42 padding-24 text-center color-4 custom-fs-1 line20 font-normal">
                  <span>Reads</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {!isLoading && <ListItem />}
              {isLoading && Array.from({ length: 3 }).map((_, i) => <ListItemLoader key={i} />)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllTimeSection;
