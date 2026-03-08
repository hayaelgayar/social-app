
import axios from 'axios'
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';

 export default function Profile() {
 
let navigate=useNavigate();
   function getUserData(){
 return axios.get(`https://route-posts.routemisr.com/users/profile-data` , {
    headers: {
      token:localStorage.getItem("userToken")
    }
  })
  .then((res) => res.data.data.user);
  
 }
 let {error,data,isError,isLoading}= useQuery({
  queryKey:["getUserData"],
  queryFn:getUserData,
  retry: 3
  })
   const { data: posts = []} = useQuery({
  queryKey: ["userPosts"],
  queryFn: () =>
    axios
      .get(`https://route-posts.routemisr.com/users/${user._id}/posts`, {
        headers: {
          token: localStorage.getItem("userToken")
        }
      })
      .then(res => res.data.data.posts), // this returns the array of posts
  retry: 3
});

 
 if(isError){
  return <h3>{error.message}</h3>
 }

 if(isLoading){
  return <span className="loader"></span>
 }
  
 
const user = data;
  //==if(!user)return <p>loading...</p>


 

  return <>
  <div className="min-h-screen bg-gray-100">

      {/* Cover Section */}
      <div className="h-60 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
        <img
          src={user?.photo}
          alt={user?.name}
          className="w-40 h-40 rounded-full border-4 border-white absolute left-1/2 -bottom-20 transform -translate-x-1/2 shadow-lg"
        />
      </div>

      {/* Profile Info */}
      <div className="mt-24 text-center px-4">
        <h1 className="text-2xl font-bold">{user?.name}</h1>
        <p className="text-gray-500">{user?.email}</p>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
Date of Birth: <br />{new Date (user?.dateOfBirth).toLocaleDateString()}
        </p>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
Member Since: <br />{new Date(user?.createdAt).toLocaleString()}
        </p>


        <button onClick={()=>{navigate("/change-password")}} className="mt-6 bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white px-6 py-2 rounded-lg transition">
          Change password
        </button>
      </div>

      {/* Posts Grid (fix when new api is available)*/}
      <div className="mt-12 px-6 md:px-20 pb-16">
        <h2 className="text-xl font-semibold mb-6">User Posts</h2>

       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {(posts || []).map((post) => (
    <div
      key={post._id}
      className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
    >
      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <p className="text-gray-600 text-sm">{post.body}</p>
        <span className="text-xs text-gray-400">
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  ))}
</div>
      </div>

    </div>
  </>
}
