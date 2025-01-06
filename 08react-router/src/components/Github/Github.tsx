// import { useEffect, useState } from "react";

import { useLoaderData } from "react-router-dom";

export default function Github() {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch("https://api.github.com/users/AdityaPatel10")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setData(data);
  //     });
  // }, []);
  const data = useLoaderData()
  return (
    <div className="bg-orange-900 font-bold text-center text-3xl font-serif text-white p-3">
      <h1>GitHub Followers: {data.followers}</h1>
      <img
        src={data.avatar_url}
        alt="Github-Profile-Photo"
        className="w-32 rounded-lg m-auto"
      />
    </div>
  );
}

export const githubInfoLoader = async ()=> {
  const res = await fetch("https://api.github.com/users/AdityaPatel10")
  return res.json()
}
