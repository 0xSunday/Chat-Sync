import PostFeed from "@/components/posts/PostFeed";
import Header from "@/components/Header";
import Form from "@/components/Form";

export default function Home() {
  return (
    <div className="">
      <Header label="Home" />
      <Form placeholder="Write a caption" />
      <PostFeed />
    </div>
  );
}
