import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../types/authStatusType";

export default function Protected({
  children,
  authentication = true,
}: {
  children?: React.ReactNode;
  authentication: boolean;
}) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState<boolean>(true);
  const authStatus = useSelector((state: RootState) => state.auth.status);
  useEffect(() => {

    //TODO: make it more easy

    // if(authStatus === true){
    //     navigate('/')
    // }else if(authStatus === false){
    //     navigate('/login')
    // }

    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);
  return loader ? <h1>Loading..</h1> : <>{children}</>;
}
