import React from "react";
import Skeleton from "react-loading-skeleton";
import BlogLoader from "../../components/LibraryComp/BlogComp/skeleton";

function Loader() {
  return (
    <div className="flex flex-col min-h-screen custom-bg-8 font-normal max-w-full overflow-hidden">
      <div className="flex justify-center">
        <div className="min-w-0 w-full max-width-2 margin-12 my-0">
          <header className="margin54 margin55 flex items-start justify-between">
            <div className="flex">
              <div className="width-15 aspect-square margin-3 overflow-hidden">
                <Skeleton circle className="w-full aspect-square" />
              </div>
              <div>
                <div className="line-h-8 font-10 color-3 font-normal">
                  <div className="margin-19 flex items-center" style={{ marginTop: 0, marginInline: 0 }}>
                    <div className="m-0 p-0 no-underline max-w-[5%] overflow-hidden">
                      <Skeleton height={30} width={3434} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center flex-wrap  max-w-[7%] overflow-hidden">
                  <Skeleton height={20} width={3434} />
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>

      <div>
        <div className="padding67" style={{ paddingTop: 0, paddingInline: 0 }}>
          {Array.from({ length: 2 }).map((_, i) => (
            <BlogLoader key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Loader;
