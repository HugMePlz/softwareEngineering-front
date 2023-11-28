import styles from './UserSearch.module.css';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const UserSearch=()=>{
    const navigate = useNavigate();
    const goToMain=()=>{
        navigate("/main");
    }
    const logout=()=>{
        localStorage.removeItem('authorization');
        alert("로그아웃 성공");
        navigate("/");
    }

    const [searchType, setSearchType] = useState("userId");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const onSearchSubmit = (event) => {
        event.preventDefault();
        if (!searchKeyword) { 
            alert("검색 키워드를 입력하세요.");
            setSearchResults([]);
            return;
        }
        axios
            .get(`/api/members/search/${searchType}?${searchType}=${searchKeyword}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    const searchResults = response.data.data;
                    if (!searchResults || searchResults.length === 0) {
                        alert("일치하는 사용자 아이디 또는 닉네임이 존재하지 않습니다.");
                        setSearchKeyword("");
                        setSearchResults([]);
                    } else {
                        setSearchResults(searchResults);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                if(error.response.status===400){
                    alert("일치하는 사용자 아이디 또는 닉네임이 존재하지 않습니다.");
                    setSearchKeyword("");
                    setSearchResults([]);
                  }
            });
    };

    const displayProfileImg=(item)=>{
        if(item.profilePath==="1"){
            return <img src={`${process.env.PUBLIC_URL}/img/profile/profile1.jpg`} id="profile" alt="프로필 사진" onClick={(e) => navigate(`/user-page/${item.userId}`)}></img>
        }
        else if(item.profilePath==="2"){
            return <img src={`${process.env.PUBLIC_URL}/img/profile/profile2.jpg`} id="profile" alt="프로필 사진" onClick={(e) => navigate(`/user-page/${item.userId}`)}></img>
        }
        else if(item.profilePath==="3"){
            return <img src={`${process.env.PUBLIC_URL}/img/profile/profile3.jpg`} id="profile" alt="프로필 사진" onClick={(e) => navigate(`/user-page/${item.userId}`)}></img>
        }
        else if(item.profilePath==="4"){
            return <img src={`${process.env.PUBLIC_URL}/img/profile/profile4.jpg`} id="profile" alt="프로필 사진" onClick={(e) => navigate(`/user-page/${item.userId}`)}></img>
        }
        else if(item.profilePath==="5"){
            return <img src={`${process.env.PUBLIC_URL}/img/profile/profile5.jpg`} id="profile" alt="프로필 사진" onClick={(e) => navigate(`/user-page/${item.userId}`)}></img>
        }
        else{
            return <img src="img/baseprofile.jpg" id="profile" alt="프로필 사진" onClick={(e) => navigate(`/user-page/${item.userId}`)}></img>
        }
    }
    
    const displaySearchResults = () => {
        if (!searchResults || Object.keys(searchResults).length === 0) {
            return null; 
        }
        if (Array.isArray(searchResults)) {
            return searchResults.map((result) => (
                <div className={styles.user} key={result.userId}>
                    {displayProfileImg(result)}
                    <div className={styles.userInformation}>
                        <h3 id="user_nickname">{result.nickname}</h3>
                        <h3 id="user_id">@{result.userId}</h3>
                    </div>
                </div>
            ));
        } else {
            return (
                <div className={styles.user} key={searchResults.userId}>
                    {displayProfileImg(searchResults)}
                    <div className={styles.userInformation}>
                        <h3 id="user_nickname">{searchResults.nickname}</h3>
                        <h3 id="user_id">@{searchResults.userId}</h3>
                    </div>
                </div>
            );
        }
    };
    

    return(
        <body className={styles.userSearchBody}>

            <div className={styles.mainLogo}>
                <img src='img/main_logo.PNG' onClick={goToMain} alt='로고 이미지'></img>
            </div>

            <div className={styles.searchBox}>
                <form onSubmit={onSearchSubmit}>
                    <select onChange={(e)=>{setSearchType(e.target.value)}} name="movie_search" className={styles.searchBox1}>
                        <option value="userId">아이디</option>
                        <option value="nickname">닉네임</option>
                    </select>
                    <input onChange={(e)=>{setSearchKeyword(e.target.value)}} type="text" className={styles.searchBox2} placeholder="키워드를 입력하세요..." ></input>
                    <button className={styles.searchBox3} type="submit" ><img src='img/search_icon2.png'/></button>
                </form>
            </div>
            <div className={styles.buttonLogout}>
                <button onClick={logout}>로그아웃</button>
            </div>

            <div className={styles.userSearchBottom}>
                <h2>사용자 검색 결과</h2>
                <div className={styles.searchUserContainer}>
                    {displaySearchResults()}
                </div>
            </div>
        </body>
    );
};

export default UserSearch;