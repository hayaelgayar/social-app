
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from "axios"
import { TbArrowBackUp } from "react-icons/tb";
export default function PostDetails() {
  let {id}= useParams()
   let navigate=useNavigate();


   function getComments(){
     return axios.get(`https://route-posts.routemisr.com/posts/${id}/comments?page=1&limit=10`,
    {
      headers:{
        token: localStorage.getItem("userToken")
      }
    }
  )
   }
    
function getSinglePost(){
  return axios.get(`https://route-posts.routemisr.com/posts/${id}`,
    {
      headers:{
        token: localStorage.getItem("userToken")
      }
    }
  )
}

 // COMMENTS QUERY
let {
  data: commentsData,
  isError: commentsIsError,
  isLoading: commentsLoading
} = useQuery({
  queryKey: ["comments", id],
  queryFn: getComments
});

// SINGLE POST QUERY
let {
  data: postData,
  isError: postIsError,
  isLoading: postLoading
} = useQuery({
  queryKey: ["singlePost", id],
  queryFn: getSinglePost
});

 if (postIsError || commentsIsError) {
  return <h3>Error loading data</h3>;
}

if (postLoading || commentsLoading) {
  return <span className="loader"></span>;
}

let post=postData?.data?.data?.post;
let comments = commentsData?.data?.data?.comments;
  return <>
  <div key={post.id} className= "bg-slate-400 w-3/4 mx-auto my-4 p-3 rounded text-white mb-5 ">
     
     <TbArrowBackUp className='text-2xl cursor-pointer' onClick={()=>{
      navigate("/home")
     }} />
     <br />
     <div className="flex gap-3 items-center">
       <img className="size-10 rounded " src={post.user?.photo} alt="" />
      <h4>{post.user?.name}</h4>
     </div>
     <span className="text-xs">{new Date(post.createdAt).toLocaleString()}</span>
      <h5 className="my-3">{post.body}</h5>
      <img className="size-3/4 rounded" src={post.image} alt="" />

    {comments?.map((comment)=>{
      return <div key={comment._id} className="bg-slate-700 rounded ps-3 mt-1">
      <h5>{comment?.commentCreator?.name}</h5>
      <h6>{comment?.content}</h6>
      <span>{comment?.createdAt && (
  <span>{new Date(comment.createdAt).toLocaleString()}</span>
)}</span>
      
      </div>  
    })}
    </div>
  </>
}
