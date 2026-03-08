import { createContext } from "react";
import axios from "axios";
export let PostContext=createContext();
export function PostContextProvider(props){

async function getAllPosts(){
    try {
        const res = await axios.get(`https://linked-posts.routemisr.com/posts?limit=50`,{
        headers:{
            token: localStorage.getItem("userToken")
        }
        
    })
    console.log(res);
    } catch (error) {
        console.log(error);
        
    }
}

    return <PostContext.Provider value={{ getAllPosts}}>
            {props.children}

    </PostContext.Provider>
}