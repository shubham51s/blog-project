import React, { useContext, useState } from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import * as Popover from "@radix-ui/react-popover";
import { showToast } from "../../../utils/toaster";
import DeleteListModal from "../../ProfileComp/ListSection/ListModals/delete";
import MakeListPrivateModal from "../../ProfileComp/ListSection/ListModals/makePrivate";
import HideResponseModal from "../../ProfileComp/ListSection/ListModals/hideResponses";
import EditListModal from "../../ProfileComp/ListSection/ListModals/edit";
import { UserContext } from "../../../context/userContext";
import { useRequestHandler } from "../../../hooks/requestHandler";
import { useNavigate } from "react-router-dom";
import { ListContext } from "../../../context/listContext";

function MoreButton({ list, setList, fetchListDetails, setClapDetails }) {
  const { deleteListFromArr, updateListItemInArr, makeListItemPublic, makeListItemPrivate } = useContext(ListContext);
  const rootUrl = window.location.origin;
  const { requestHandler } = useRequestHandler();
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isPrivateListModal, setIsPrivateListModal] = useState(false);
  const [isEditListModal, setIsEditListModal] = useState(false);
  const [isHideResponseModal, setIsHideResponseModal] = useState(false);
  const [loaders, setLoaders] = useState({
    showResponseLoader: false,
    makeListPublicLoader: false,
    clapLoader: false,
  });

  const handleCloseDeleteModal = () => {
    setIsDeleteModal(false);
  };

  const handleShowDeleteModal = () => {
    setIsDeleteModal(true);
  };

  const handleClosePrivateListModal = () => {
    setIsPrivateListModal(false);
  };

  const handleShowPrivateListModal = () => {
    setIsPrivateListModal(true);
  };

  const handleCloseHideResponseModal = () => {
    setIsHideResponseModal(false);
  };

  const handleShowHideResponseModal = () => {
    setIsHideResponseModal(true);
  };

  const handleCloseEditListModal = () => {
    setIsEditListModal(false);
  };

  const handleShowEditListModal = () => {
    setIsEditListModal(true);
  };

  const editList = async (params, setIsLoading) => {
    setIsLoading(true);
    try {
      const response = await requestHandler("/list/update", "POST", params);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.updatedList) {
        updateListItemInArr(result.data.updatedList);
        fetchListDetails();
      } else {
        if (response?.status < 500) {
          showToast(result?.message || "Some error occured");
        } else {
          showToast("Some error occured", "error");
        }
      }
      setIsLoading(false);
      setIsEditListModal(false);
    } catch (err) {
      console.error(err);
      showToast("Some error occured", "error");
      setIsLoading(false);
      setIsEditListModal(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      const text = `${rootUrl}/profile/${list.user.username}/list/${list.slug}`;
      await navigator.clipboard.writeText(text);
      showToast("Link copied");
      setIsPopupOpen(false);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleMakeListPublic = async () => {
    setLoaders((prev) => ({ ...prev, makeListPublicLoader: true }));
    try {
      const params = {
        listId: list._id,
      };

      const response = await requestHandler("/list/make-public", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        setList((prev) => ({ ...prev, isPrivate: false }));
        showToast(`${list.name} is now public.`);
        makeListItemPublic(list._id);
      } else {
        showToast(result?.message || "Some error occured");
      }
      setLoaders((prev) => ({ ...prev, makeListPublicLoader: false }));
      setIsPopupOpen(false);
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
      setLoaders((prev) => ({ ...prev, makeListPublicLoader: false }));
      setIsPopupOpen(false);
    }
  };

  const makeListPrivate = async (setIsLoading) => {
    setIsLoading(true);
    try {
      const params = {
        listId: list._id,
      };

      const response = await requestHandler("/list/make-private", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        setList((prev) => ({ ...prev, isPrivate: true }));
        showToast(`${list.name} is now private.`);
        makeListItemPrivate(list._id);
      } else {
        showToast(result?.message || "Some error occured");
      }

      setIsLoading(false);
      handleClosePrivateListModal();
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
      setIsLoading(false);
      handleClosePrivateListModal();
    }
  };

  const hideResponses = async (setIsLoading) => {
    setIsLoading(true);
    try {
      const params = {
        listId: list._id,
      };

      const response = await requestHandler("/list/hide-responses", "POST", params);

      if (response?.status === 200) {
        setList((prev) => ({ ...prev, allowComments: false }));
        showToast("Responses are now hidden for this list.");
      } else {
        showToast("Some error occured");
      }

      setIsLoading(false);
      handleCloseHideResponseModal();
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
      setIsLoading(false);
      handleCloseHideResponseModal();
    }
  };

  const handleShowResponses = async () => {
    setLoaders((prev) => ({ ...prev, showResponseLoader: true }));
    try {
      const params = {
        listId: list._id,
      };

      const response = await requestHandler("/list/show-responses", "POST", params);

      if (response?.status === 200) {
        setList((prev) => ({ ...prev, allowComments: true }));
        showToast("Responses are now shown for this list.");
      } else {
        showToast("Some error occured");
      }
      setLoaders((prev) => ({ ...prev, showResponseLoader: false }));
      setIsPopupOpen(false);
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
      setLoaders((prev) => ({ ...prev, showResponseLoader: false }));
      setIsPopupOpen(false);
    }
  };

  const deleteList = async (setIsLoading) => {
    setIsLoading(true);
    try {
      const response = await requestHandler(`/list/delete/${list._id}`, "DELETE");

      if (response?.status === 200) {
        deleteListFromArr(list._id);
        showToast("List deleted and removed from Your library");
        navigate(`/profile/${list.user.username}/lists`);
      } else {
        showToast("Some error occured");
      }
      setIsLoading(false);
      handleCloseDeleteModal();
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
      setIsLoading(false);
      handleCloseDeleteModal();
    }
  };

  const undoMyClaps = async () => {
    setLoaders((prev) => ({ ...prev, clapLoader: true }));
    try {
      const params = {
        listId: list._id,
      };
      const response = await requestHandler("/list/claps/remove", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        const newTotal = list.clapsCount - list.myClaps;
        setList((prev) => ({ ...prev, clapsCount: newTotal, myClaps: 0 }));
        setClapDetails((prev) => ({ ...prev, total: newTotal }));
        setIsPopupOpen(false);
      } else {
        showToast("Some error occured");
      }
      setLoaders((prev) => ({ ...prev, clapLoader: false }));
    } catch (err) {
      console.error(err);
      showToast("Some error occured");
      setLoaders((prev) => ({ ...prev, clapLoader: false }));
    }
  };

  return (
    <>
      <div>
        <Popover.Root open={isPopupOpen} onOpenChange={setIsPopupOpen}>
          <Popover.Trigger className="custom-px-2 padding-36 cursor-pointer opacity-[0.75] transition-all duration-200 linear hover:opacity-100" title="More">
            <div className="width-13 aspect-square color-3">
              <MdOutlineMoreHoriz className="w-full h-full" />
            </div>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content side="bottom" className="z-[700] box-border border-radius-3 box-shadow-4" align="middle" sideOffset={1}>
              <div className="custom-bg-8 border-radius-3 overflow-hidden">
                {list.user._id === userInfo._id && (
                  <ul className="flex flex-col items-stretch custom-px-2 list-none m-0">
                    <li className="custom-px-2 padding59 color-3 opacity-[0.85] custom-fs-1 font-normal transition-all duration-100 linear hover:opacity-100">
                      <button onClick={handleCopyLink} className="cursor-pointer m-0 p-0">
                        <div className="inline-block">Copy link</div>
                      </button>
                    </li>
                    <li className="custom-px-2 padding59 color-3 opacity-[0.85] custom-fs-1 font-normal transition-all duration-100 linear hover:opacity-100">
                      <button onClick={handleShowEditListModal} className="cursor-pointer m-0 p-0">
                        <div className="inline-block">Edit list info</div>
                      </button>
                    </li>
                    {list.isPrivate && (
                      <li className="custom-px-2 padding59 color-3 opacity-[0.85] custom-fs-1 font-normal transition-all duration-100 linear hover:opacity-100">
                        <button disabled={loaders.makeListPublicLoader} onClick={handleMakeListPublic} className="cursor-pointer m-0 p-0">
                          <div className="inline-block">Make list public</div>
                        </button>
                      </li>
                    )}
                    {!list.isPrivate && (
                      <li className="custom-px-2 padding59 color-3 opacity-[0.85] custom-fs-1 font-normal transition-all duration-100 linear hover:opacity-100">
                        <button onClick={handleShowPrivateListModal} className="cursor-pointer m-0 p-0">
                          <div className="inline-block">Make list private</div>
                        </button>
                      </li>
                    )}
                    {list.allowComments && (
                      <li className="custom-px-2 padding59 color-3 opacity-[0.85] custom-fs-1 font-normal transition-all duration-100 linear hover:opacity-100">
                        <button onClick={handleShowHideResponseModal} className="cursor-pointer m-0 p-0">
                          <div className="inline-block">Hide responses</div>
                        </button>
                      </li>
                    )}
                    {!list.allowComments && (
                      <li className="custom-px-2 padding59 color-3 opacity-[0.85] custom-fs-1 font-normal transition-all duration-100 linear hover:opacity-100">
                        <button disabled={loaders.showResponseLoader} onClick={handleShowResponses} className="cursor-pointer m-0 p-0">
                          <div className="inline-block">Show responses</div>
                        </button>
                      </li>
                    )}
                    {!list.isDefault && (
                      <li className="custom-px-2 padding59 text-[#c94a4a] opacity-[0.85] custom-fs-1 font-normal transition-all duration-100 linear hover:opacity-100">
                        <button onClick={handleShowDeleteModal} className="cursor-pointer m-0 p-0">
                          <div className="inline-block">Delete list</div>
                        </button>
                      </li>
                    )}
                  </ul>
                )}
                {list.user._id !== userInfo._id && (
                  <ul className="flex flex-col items-stretch custom-px-2 list-none m-0">
                    <li className="custom-px-2 padding59 color-3 opacity-[0.85] custom-fs-1 font-normal transition-all duration-100 linear hover:opacity-100">
                      <button onClick={handleCopyLink} className="cursor-pointer m-0 p-0">
                        <div className="inline-block">Copy link</div>
                      </button>
                    </li>
                    {list?.myClaps > 0 && (
                      <li className="custom-px-2 padding59 color-3 opacity-[0.85] custom-fs-1 font-normal transition-all duration-100 linear hover:opacity-100">
                        <button onClick={undoMyClaps} disabled={loaders.clapLoader} className="cursor-pointer m-0 p-0">
                          <div className="inline-block">Undo applause for this list</div>
                        </button>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>

      {/* confirm delete list modal */}
      <DeleteListModal isDeleteModal={isDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal} deleteList={deleteList} />

      {/* confirm make private list modal */}
      <MakeListPrivateModal isPrivateListModal={isPrivateListModal} handleClosePrivateListModal={handleClosePrivateListModal} makeListPrivate={makeListPrivate} />

      {/* hide responses modal */}
      <HideResponseModal isHideResponseModal={isHideResponseModal} handleCloseHideResponseModal={handleCloseHideResponseModal} hideResponses={hideResponses} />

      {/* edit list details */}
      <EditListModal isEditListModal={isEditListModal} handleCloseEditListModal={handleCloseEditListModal} list={list} editList={editList} />
    </>
  );
}

export default MoreButton;
