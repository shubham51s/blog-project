import React, { useEffect, useState } from "react";
import Header from "../../../components/PublicationSettings/Header";
import NameInput from "../../../components/PublicationSettings/Inputs/Name";
import DescriptionInput from "../../../components/PublicationSettings/Inputs/Description";
import ImageInput from "../../../components/PublicationSettings/Inputs/Image";
import TopicInput from "../../../components/PublicationSettings/Inputs/Topic";
import WriterInput from "../../../components/PublicationSettings/Inputs/Writer";
import EditorInput from "../../../components/PublicationSettings/Inputs/Editor";
import { showToast } from "../../../utils/toaster";
import { useRequestHandler } from "../../../hooks/requestHandler";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/Common/Spinner";
import NotFoundComp from "../../../components/Common/NotFound";

function PublicationSettings() {
  const navigate = useNavigate();
  const { requestHandler } = useRequestHandler();
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveLoader, setIsSaveLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [publication, setPublication] = useState({
    name: "",
    description: "",
    profileImg: "",
    editors: [],
    topics: [],
    _id: "",
    slug: "",
  });

  const getPublicationDetails = async () => {
    setIsLoading(true);
    try {
      const response = await requestHandler(`/publication/settings/${slug}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.publication) {
        const data = result.data.publication;

        setPublication((prev) => ({ ...prev, _id: data._id, name: data.name, description: data.description, profileImg: data.profileImg, topics: data.topics, editors: data.editors, slug: data.slug }));
      } else {
        setIsError(true);
      }
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const savePublication = async () => {
    try {
      const params = {
        name: publication.name,
        description: publication.description,
        profileImg: publication.profileImg,
        editors: publication.editors.map((item) => item._id),
        topics: publication.topics.map((item) => item._id),
        _id: publication._id,
      };

      const response = await requestHandler("/publication/update", "POST", params);
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
      setIsSaveLoader(false);
    }
  };

  const isNameAvailable = async () => {
    setIsSaveLoader(true);
    try {
      const response = await requestHandler(`/publication/check-name-availability/${publication.name}`);
      const result = await response.json();

      if (response?.status === 200) {
        savePublication();
        return;
      }
      showToast(result?.message || "Some error occured.");
      setIsSaveLoader(false);
    } catch (err) {
      console.error(err);
      showToast("Some error occured.");
      setIsSaveLoader(false);
    }
  };

  const handleSavePublicationBtnClick = () => {
    if (isSaveLoader) return;

    if (!publication.name && !publication.description) {
      showToast("Please add a name, description, and avatar for your publication.");
    } else if (publication.name.trim().length === 0) {
      showToast("Please add publication name.");
    } else if (publication.description.trim().length === 0) {
      showToast("Please add publication description.");
    } else {
      isNameAvailable();
    }
  };

  useEffect(() => {
    getPublicationDetails();
  }, []);

  return (
    <>
      {!isLoading && !isError && (
        <>
          <Header publication={publication} handleSavePublicationBtnClick={handleSavePublicationBtnClick} />

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
            <div className="text-right margin-18 grow-0 shrink-0 basis-auto" style={{ marginRight: 0 }}>
              <button onClick={handleSavePublicationBtnClick} disabled={isSaveLoader} className="inline-block align-middle height68 line-h11 padding-7 border-radius-9 bdr22 border-[#0F730C] transition-all duration-300 ease text-[#0F730C] custom-fs-1 text-center cursor-pointer whitespace-nowrap font-normal margin-9 opacity-[0.85] hover:opacity-100" style={{ marginLeft: 0, marginBlock: 0 }}>
                Save
              </button>
              <Link to={`/publication/${publication?.slug}`} className="inline-block align-middle height68 line-h11 padding-7 bdr23 border-radius-9 bdr17-hover transition-all duration-300 ease color-3 custom-fs-1 text-center cursor-pointer whitespace-nowrap font-normal opacity-[0.75] hover:opacity-100">
                Cancel
              </Link>
            </div>
          </div>
        </>
      )}

      {/* loader */}
      {isLoading && (
        <div className="w-full height-11 flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {/* error */}
      {!isLoading && isError && (
        <div className="w-full flex items-center justify-center">
          <NotFoundComp />
        </div>
      )}
    </>
  );
}

export default PublicationSettings;
