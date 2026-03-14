import React from "react";
import Header from "../../components/NewPublication/Header";
import NameInput from "../../components/NewPublication/Inputs/Name";

function NewPublication() {
  return (
    <>
      <Header />
      <div className="mx-auto padding59 width87">
        {/* general info info */}
        <header className="block margin69 bdr9 color11 font-9 relative" style={{ marginBottom: 0, borderTop: 0, borderInline: 0 }}>
          <div className="margin68" style={{ marginTop: 0 }}>
            <span className="font-semibold font-11">General</span>
          </div>
        </header>

        <div className="text-left mx-auto margin70" style={{ marginBottom: 0 }}>
          <NameInput />
        </div>

        {/* social & topics*/}
        <header className="block margin69 bdr9 color11 font-9 relative" style={{ marginBottom: 0, borderTop: 0, borderInline: 0 }}>
          <div className="margin68" style={{ marginTop: 0 }}>
            <span className="font-semibold font-11">Social and topics</span>
          </div>
        </header>

        <div className=""></div>

        {/* people */}
        <header className="block margin69 bdr9 color11 font-9 relative" style={{ marginBottom: 0, borderTop: 0, borderInline: 0 }}>
          <div className="margin68" style={{ marginTop: 0 }}>
            <span className="font-semibold font-11">People</span>
          </div>
        </header>

        <div className=""></div>
      </div>
    </>
  );
}

export default NewPublication;
