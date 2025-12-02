"use client";

import { Posts } from "../posts";
import PostHeader from '@/app/components/post_header';

export default function RenderPost(props: { post_id: string }) {
  const post_data = Posts[props.post_id];

  return (
    <div className="p-10 pb-5 flex flex-col gap-10">
        <PostHeader title={ post_data.title } />
        { post_data.contents() }
    </div>
  );
}