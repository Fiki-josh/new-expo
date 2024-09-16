import { useDispatch, useSelector } from "react-redux";
import { getStoriesId, getStoryById } from "../api";
import { useState } from "react";
import {
  addNewStoryIds,
  addNewStory,
  increaseNewLimit,
} from "../redux/features/storySlice";
import { RootState } from "../redux/store";

export const useGetNewStories = () => {
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [canFetchNextPage, setCanFetchNextPage] = useState(true);

  const storyState = useSelector((state: RootState) => state.story);
  const dispatch = useDispatch()

  const getStories = async () => {
    const { isError, message, data } = await getStoriesId("newstories");

    if (!data || isError) {
      setIsError(isError);
      setErrMsg(message);
      return;
    }

    dispatch(addNewStoryIds(data));

    const pageData = data.slice(0, 10);

    for (const storyId of pageData) {
      const story = await getStoryById(storyId);

      dispatch(addNewStory(story));
    }

    dispatch(increaseNewLimit());
  };

  const getMoreStories = async () => {
    if (storyState.newStories?.length === storyState.newStoryIds.length)
      setCanFetchNextPage(false);

    const pageData = storyState.newStoryIds.slice(
      storyState.newStories?.length,
      storyState.limitNew
    );

    for (const storyId of pageData) {
      const story = await getStoryById(storyId);

      story && dispatch(addNewStory(story));
    }

    dispatch(increaseNewLimit());
  };

  return { isError, errMsg, canFetchNextPage, getMoreStories, getStories };
};
