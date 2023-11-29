import './App.css';
import Login from './Pages/Login';
import Join from './Pages/Join';
import Home from './Pages/Home';
import Community from './Pages/Community';
import UserSearch from './Pages/UserSearch';
import MovieInformation from './Pages/MovieInformation';
import MyPage from './Pages/MyPage';
import Userpage from './Pages/UserPage';
import Main from './Pages/Main';
import { Routes, Route } from 'react-router-dom';
import MovieSearch from './Pages/MovieSearch';
import Filmography from './Pages/Filmography';
import Genre from './Pages/Genre';
import MyPageEdit from './Pages/MyPageEdit';
import ReviewEdit from './Pages/ReviewEdit';
import Subscribe from './Pages/Subscribe';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/join" element={<Join/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="/movie-information/:movieId" element={<MovieInformation/>}/>
        <Route path="/filmography/:personId" element={<Filmography/>}/>
        <Route path="/genre/:genre" element={<Genre/>}/>
        <Route path="/movie-search" element={<MovieSearch/>}/>
        <Route path="/my-page" element={<MyPage/>}/>
        <Route path="/my-page-edit" element={<MyPageEdit/>}/>
        <Route path="/review-edit/:reviewId" element={<ReviewEdit/>}/>
        <Route path="/community" element={<Community/>}/>
        <Route path="/subsribe" element={<Subscribe/>}/>
        <Route path="/user-page/:userId" element={<Userpage/>}/>
        <Route path="/user-search" element={<UserSearch/>}/>
      </Routes>
    </div>
  );
}

export default App;