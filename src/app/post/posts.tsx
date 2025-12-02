import { ReactElement } from 'react';

export interface IPost {
    name: string,
    contents: ReactElement
}

export const Posts: Record<string, IPost> = {
}