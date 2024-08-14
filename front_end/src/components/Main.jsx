import { useEffect } from "react";
import Panel from "./Panel";
import { useAuth } from "./AuthProvider";
import Header1 from "./Header1";
import Header from "./Header";


const Main = () => {

  const { isLoggedIn, userId} = useAuth();

    return(
        <>
          
        </>
    );
}

export default Main;