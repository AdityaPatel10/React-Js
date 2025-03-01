import { Link } from "react-router-dom";
import service from "../appwrite/config";
import  PostCardTypes from "../types/postCardTypes"; // Ensure correct import

function PostCard({ $id, title = "Untitled", featuredImg }: PostCardTypes) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full flex justify-center mb-4">
          <img
            src={featuredImg ? service.getFilePreview(featuredImg) : "/placeholder.jpg"}
            alt={title}
            className="rounded-xl w-full h-auto object-cover"
          />
        </div>
        <h2 className="text-xl font-bold text-center">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
