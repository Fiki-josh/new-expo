export type RegisterResponse = {
  isError: boolean;
  message: string;
  isSuccess: boolean;
};

export type ReturnedUser = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type LoginResponse = {
  isError: boolean;
  message: string;
  isSuccess: boolean;
  data?: ReturnedUser;
};

export type StoryCardProps = {
  id: number;
  title: string;
  by: string;
  score: number;
  time: number;
  kids: number[];
  url: string;
};

export type TopStoriesReturn = {
  isError: boolean;
  message: string;
  data?: number[];
};

export type StorySliceStateType = {
  topStoryIds: number[];
  newStoryIds: number[];
  topStories: StoryCardProps[] | null;
  newStories: StoryCardProps[] | null;
  limitTop: number;
  limitNew: number;
};
