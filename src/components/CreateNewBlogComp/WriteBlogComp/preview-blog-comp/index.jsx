import React, { useContext, useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { UserContext } from "../../../../context/userContext";
import Select from "react-select";
import { toast } from "react-toastify";
import { useApi } from "../../../../hooks/useApi";
import { urlBasePath } from "../../../../constants/constant";

function PreviewBlogComp({ blog, setBlog, pendingImages }) {
  const { fetchRequest } = useApi();
  const { userInfo, isUserLoggedIn } = useContext(UserContext);
  const [isChangePreviewImg, setIsChangePreviewImg] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState([]);
  const [topics, setTopics] = useState([]);
  const [blobUrl, setBlobUrl] = useState([]);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePreviewImgChange = (index) => {
    setImgIndex(index);
    setBlog((prev) => ({ ...prev, previewImg: pendingImages[index].blobUrl }));
  };

  const handlePreviewTitleChange = (e) => {
    const previewTitle = e.target.value;
    setBlog((prev) => ({ ...prev, previewTitle }));
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubtitleChange = (e) => {
    const previewSubtitle = e.target.value;
    setBlog((prev) => ({ ...prev, previewSubtitle }));
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleChange = (selected) => {
    if (selected.length <= 5) setSelectedTopic(selected);
    else toast.info("Select upto 5 topics!");
  };

  const getAllTopics = async () => {
    try {
      const response = await fetchRequest("/topic", "GET");
      if (!response?.status === 200) return;

      const result = await response.json();
      const sortedResult = result?.data?.topics.map((item) => ({ label: item.name.charAt(0).toUpperCase() + item.name.slice(1), value: item._id }));
      setTopics(sortedResult || []);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const publishBlog = async () => {
    setIsLoading(true);
    try {
      const blobUrls = pendingImages.map((item) => {
        return item.blobUrl;
      });

      const images = pendingImages.map((item) => {
        return item.file;
      });

      const formData = new FormData();

      images.map((img) => {
        formData.append("images", img);
      });

      blobUrls.map((url) => {
        formData.append("blobUrls[]", url);
      });

      selectedTopic.map((item) => {
        formData.append("categories", item.value);
      });

      for (const key in blog) {
        formData.append(key, blog[key]);
      }

      const response = await fetch(`${urlBasePath}/blogs`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      setIsLoading(false);

      const result = await response.json();

      console.log("result: ", result);

      if (response.status === 201) {
        console.log("blog created succesfully");
      } else {
        const msg = result.message || "Something went wrong!";
        toast.error(msg);
      }
      console.log("result: ", result);
    } catch (err) {
      setIsLoading(false);
      console.log("publishBlog catch block: ", err);
    }
  };

  const handlePublishBtnClick = async () => {
    if (isLoading) return;

    if (blog.previewTitle.length <= 0 || blog.previewSubtitle.length <= 0) {
      let msg = "";
      if (blog.previewTitle.length <= 0) {
        msg = "Please provide a preview title";
      } else {
        msg = "Please provide a preview subtitle";
      }
      toast.warn(msg);
      return;
    }

    if (selectedTopic.length <= 0) {
      let msg = "Please select at least 1 topic";
      toast.warn(msg);
      return;
    }

    publishBlog();
  };

  const handleClosePreviewBlogBtnClick = () => {
    setBlog((prev) => ({ ...prev, isShowPreview: false }));
  };

  useEffect(() => {
    getAllTopics();
    if (pendingImages.length > 0) setBlog((prev) => ({ ...prev, previewImg: pendingImages[imgIndex]?.blobUrl }));
    const { heading, description } = blog;
    setBlog((prev) => ({ ...prev, previewSubtitle: description.slice(0, 140), previewTitle: heading.slice(0, 100) }));
  }, []);

  return (
    <div className="custom-bg-8 fixed overflow-auto text-center top-0 left-0 bottom-0 right-0 flex z-[900] w-full p-0 m-0 border-0">
      <div className="m-auto overflow-hidden padding54 padding53 width57 relative">
        <div className="color13 margin42" style={{ marginInline: 0, marginTop: 0 }}>
          <div className="flex">
            <button onClick={handleClosePreviewBlogBtnClick} className="absolute top-0 right-0 padding44 text-left align-baseline inline-block color-6 custom-bg-8 font-10 cursor-pointer select-none box-border font-normal transition-all duration-300 ease-in-out opacity-75 hover:opacity-100">
              <div className="width58 aspect-square">
                <IoCloseOutline className="w-full h-full" />
              </div>
            </button>

            <div className="custom-line-h-1 font-10 text-left w-[50%] padding55 grow shrink basis-auto">
              <p className="font14 font-bold line-h-8 color11 margin-10 p-0 transition-all duration-200 ease-in-out opacity-75 hover:opacity-100" style={{ marginTop: 0, marginInline: 0 }}>
                Story Preview
              </p>

              {pendingImages.length > 0 && (
                <div className="bg15 w-full">
                  {!isChangePreviewImg && (
                    <div className="height67 relative">
                      <button onClick={() => setIsChangePreviewImg(true)} className="inline-block height68 absolute positionCenter line-h11 padding-38 bdr12 border-radius-9 whitespace-nowrap font-10 text-center align-bottom cursor-pointer select-none box-border font-normal bg16 color-2">
                        Change preview image
                      </button>
                      <div>{pendingImages.length > 0 && <img src={pendingImages[imgIndex].blobUrl} className="w-full height67" />}</div>
                    </div>
                  )}

                  {isChangePreviewImg && (
                    <div className="bg15 relative">
                      <button onClick={() => setIsChangePreviewImg(false)} className="text-left align-baseline whitespace-nowrap inline-block relative custom-bg-8 cursor-pointer select-none box-border font-normal padding-14 margin48 font-10 color11 transition-all duration-200 ease-in-out opacity-75 hover:opacity-100" style={{ paddingRight: 0, paddingBlock: 0, marginBottom: 0, marginInline: 0 }}>
                        Done
                      </button>
                      <div className="height69 padding-27 padding56 padding57 overflow-scroll">
                        {pendingImages.map((item, index) => (
                          <div className="w-[30%] padding57 padding-27 inline-block" key={index} style={{ paddingTop: 0, paddingLeft: 0 }}>
                            <img onClick={() => handlePreviewImgChange(index)} src={item.blobUrl} className={`w-full transition-all duration-200 ease-in-out ${imgIndex === index ? "bdr13" : "bdr14"}`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {pendingImages.length === 0 && (
                <div className="bg15 w-full">
                  <div className="custom-line-h-1 font-10 height67 flex justify-center items-center text-left">
                    <span className="font-normal font-10 color10 text-center margin50">Include a high-quality image in your story to make it more inviting to readers.</span>
                  </div>
                </div>
              )}

              {!isChangePreviewImg && (
                <div className="w-full margin46" style={{ marginBottom: 0, marginInline: 0 }}>
                  <div className={`padding-27 padding58 margin-10 bdr10 w-full ${blog.previewTitle.length <= 0 ? "bdr15" : "bdr10"}`} style={{ paddingInline: 0, marginTop: 0, borderTop: 0, borderInline: 0 }}>
                    <textarea value={blog.previewTitle} onChange={(e) => handlePreviewTitleChange(e)} maxLength={100} placeholder="Write a preview title" rows={1} className="w-full m-0 p-0 border-0 outline-0 font-bold font-6 line-h-8 color11 outline-none resize-none overflow-hidden" />
                  </div>
                  <div className={`padding-27 padding58 margin-10 w-full ${blog.previewSubtitle.length <= 0 ? "bdr15" : "bdr10"}`} style={{ paddingInline: 0, marginTop: 0, borderTop: 0, borderInline: 0 }}>
                    <textarea value={blog.previewSubtitle} onChange={(e) => handleSubtitleChange(e)} maxLength={140} placeholder="Write a preview subtitle..." rows={1} className="w-full m-0 p-0 border-0 outline-0 font-light font-10 line-h-8 color11 outline-none resize-none overflow-hidden" />
                  </div>
                </div>
              )}

              <p className="font-10 font-normal custom-line-h-1 color10 margin-11 margin47 p-0" style={{ marginInline: 0 }}>
                <b>Note:</b> Changes here will affect how your story appears in public places like Medium’s homepage and in subscribers’ inboxes — not the contents of the story itself.
              </p>
            </div>

            <div className="custom-line-h-1 font-10 text-left w-[50%] padding55 grow shrink basis-auto">
              <p className="font-normal font14 line-h-8 color14 margin-10 text-left" style={{ marginTop: 0, marginInline: 0 }}>
                Publishing to: <span className="font-bold">{userInfo.username}</span>
              </p>

              <div className="w-full margin-17" style={{ marginTop: 0, marginInline: 0 }}>
                <p className="font-normal font-10 custom-line-h-1 color10 margin-10" style={{ marginTop: 0, marginInline: 0 }}>
                  <span className="color1 font-normal font-10 custom-line-h-1">Add or change topics (up to 5) so readers know what your story is about</span>
                </p>
                <div className="bg15">
                  <div className="height70">
                    <div className="font13 font-normal">
                      <Select value={selectedTopic} onChange={handleChange} isMulti name="colors" options={topics} className="basic-multi-select custom-select box-border" classNamePrefix="select" placeholder="Add a topic..." />
                    </div>
                  </div>
                </div>
              </div>

              <div className="margin-17" style={{ marginBottom: 0 }}>
                <a href="#" className="underline">
                  Learn more
                </a>{" "}
                about what happens to your story when you publish.
              </div>

              <div className="margin-14 flex items-center" style={{ marginBottom: 0, marginInline: 0 }}>
                <div className="shrink-0 grow-0 basis-auto">
                  <button onClick={handlePublishBtnClick} className={`flex items-center justify-center bg14 transition-all duration-300 ease-in-out color-7 height68 line-h11 custom-py-2 border-radius-9  font-10 text-center cursor-pointer align-bottom whitespace-nowrap select-none box-border font-normal m-0 hover:opacity-100 ${isLoading ? "opacity-[0.8] pointer-events-none" : " opacity-[0.9] pointer-events-auto"}`}>
                    {isLoading && (
                      <div className="h-full aspect-square flex items-center justify-start">
                        <div className="animate-spin h-[50%] aspect-square border-r-2 border-white rounded-full bg-transparent opacity-100"></div>
                      </div>
                    )}
                    {!isLoading && <span>Publish and send now</span>}
                    {isLoading && <span>Please wait...</span>}
                  </button>
                </div>
                <div className=""></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewBlogComp;
