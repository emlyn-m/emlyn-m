import { CapstonePost } from './post_capstone';

export interface IPost {
    title: string,
    contents: any; //ReactElement
}
export const Posts: Record<string, IPost> = {
    'capstone-project': CapstonePost,
}

// Serializable - Avoid Client-Server issues
export interface IPostTitles { id: string, title: string };
export var PostTitles: IPostTitles[] = [
    { id: 'capstone-project', title: 'Capstone Project' }
];