import React, { useRef, useState, useMemo } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useRequestHandler } from "../../../../hooks/requestHandler";

function EditorInput({ publication, setPublication }) {
  const { requestHandler } = useRequestHandler();
  const [isfocus, setIsFocus] = useState(false);
  const [options, setOptions] = useState([]);
  const searchtimeout = useRef(null);

  const fetchUsers = async (val) => {
    try {
      const response = await requestHandler(`/users/search?val=${val}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.users?.length > 0) {
        setOptions(result.data.users);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (val) => {
    if (!val || val.length < 2) return;

    if (searchtimeout.current) clearTimeout(searchtimeout.current);

    searchtimeout.current = setTimeout(() => {
      fetchUsers(val);
    }, 600);
  };

  const mergedOptions = useMemo(() => {
    return [...options, ...(publication.editors || [])].filter((v, i, arr) => arr.findIndex((x) => String(x._id) === String(v._id)) === i);
  }, [options, publication.editors]);

  return (
    <div className="margin71 flex items-start">
      <div className="font-semibold relative padding81 w-[25%]">Editors</div>

      <div className="padding59 w-[75%]">
        <div className={`${isfocus ? "bdr24" : "bdr23"}`} style={{ borderInline: 0, borderTop: 0 }}>
          <Autocomplete
            multiple
            options={mergedOptions}
            value={publication.editors || []}
            filterSelectedOptions
            noOptionsText=""
            getOptionLabel={(option) => option?.name || ""}
            filterOptions={(x) => x}
            onInputChange={(event, value) => {
              handleInputChange(value);
            }}
            isOptionEqualToValue={(option, value) => String(option._id) === String(value._id)}
            renderOption={(props, option) => {
              const { key, ...rest } = props;

              return (
                <li key={key} {...rest} className="flex items-center custom-gap-3 padding59 custom-px-2 custom-fs-1 font-normal cursor-pointer bg-transparent border-radius-1 transition-all duration-75 ease hover:bg-gray-300">
                  <img loading="lazy" src={option.profileImg} className="width-25 aspect-square rounded-full" />
                  <div className="color-3">{option.name}</div>
                  <div className="color-4">{option.username}</div>
                </li>
              );
            }}
            onChange={(event, value) => {
              setPublication((prev) => ({
                ...prev,
                editors: value,
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder="Add a writer..."
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                }}
                sx={{
                  "& .MuiInputBase-root:before": { borderBottom: "none" },
                  "& .MuiInputBase-root:after": { borderBottom: "none" },
                }}
              />
            )}
          />
        </div>

        <div className="color10 custom-fs-1 padding-27" style={{ paddingBottom: 0 }}>
          Editors can add or remove stories. They can also review, edit and publish submissions.
        </div>
      </div>
    </div>
  );
}

export default EditorInput;
