import React from "react";
import { formatMonthAndDayShort } from "../../../../utils/monthDateFormatter";
import { Link } from "react-router-dom";
import noPreviewImg from "../../../../assets/images/noPreviewImage.png";
import { getImageUrl } from "../../../../utils/common";
import ActionBtn from "./ActionBtn";

function BlogComp({ item }) {
  return (
    <tr className="bdr-5" style={{ borderInline: 0, borderBottom: 0 }}>
      <td className="table-cell padding70" style={{ paddingInline: 0 }}>
        <Link to={`/p/${item._id}/edit`} className="w-full min-w-0 overflow-hidden relative cursor-pointer">
          <div className="margin58 width69 flex items-start custom-gap-2" style={{ marginLeft: 0, marginBlock: 0 }}>
            <div>
              <div className="relative z-[2] cursor-pointer m-0 p-0 height-54 width70">
                {item.previewImg && <img src={getImageUrl(item.previewImg)} alt={item.name} className="w-full object-cover object-center aspect-[3/2] border-radius-5 align-middle" />}
                {!item.previewImg && <img src={noPreviewImg} alt={item.name} className="w-full object-cover object-center aspect-[3/2] border-radius-5 align-middle" />}
              </div>
            </div>
            <div className="w-full flex items-stretch justify-between custom-gap-3">
              <div className="w-full flex flex-col items-start gap10">
                <div className="w-full break-words min-w-0">
                  <h2 className="font-bold font-10 color-3 custom-line-h-1 m-0 p-0">{item.previewTitle}</h2>
                </div>
                <div className="w-full flex flex-col gap10">
                  <div className="flex items-center custom-gap-1">
                    <div className="flex items-center flex-wrap">
                      <p className="font-4 color-4 custom-line-h-1 font-normal m-0 p-0">{item.readingTime} min read</p>
                      <div className="padding-23 custom-fs-1 color-4 custom-line-h-1 font-normal" style={{ paddingBlock: 0 }}>
                        .
                      </div>
                      <p className="font-4 color-4 custom-line-h-1 font-normal m-0 p-0">Updated {formatMonthAndDayShort(item.updatedAt)}</p>
                    </div>
                  </div>
                  <div className="w-full flex justify-between items-end"></div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </td>

      {/* publication */}
      <td className="table-cell padding70" style={{ paddingInline: 0 }}>
        <div className="min-w-0 w-full overflow-hidden"></div>
      </td>

      {/* status */}
      <td className="table-cell padding70" style={{ paddingInline: 0 }}>
        <div className="min-w-0 w-full overflow-hidden"></div>
      </td>

      <td className="table-cell padding70" style={{ paddingInline: 0 }}>
        <div className="min-w-0 w-full overflow-hidden flex justify-end">
          <ActionBtn item={item} />
        </div>
      </td>
    </tr>
  );
}

export default BlogComp;
