import styles from './MyPage.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPage=()=>{
    const navigate=useNavigate();
    const goToMain=()=>{
        navigate("/main");
    }
    const goToUserSearch=()=>{
        navigate("/user-search");
    }
    const goToMyPageEdit=()=>{
        navigate("/my-page-edit");
    }
    const logout=()=>{
        localStorage.removeItem('authorization');
        alert("로그아웃 성공");
        navigate("/");
    }

    const [memberId, setMemberId]=useState("")
    const [profilePath, setProfilePath]=useState("");
    const [name, setName]=useState("");
    const [nickname, setNickname]=useState("");
    const [userId, setUserId]=useState("");
    const [mbti, setMbti]=useState("");
    const [genres, setGenres]=useState("");

    const [reviewId, setReviewId]=useState([]);
    const [reviewMovieId, setReviewMovieId]=useState([]);
    const [reviewMovieTitle, setReviewMovieTitle]=useState([]);
    const [reviewRating, setReviewRating]=useState([]);
    const [reviewComment, setReviewComment]=useState([]);

    const [bookmarkMovieId, setBookmarkMovieId]=useState([]);
    const [bookmarkPoster, setBookmarkPoster]=useState([]);
    const [bookmarkTitle, setBookmarkTitle]=useState([]);

    useEffect(()=>{
        axios
        .get("/api/members", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
            },
        })
        .then((response)=>{
            if(response.status===200){
                setMemberId(response.data.data.id);
                setProfilePath(response.data.data.profilePath);
                setName(response.data.data.name);
                setNickname(response.data.data.nickname);
                setUserId(response.data.data.userId);
                setMbti(response.data.data.mbti);
            }
        })
        .catch((error)=>{
            if(error.response.status===403){
                alert("403");
                localStorage.removeItem('authorization');
                return navigate("/login");
            }
        })

        axios
        .get("/api/preferred-genres",{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
            },
        })
        .then((response)=>{
            if(response.status===200){
                setGenres(response.data.data);
            }
        })
        .catch((error)=>{
            console.log(error);
        })

        axios
        .get(`/api/reviews/memberall/${memberId}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
            },
        })
        .then((response)=>{
            if(response.status===200){
                let id=[];
                let movieid=[];
                let title=[];
                let rating=[];
                let comment=[];
                for(let i=0;i<response.data.data.length;i++){
                    id.push(response.data.data[i].id);
                    movieid.push(response.data.data[i].movieid);
                    title.push(response.data.data[i].movieName);
                    rating.push(response.data.data[i].reviewRating);
                    comment.push(response.data.data[i].comment);
                }
                setReviewId(id);
                setReviewMovieId(movieid);
                setReviewMovieTitle(title);
                setReviewRating(rating);
                setReviewComment(comment);
            }
        })
        .catch((error)=>{
            console.log(error);
        })

        axios
        .get("/api/bookmark/bookmarks",{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
            },
        })
        .then((response)=>{
            if(response.status===200){
                let id=[];
                let poster=[];
                let title=[];
                for(let i=0;i<response.data.data.length;i++){
                    id.push(response.data.data[i].id);
                    poster.push(response.data.data[i].posterPath);
                    title.push(response.data.data[i].title);
                }
                setBookmarkMovieId(id);
                setBookmarkPoster(poster);
                setBookmarkTitle(title);
            }
        })
        .catch((error)=>{
            console.log(error);
        })  
    },[memberId]);

    const displayProfileImg=()=>{
        if(profilePath==="1"){
            return <img id="profile-img" class="img" src={`${process.env.PUBLIC_URL}/img/profile/profile1.jpg`}></img>
        }
        else if(profilePath==="2"){
            return <img id="profile-img" class="img" src={`${process.env.PUBLIC_URL}/img/profile/profile2.jpg`}></img>
        }
        else if(profilePath==="3"){
            return <img id="profile-img" class="img" src={`${process.env.PUBLIC_URL}/img/profile/profile3.jpg`}></img>
        }
        else if(profilePath==="4"){
            return <img id="profile-img" class="img" src={`${process.env.PUBLIC_URL}/img/profile/profile4.jpg`}></img>
        }
        else if(profilePath==="5"){
            return <img id="profile-img" class="img" src={`${process.env.PUBLIC_URL}/img/profile/profile5.jpg`}></img>
        }
        else{
            return <img id="profile-img" class="img" src={`${process.env.PUBLIC_URL}/img/baseprofile.jpg`}></img>
        }
    }

    const displayMbti=()=>{
        if(mbti===null){
            return "MBTI를 설정해주세요.";
        }
        else{
            return mbti;
        }
    }
    
    const displayGenres=()=>{
        if(genres.length===0){
            return "선호 장르 해시태그를 설정해주세요."
        }
        else{
            const displayGenresData=[];
            for(let i=0;i<genres.length;i++){
                displayGenresData.push(
                    <button id='content'
                        onClick={(e)=>{navigate(`/genre/${genres[i]}`)}}
                    >{genres[i]}</button>
                )
            }
            return displayGenresData;
        }
    }

    const displayReviewRating=(movieRating)=>{
        if(movieRating===0){
            return "☆☆☆☆☆";
        }
        else if(movieRating===1){
            return "★☆☆☆☆";
        }
        else if(movieRating===2){
            return "★★☆☆☆";
        }
        else if(movieRating===3){
            return "★★★☆☆";
        }
        else if(movieRating===4){
            return "★★★★☆";
        }
        else if(movieRating===5){
            return "★★★★★";
        }
    }

    const displayReviewData=()=>{
        const displayReviewDataArr=[];
        if(reviewId.length===0){
            displayReviewDataArr.push(
                <h3 className={styles.movielike}>재밌게 본 영화에 리뷰를 달아보세요.</h3>
            );
        }
        else{
            for(let i=0;i<reviewId.length;i++){
                displayReviewDataArr.push(
                    <div class={styles.review}>
                        <button id="revisebtn" onClick={(e)=>navigate(`/review-edit/${reviewId[i]}`)}>수정</button>
                        <button id="deletebtn" onClick={(e)=>deleteReveiw(`${reviewId[i]}`)}>삭제</button>
                        <p onClick={(e)=>{navigate(`/movie-information/${reviewMovieId[i]}`)}}>{reviewMovieTitle[i]}</p>
                        <p>{displayReviewRating(reviewRating[i])}</p>
                        <p>{reviewComment[i]}</p>
                    </div>
                )
            }
        }
        return displayReviewDataArr;
    }

    const deleteReveiw=(rid)=>{
        axios
        .delete(`/api/reviews/${rid}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
            },
        })
        .then((response)=>{
            if(response.status===200){
                alert("리뷰를 삭제했습니다.");
                window.location.reload();
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const displayBookmarkData=()=>{
        const displayBookmarkDataArr=[];
        if(bookmarkPoster.length===0){
            displayBookmarkDataArr.push(
                <h3 className={styles.movielike}>마음에 드는 영화를 찜해보세요.</h3>
            )
        }
        else{
            for(let i=0;i<bookmarkPoster.length;i++){
                displayBookmarkDataArr.push(
                    <div className={styles.movieComponent}>
                        <img
                            className={styles.moviePoster}
                            src={bookmarkPoster[i]}
                            onClick={(e)=>{navigate(`/movie-information/${bookmarkMovieId[i]}`)}}
                        ></img>
                        <h3 className={styles.movieTitle}>{bookmarkTitle[i]}</h3>
                    </div>
                )
            }
        }
        return displayBookmarkDataArr;
    }

    return(
        <body class={styles.myPageBody}>
            <div className={styles.mainLogo}>
                <img src='img/main_logo.PNG' onClick={goToMain} alt='로고 이미지'></img>
            </div>
                
            <div className={styles.searchMovie}>
                <button onClick={goToUserSearch}>
                    <img src='img/search.png'/>
                </button>
            </div>
            <div className={styles.buttonLogout}>
                <button onClick={logout}>로그아웃</button>
            </div>

            <div className={styles.myPageBottom}>
                <table>
                    <tr>
                        <td colspan="2" align="center">
                            <div className={styles.imgContainer}>
                                {displayProfileImg()}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" align="center" className={styles.myname}><h2>{name}</h2></td>
                    </tr>
                    <tr>
                        <td className={styles.label}><p id="nickname_label">닉네임</p></td>
                        <td className={styles.value1}><p id="nickname_value">{nickname}</p></td>
                    </tr>
                    <tr>
                        <td className={styles.label}><p id="id_label">아이디</p></td>
                        <td className={styles.value1}><p id="id_value">@{userId}</p></td>
                    </tr>
                    <tr>
                        <td className={styles.label}><p id="MBTI_label">MBTI</p></td>
                        <td className={styles.value5}><p id="MBTI_value">{displayMbti()}</p></td>
                    </tr>
                    <tr>
                        <td className={styles.label}><p id="genre_label">#선호장르</p></td>
                        <td className={styles.value5}><p id="MBTI_value">{displayGenres()}</p></td>
                    </tr>
                    <tr>
                        <td className={styles.editButtonContainer} colspan="2" align="center"><button id='edit-btn' onClick={goToMyPageEdit}>변경</button></td>
                    </tr>
                </table>
                <h2>내가 쓴 리뷰</h2>
                <div class={styles.myReview}>
                    <div class={styles.reviewSpace}>
                        {displayReviewData()}
                    </div>
                </div>
                <h2 >내가 찜한 영화</h2>
                <div class={styles.savedMovie}>
                    {displayBookmarkData()}
                </div>
            </div>
        </body>
    );
};

export default MyPage;