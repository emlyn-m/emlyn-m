import { ReactElement } from 'react';
import { CapstonePost } from './post_capstone';

export interface IPost {
    title: string,
    contents: any; //ReactElement
}

export const Posts: Record<string, IPost> = {
    'capstone-project': CapstonePost,
}