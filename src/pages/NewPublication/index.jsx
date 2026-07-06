import React, { useEffect, useState } from "react";
import Header from "../../components/NewPublication/Header";
import NameInput from "../../components/NewPublication/Inputs/Name";
import DescriptionInput from "../../components/NewPublication/Inputs/Description";
import ImageInput from "../../components/NewPublication/Inputs/Image";
import TopicInput from "../../components/NewPublication/Inputs/Topic";
import EditorInput from "../../components/NewPublication/Inputs/Editor";
import { showToast } from "../../utils/toaster";
import { useRequestHandler } from "../../hooks/requestHandler";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../utils/common";

function NewPublication() {
  const { requestHandler } = useRequestHandler();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [publication, setPublication] = useState({
    name: "",
    description: "",
    profileImg: "",
    public_id: "",
    editors: [],
    topics: [],
  });

  const createPublication = async () => {
    setIsLoading(true);
    try {
      const params = {
        name: publication.name,
        description: publication.description,
        topics: publication.topics.map((item) => item._id),
        editors: publication.editors.map((item) => item._id),
        profileImg: publication.profileImg,
        public_id: publication.public_id,
      };

      const response = await requestHandler("/publication/create-new", "POST", params);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.slug) {
        navigate(`/publication/${result.data.slug}`);
        return;
      }

      showToast(result?.message || "Some error occured.");
    } catch (err) {
      console.error(err);
      showToast("Some error occured.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNewPublicationBtnClick = () => {
    if (isLoading) return;

    if (!publication.name && !publication.description && !publication.profileImg) {
      showToast("Please add a name, description, and avatar for your publication.");
    } else if (publication.name.trim().length === 0) {
      showToast("Please add publication name.");
    } else if (publication.description.trim().length === 0) {
      showToast("Please add publication description.");
    } else if (!publication.profileImg) {
      showToast("Please select avatar.");
    } else {
      createPublication();
    }
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <Header handleCreateNewPublicationBtnClick={handleCreateNewPublicationBtnClick} isLoading={isLoading} />

      <div className="mx-auto padding59 width87">
        {/* general info info */}
        <header className="block margin69 bdr9 color11 font-9 relative" style={{ marginBottom: 0, borderTop: 0, borderInline: 0 }}>
          <div className="margin68" style={{ marginTop: 0 }}>
            <span className="font-semibold font-11">General</span>
          </div>
        </header>

        <div className="text-left mx-auto margin70" style={{ marginBottom: 0 }}>
          <NameInput publication={publication} setPublication={setPublication} />
          <DescriptionInput publication={publication} setPublication={setPublication} />
          <ImageInput publication={publication} setPublication={setPublication} />
          <div className="margin71">
            <div className="color10 custom-fs-1 w-full">
              <div>Items marked with * are required.</div>
              <div></div>
            </div>
          </div>
        </div>

        {/* social & topics*/}
        <header className="block margin69 bdr9 color11 font-9 relative" style={{ marginBottom: 0, borderTop: 0, borderInline: 0 }}>
          <div className="margin68" style={{ marginTop: 0 }}>
            <span className="font-semibold font-11">Social and topics</span>
          </div>
        </header>

        <div className="mx-auto">
          <div className="margin71">
            <TopicInput publication={publication} setPublication={setPublication} />
          </div>
        </div>

        {/* people */}
        <header className="block margin69 bdr9 color11 font-9 relative" style={{ marginBottom: 0, borderTop: 0, borderInline: 0 }}>
          <div className="margin68" style={{ marginTop: 0 }}>
            <span className="font-semibold font-11">People</span>
          </div>
        </header>

        <div className="mx-auto">
          <div className="margin71">
            <EditorInput publication={publication} setPublication={setPublication} />
            {/* <WriterInput publication={publication} setPublication={setPublication} /> */}
          </div>
        </div>
      </div>

      <div className="mx-auto padding59 width87 margin72">
        <div className="text-right bdr9 w-full padding55" style={{ borderBottom: 0, borderInline: 0, paddingInline: 0 }}>
          <span className="custom-fs-1 color10 align-middle text-right margin-34" style={{ marginLeft: 0, marginBlock: 0 }}>
            Step 1 of 1
          </span>
          <button onClick={handleCreateNewPublicationBtnClick} disabled={isLoading} className="inline-block align-middle height68 line-h11 padding-7 border-radius-9 bdr22 border-[#0F730C] transition-all duration-300 ease text-[#0F730C] custom-fs-1 text-center cursor-pointer whitespace-nowrap font-normal margin-9 opacity-[0.85] hover:opacity-100" style={{ marginLeft: 0, marginBlock: 0 }}>
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default NewPublication;
