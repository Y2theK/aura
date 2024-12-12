import { getCurrentUser } from "@/libs/appwrite";
import { useState, createContext, useContext,useEffect } from "react";

const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {

    const [isLoggin,setIsLoggin] = useState(false);
    const [user,setUser] = useState(null);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(() => {
    
        getCurrentUser()
            .then((res) => {
                if(res){
                    setIsLoggin(true);
                    setUser(res);
                }else{
                    setIsLoggin(false);
                    setUser(null);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    
    },[])

    return (
        <GlobalContext.Provider
        value={{ 
            isLoggin,
            setIsLoggin,
            user,
            setUser,
            isLoading
         }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;
