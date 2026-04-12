import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ConfirmDeclineModal from "../../../../Common/Modals/ConfirmDeclineBlogSubmission";
import { useRequestHandler } from "../../../../../hooks/requestHandler";

function StatusAction({ blog, setBlog }) {
  const { requestHandler } = useRequestHandler();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const options = [
    {
      id: 1,
      name: "Pending review",
      color: "color-4",
      bg: "bg-11",
    },
    {
      id: 2,
      name: "Approved",
      color: "text-[#1a8917]",
      bg: "bg19",
    },
    {
      id: 3,
      name: "Declined",
      color: "text-[#242424]",
      bg: "bg-10",
    },
  ];

  const removeFromList = () => {
    setBlog(null);
  };

  const approveBlogSubmission = async () => {
    setIsLoading(true);
    try {
      const params = { blogId: blog._id };
      const response = await requestHandler("/publication/requests/approve", "POST", params);
      const result = await response.json();

      if (response?.status === 200) {
        removeFromList();
      } else {
        showToast(result?.message || "Some error occured.");
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (id) => {
    if (id === 1) {
      setBlog(null);
      setIsOpen(false);
    }

    if (id === 2) approveBlogSubmission();

    if (id === 3) setIsShowModal(true);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger className="w-full overflow-hidden cursor-pointer m-0 p-0">
          <div className="bg-11 text-left padding-28 padding84 w-fit border-radius10 flex items-center gap9">
            <div className="custom-fs-1 whitespace-nowrap color-4 line20 font-normal">Pending review</div>
            <div className="width-19 aspect-square">
              <MdOutlineKeyboardArrowDown />
            </div>
          </div>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content side="bottom" onClick={(e) => e.stopPropagation()} align="middle" sideOffset={1}>
            <div className="box-shadow-4 border-radius10 custom-bg-8">
              <ul className="width-29 overflow-hidden custom-px-2 flex flex-col items-stretch list-none m-0">
                {/* map */}
                {options.map((item) => (
                  <li key={item.id} className="custom-px-2 padding-7 custom-fs-1 font-normal">
                    <button onClick={() => handleStatusChange(item.id)} disabled={isLoading} className="cursor-pointer m-0 p-0">
                      <div className={`w-fit padding-28 padding84 border-radius10 flex items-center gap9 ${item.bg}`}>
                        <div className={`custom-fs-1 line20 font-normal whitespace-nowrap ${item.color}`}>{item.name}</div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      {isShowModal && <ConfirmDeclineModal isShowModal={isShowModal} handleCloseModal={handleCloseModal} blog={blog} removeFromList={removeFromList} />}
    </>
  );
}

export default StatusAction;
