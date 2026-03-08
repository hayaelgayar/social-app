import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from "./components/Layout/Layout"
import Home from "./components/Home/Home"
import Profile from "./components/Profile/Profile"
import PostDetails from "./components/PostDetails/PostDetails"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import NotFound from "./components/NotFound/NotFound"
import { ContextDataProvider } from './Context/Context'
import ProtectedRoute from './components/protectedRoute/protectedRoute'
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from "./../node_modules/@tanstack/react-query-devtools/src/index"
import { Toaster } from 'react-hot-toast'
import ChangePassword from './components/ChangePassword/ChangePassword'
let query=new QueryClient()

let x=createBrowserRouter([
{ path:"",element: <Layout/>, children:  
 [   {index: true, element:<ProtectedRoute><Home /> </ProtectedRoute>}, 
  {
  path:"home" , element: <ProtectedRoute><Home/></ProtectedRoute>},
  {path:"profile" , element: <ProtectedRoute><Profile/></ProtectedRoute>},
  {path:"change-password" , element: <ProtectedRoute><ChangePassword/></ProtectedRoute>},
  {path:"postdetails/:id" , element: <ProtectedRoute><PostDetails/></ProtectedRoute>},
  {path:"login" , element:<Login/>},
  {path:"register" , element:<Register/>},
  {path:"*" , element:<NotFound/>}]
}

])
function App() {

  return (
    <>
    <ContextDataProvider>
     <QueryClientProvider  client={query}>

       <RouterProvider router={x}></RouterProvider>
       <Toaster/>
       <ReactQueryDevtools/>
     </QueryClientProvider>
       
    
      
    </ContextDataProvider>
  
    </>
  )
}

export default App
