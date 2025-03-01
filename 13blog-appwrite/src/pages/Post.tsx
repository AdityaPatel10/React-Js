import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from 'html-react-parser'; // Assuming parse is from html-react-parser

interface Post {
  $id?: string;
  userId?: string;
  featuredImg?: string;
  title?: string;
  content?: string;
}

// Define the RootState interface for Redux state
interface RootState {
  auth: {
    userData: {
      $id: string;
    } | null;
  };
}

export default function Post() {
  const [post, setPost] = useState<Post | null>(null);
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const userData = useSelector((state: RootState) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    if (!post) return;
    service.deletePost(post.$id!).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImg!);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={service.getFilePreview(post.featuredImg!)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content!)}</div>
      </Container>
    </div>
  ) : null;
}