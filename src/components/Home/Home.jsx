
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

import { RiChatDeleteFill } from "react-icons/ri";
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
export default function Home() {

async function onSubmitForm(values) {
  const form=new FormData();
  form.append("body", values.body)
  if(values?.image?.length>0){
    form.append("image",values.image[0]);
  }
 try {
  const {data}=await axios.post(`https://route-posts.routemisr.com/posts`,form,{
    headers:{
      Authorization: `Bearer ${localStorage.getItem("userToken")}` 
    }
  }

)
  refetch();
  toast.success('Post added...')
  return data
 } catch (error) {
  console.log(error)
  toast.error("Error occurred...")
 }finally{
  reset();
 }
}

const {register,handleSubmit,reset} =useForm({
  defaultValues:{
    body:'',
    image:null,
  },
shouldUnregister: true,
})


async function onSubmitComment(values,postId) {
  const content = values[`comment_${postId}`]?.trim(); 
  if (!content) return toast.error("Comment cannot be empty");

  try {
    const { data } = await axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
       { content },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

     reset({ [`comment_${postId}`]: "" }); 
    refetch();
    toast.success("Comment added...");
    return data
  } catch (error) {
    console.log(error.response?.data);
    toast.error("Error occurred...");
  }
}

 function getPosts(){
 return axios.get(`https://route-posts.routemisr.com/posts` , {
    headers: {
     Authorization: `Bearer ${localStorage.getItem("userToken")}` 
    }
  })
 }
 
 let {error,data,isError,isLoading,refetch}= useQuery({
  queryKey:["getPosts"],
  queryFn:getPosts,
  retry: 3
  })
 
 if(isError){
  return <h3>{error.message}</h3>
 }

 if(isLoading){
  return <span className="loader"></span>
 }


 
 async function deletePost(postId) {
  try {
    let {data}=await axios.delete(`https://route-posts.routemisr.com/posts/${postId}`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("userToken")}` 
      }
    })
    refetch();
    return data
  } catch (error) {
    console.log(error)
  }
  
 }
 console.log(data);
 return <>
 
 
 
 <form onSubmit={handleSubmit(onSubmitForm)}>
  <br /><br />
 
  <div className="bg-slate-400 px-7 py-7 rounded   flex flex-col w-1/2 mx-auto">
     <h2 className="text-white">Create Post</h2>
  <br />
    <input
    {...register('body')}
    className="rounded py-2 px-4 w-1/2" type="text" placeholder="Enter caption..." />
    <input 
    {...register('image')}
    className="rounded py-2 px-4 w-1/2 cursor-pointer" type="file" />
    <br />
    <button className="bg-slate-700 cursor-pointer w-1/5 mx-auto  text-white rounded py-2 px-4" type="submit">Post</button>
  </div>
 </form>
 
 
 
 <div>
  
  { (data?.data?.data?.posts || []).map((post)=>{
    return <div key={post._id} className= "bg-slate-400 w-3/4 mx-auto my-4 p-3 rounded text-white mb-5 ">
   <div className="flex justify-between">
      <div className="flex gap-3 items-center">
       <img className="size-10 rounded " src={post.user.photo} alt="" />
      <h4>{post.user.name}</h4>
    </div>
    <div>
      <RiChatDeleteFill className="text-2xl cursor-pointer " onClick={()=>{
deletePost(post._id)
      }} />
      </div> 
   </div>
     <span className="text-xs">{new Date(post.createdAt).toLocaleString()}</span>
      <Link to={`/postdetails/${post._id}`}>
      <h5 className="my-3">{post.body}</h5>
     {post.image && (
  <img className="size-3/4 rounded" src={post.image} alt="" />
)}

      </Link>
      <br />
<form
  onSubmit={handleSubmit((values) =>
    onSubmitComment(values, post._id)
  )}
  className="bg-slate-700 flex items-center gap-3 rounded px-4 py-3 max-w-3xl mx-auto"
>
  <input
   {...register(`comment_${post._id}`)}
    className="flex-1 rounded py-2 px-4 outline-none"
    type="text"
    placeholder="Enter Comment..."
  />

  <button type="submit" className="text-white text-lg">
    <i className="fa-solid fa-paper-plane"></i>
  </button>
</form>
   {post.topComment && (
  <div className="bg-slate-700 rounded ps-3 mt-1">
    <h5>{post.topComment?.commentCreator?.name}</h5>
    <h6>{post.topComment?.content}</h6>
    {post.topComment?.createdAt && (
      <span>{new Date(post.topComment?.createdAt).toLocaleString()}</span>
    )}
  </div>
)}

    </div>
    
  
  }) }
  </div>
 
 
 
 
 </>
}
