import { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Post } from "../types/PostFormTypes";

function AllPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    service
      .getPosts()
      .then((response) => {
        if (response && response.documents) {
          setPosts(response.documents);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="w-full py-8 bg-black">
      <Container>
        <div className="flex flex-wrap">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div className="p-2 w-1/4" key={post.$id}>
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <p className="text-center w-full text-gray-500">No posts available.</p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
