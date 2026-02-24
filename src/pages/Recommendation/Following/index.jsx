import React from "react";
import RightSection from "../../../components/Recommendation/Common/RightSection";
import NavSection from "../../../components/Recommendation/Common/NavSection";
import UserListItem from "../../../components/Recommendation/MyFollowing/UserListItem";
import PublicationListItem from "../../../components/Recommendation/MyFollowing/PublicationListItem";
import TopicListItem from "../../../components/Recommendation/MyFollowing/TopicListItem";

function MyFollowing() {
  return (
    <div className="flex m-auto justify-evenly width-18">
      <main className="grow shrink basis-auto width-20">
        <div className="flex justify-center">
          <div className="min-w-0 w-full max-width-2 margin-12">
            <div className="padding61">
              <NavSection />

              <div>
                {/* writer */}
                <div>
                  <h2 className="font-10 font-semibold color-3 line20 m-0">21 writers</h2>
                  <div className="margin60 custom-margin-b-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <UserListItem key={index} />
                    ))}
                    <div className="margin60">
                      <p className="custom-fs-1 color-4 line20 font-normal m-0">
                        <button className="cursor-pointer p-0 transition-all duration-75 ease hover:underline">See all (33)</button>
                      </p>
                    </div>
                    <hr className="margin51 bg-11 height86 border-0" />
                  </div>
                </div>

                {/* publication */}
                {false && (
                  <div>
                    <h2 className="font-10 font-semibold color-3 line20 m-0">4 publications</h2>
                    <div className="margin60 custom-margin-b-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <PublicationListItem key={index} />
                      ))}
                      <div className="margin60">
                        <p className="custom-fs-1 color-4 line20 font-normal m-0">
                          <button className="cursor-pointer p-0 transition-all duration-75 ease hover:underline">See all (33)</button>
                        </p>
                      </div>
                      <hr className="margin51 bg-11 height86 border-0" />
                    </div>
                  </div>
                )}

                {/* topics */}
                <div>
                  <h2 className="font-10 font-semibold color-3 line20 m-0">33 topics</h2>
                  <div className="margin60 custom-margin-b-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <TopicListItem key={index} />
                    ))}
                    <div className="margin60">
                      <p className="custom-fs-1 color-4 line20 font-normal m-0">
                        <button className="cursor-pointer p-0 transition-all duration-75 ease hover:underline">See all (9)</button>
                      </p>
                    </div>
                    <hr className="margin51 bg-11 height86 border-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <RightSection />
    </div>
  );
}

export default MyFollowing;
