import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Addblog from './components/Addblog';
import ProtectedRoute from './components/Protectedroute';
import BlogDetails from "./components/BlogDetails";
import Comments from './components/Comments';
import Dashboard from './components/Dashboard';
import MyBlogs from './components/MyBlogs';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingChat from "./components/FloatingChat";
import Chat from "./components/Chat";
import {Routes,Route} from 'react-router-dom';
import {useState} from 'react';
function App() {
  const [login,setlogin] = useState(false);
  const setLogin=()=>{
    setlogin(true);
  }
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login value={setLogin}/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path='/addblog' element={
          <ProtectedRoute value={login}>
              <Addblog/>
          </ProtectedRoute> }></Route>
          <Route path='/blog/:blogId/addcomment' element={
          <ProtectedRoute value={login}>
              <Comments/>
          </ProtectedRoute> }></Route>
          <Route path='/dashboard' element={
          <ProtectedRoute value={login}>
              <Dashboard/>
          </ProtectedRoute> }></Route>
          <Route path='/myblog' element={
          <ProtectedRoute value={login}>
              <MyBlogs/>
          </ProtectedRoute> }></Route>
          <Route path="/chat" element={<ProtectedRoute value={login}>
      <Chat />
    </ProtectedRoute>
  }
/>

        <Route path='/logout' ></Route>
      </Routes>
        <FloatingChat />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
