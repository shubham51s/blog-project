import { createSlice } from "@reduxjs/toolkit";

//  muteLoader, mutedUsers, mutedPublications, fetchMutedUsersAndPublications, addMutedUser, removeMutedUser, addMutedPublication, removeMutedPublication
type MuteList = Record<string, boolean>;

interface MuteState {
  userMute: {
    list: MuteList;
    loading: boolean;
  };

  publicationMute: {
    list: MuteList;
    loading: boolean;
  };
}

const initialState: MuteState = {
  userMute: {
    list: {},
    loading: false,
  },
  publicationMute: {
    list: {},
    loading: false,
  },
};

const muteSlice = createSlice({
  name: "mutes",
  initialState,
  reducers: {},
});

export default muteSlice.reducer;
