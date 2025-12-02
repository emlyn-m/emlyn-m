import PostHeader from '@/app/components/post_header';
import NotFound from '@/app/not-found';
import { Posts, IPost } from '@/app/post/posts';

export const generateMetadata = async ({ params }: { params: { post_id: string } }) => {
    const post: IPost = Posts[params.post_id];
    if (!post) { return { title: '404 | Emlyn Matheson' } }
    return { title: post.title, };
};

export default async function Page({params}: {
    params: Promise<{ post_id: string }>
}) {
    const { post_id } = await params;
    const post_data = Posts[post_id];
    if (!post_data) { return NotFound() }

    return (
        <div className="p-10 flex flex-col gap-10">
            <PostHeader title={ post_data.title } />
            { post_data.contents }

        </div>
    )
}