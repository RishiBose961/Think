import { useContext, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';
import Navpre from './components/Navlinks/Navpre';
import Post from './components/posts/Post';
import LoginRegister from './Layout/LoginRegister';
import Favorite from './components/Fav/Favorite';
import Search from './components/Search/Search';
import Info from './components/Info/Info';
import PostPage from './components/Page/PostPage';
import TreandingPost from './components/GallerySearch/TreandingPost';
import SearchUser from './components/Info/SearchUser';




function App() {
  const { dispatch, token, isLoggedIn } = useContext(AuthContext)

 
  //get ac token
  useEffect(() => {
    const _appSignging = localStorage.getItem("_appSignging");
    if (_appSignging) {
      const getToken = async () => {
        const res = await axios.post("/api/auth/access", null);
        dispatch({ type: "GET_TOKEN", payload: res.data.ac_token });
      };
      getToken();
    }
  }, [dispatch, isLoggedIn]);

  //get user data

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        dispatch({ type: "SIGNING" });
        const res = await axios.get("api/auth/user", {
          headers: { Authorization: token },
        });
        dispatch({ type: "GET_USER", payload: res.data });
      };
      getUser();
    }
  }, [dispatch, token])

  return (
    <div className='container mx-auto'>
      <BrowserRouter>
        <Header />
        <Navpre/>
        <Routes>
          <Route path='/' element={<Home />} />
        <Route path='/posts' element={isLoggedIn === true ? <Post/>:<LoginRegister/>} />
          <Route path='/fav' element={isLoggedIn === true ? <Favorite />:<LoginRegister/>} />
          <Route path='/search' element={isLoggedIn === true ? <Search />:<LoginRegister/>} />
          <Route path='/trending' element={<TreandingPost />} />
          <Route path='/personal' element={isLoggedIn === true ? <Info />:<LoginRegister/>} />
          <Route path='/postview/:id' element={isLoggedIn === true ? <PostPage />:<LoginRegister/>} />
          <Route path='/usersearch/:id' element={isLoggedIn === true ? <SearchUser />:<LoginRegister/>} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
