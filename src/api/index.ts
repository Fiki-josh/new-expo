import { StoryCardProps } from "@/src/types";

const BASE_URL = "https://hacker-news.firebaseio.com/v0"

export const getStoriesId = async (param: string) => {
    // Get stories as array
    try {
        const response = await fetch(`${BASE_URL}/${param}.json?print=pretty`)
        const storiesIdArr: number[] = await response.json();

        if(!response.ok) throw new Error("Error fetching stories");

        return {data: storiesIdArr}
    } catch (error: any) {
        console.log(error)
        return {isError: true, message: error.message}
    }
}

export const getStoryById = async (id: number) => {
    //fetch individual story object based on the id param
    try {
        const response = await fetch(`${BASE_URL}/item/${id}.json?print=pretty`)
        const data: StoryCardProps = await response.json();

        if(!response.ok) throw new Error("Error fetching stories");

        return data

    } catch (error) {
        console.log(error)
    }
}