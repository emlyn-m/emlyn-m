import PostHeader from '@/app/components/post_header';
import NotFound from '@/app/not-found';
import { Posts } from '@/app/post/posts';

export default async function Page({params}: {
    params: Promise<{ post_id: string }>
}) {
    const { post_id } = await params;
    const post_data = Posts[post_id];
    if (!post_data) { return NotFound() }

    return (
        <div className="p-10">
            <PostHeader name={ post_id } />
            { post_data.contents }

        </div>
    )
}