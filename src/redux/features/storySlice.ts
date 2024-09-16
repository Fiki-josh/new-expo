import { StorySliceStateType } from "@/src/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: StorySliceStateType = {
  topStoryIds: [],
  newStoryIds: [],
  topStories: [],
  newStories: [],
  limitTop: 0,
  limitNew: 0,
};

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    addTopStoryIds: (state, actions) => {
      state.topStoryIds = actions.payload;
    },
    addTopStory: (state, actions) => {
      state.topStories?.push(actions.payload);
    },
    addNewStoryIds: (state, actions) => {
      state.newStoryIds = actions.payload;
    },
    addNewStory: (state, actions) => {
      state.newStories?.push(actions.payload);
    },
    increaseTopLimit: (state) => {
      state.limitTop += 10;
    },
    increaseNewLimit: (state) => {
      state.limitNew += 10;
    },
  },
});

export const {
  addTopStoryIds,
  addTopStory,
  addNewStoryIds,
  addNewStory,
  increaseTopLimit,
  increaseNewLimit,
} = storySlice.actions;
export default storySlice.reducer;
