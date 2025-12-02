import NotFound from '@/app/not-found';
import { Posts, IPost } from '@/app/post/posts';
import RenderPost from './render_post';

export const generateMetadata = async ({ params }: { params: Promise<{ post_id: string }> }) => {
    const post: IPost = Posts[(await params).post_id];
    return { title: post?.title, };
};

export default async function Page({params}: {
    params: Promise<{ post_id: string }>
}) {
    const { post_id } = await params;
    const post_data = Posts[post_id];
    if (!post_data) { return NotFound() }

    return (<>
        <RenderPost post_id={post_id} />;
    </>)
}