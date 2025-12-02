import NotFound from '@/app/not-found';
import { PostTitles, IPost } from '@/app/post/posts';
import RenderPost from './render_post';

export const generateMetadata = async ({ params }: { params: Promise<{ post_id: string }> }) => {
    const { post_id } = await params;
    console.log(PostTitles);
    const postTitle = PostTitles.filter((x) => (x.id == post_id))[0];
    return { title: `${postTitle.title ?? post_id} | Emlyn Matheson`, };
};

export default async function Page({params}: {
    params: Promise<{ post_id: string }>
}) {
    const { post_id } = await params;
    const post_data = PostTitles.filter((x) => (x.id == post_id))[0];
    if (!post_data) { return NotFound() }

    return (<>
        <RenderPost post_id={post_id} />;
    </>)
}