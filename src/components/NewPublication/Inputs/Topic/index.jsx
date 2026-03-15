import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useRequestHandler } from "../../../../hooks/requestHandler";

function TopicInput({ publication, setPublication }) {
  const { requestHandler } = useRequestHandler();
  const [isfocus, setIsFocus] = useState(false);
  const [topics, setTopics] = useState([]);
  // const topics = [
  //   { _id: "1", name: "React" },
  //   { _id: "2", name: "Node.js" },
  //   { _id: "3", name: "MongoDB" },
  // ];

  const fetchTopics = async () => {
    try {
      const response = await requestHandler("/topic");
      const result = await response.json();

      if (response?.status === 200 && result?.data?.topics?.length > 0) {
        setTopics(result.data.topics);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <div className="margin71 flex items-start">
      <div className="font-semibold relative padding81 w-[25%]">Topics</div>
      <div className="padding59 w-[75%]">
        {/*  */}
        <div className={`${isfocus ? "bdr24" : "bdr23"}`} style={{ borderInline: 0, borderTop: 0 }}>
          <Autocomplete
            multiple
            id="tags-standard"
            options={topics}
            filterSelectedOptions
            noOptionsText=""
            getOptionLabel={(option) => option.name.charAt(0).toUpperCase() + option.name.slice(1)}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            getOptionDisabled={() => publication.topics.length >= 5}
            onChange={(event, value) => {
              const selectedIds = value.map((item) => item._id);

              setPublication((prev) => ({ ...prev, topics: selectedIds }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder="Add a topic..."
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
          Adding topics (up to 5) allows people to search for and discover your publication.
        </div>
      </div>
    </div>
  );
}

export default TopicInput;
