import { useParams } from "react-router-dom";

export default function User() {
  const { userid } = useParams<string>();
  return (
    <div className="bg-orange-900 font-bold text-center text-3xl font-serif text-white">
      User : {userid}
    </div>
  );
}
