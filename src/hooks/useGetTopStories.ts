import { useDispatch, useSelector } from "react-redux";
import { getStoriesId, getStoryById } from "../api";
import { useState } from "react";
import {
  addTopStoryIds,
  addTopStory,
  increaseTopLimit,
} from "../redux/features/storySlice";
import { RootState } from "../redux/store";

export const useGetTopStories = () => {
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [canFetchNextPage, setCanFetchNextPage] = useState(true);

  const storyState = useSelector((state: RootState) => state.story);
  const dispatch = useDispatch();

  const getStories = async () => {
    const { isError, message, data } = await getStoriesId("topstories");

    if (!data || isError) {
      setIsError(isError);
      setErrMsg(message);
      return;
    }

    dispatch(addTopStoryIds(data));

    const pageData = data.slice(0, 10);

    for (const storyId of pageData) {
      const story = await getStoryById(storyId);

      dispatch(addTopStory(story));
    }

    dispatch(increaseTopLimit());
  };

  const getMoreStories = async () => {
    if (storyState.topStories?.length === storyState.topStoryIds.length)
      setCanFetchNextPage(false);

    const pageData = storyState.topStoryIds.slice(
      storyState.topStories?.length,
      storyState.limitTop
    );

    for (const storyId of pageData) {
      const story = await getStoryById(storyId);

      story && dispatch(addTopStory(story));
    }

    dispatch(increaseTopLimit());
  };

  return { isError, errMsg, canFetchNextPage, getMoreStories, getStories };
};
