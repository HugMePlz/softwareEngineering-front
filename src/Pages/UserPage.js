import { useEffect, useState } from 'react';
import styles from './UserPage.module.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Userpage=()=>{
  const params=useParams();
  const userId=params.userId;

  const navigate=useNavigate();
  const goToMain=()=>{
    navigate("/main");
  }
  const goToUserSearch=()=>{
    navigate("/user-search");
  }
  const logout=()=>{
    localStorage.removeItem('authorization');
    alert("로그아웃 성공");
    navigate("/");
  }

  const [profilePath, setProfilePath]=useState("")
  const [memberId, setMemberId]=useState("");
  const [nickname, setNickname]=useState("");

  const [follow, setFollow]=useState(false);

  const [reviewMovieId, setReviewMovieId]=useState([]);
  const [reviewMovieTitle, setReviewMovieTitle]=useState([]);
  const [reviewRating, setReviewRating]=useState([]);
  const [reviewComment, setReviewComment]=useState([]);

  useEffect(()=>{
    axios
    .get(`/api/members/search/userId?userId=${userId}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
        },
    })
    .then((response)=>{
        setProfilePath(response.data.data.profilePath);
        setMemberId(response.data.data.id);
        setNickname(response.data.data.nickname);
    })
    .catch((error)=>{
        console.log(error);
    })
  },[userId]);

  useEffect(()=>{
    axios
    .get(`/api/reviews/memberall/${memberId}`,{
        headers: {
              Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
        },
    })
    .then((response)=>{
        if(response.status===200){
                let movieid=[];
                let title=[];
                let rating=[];
                let comment=[];
                for(let i=0;i<response.data.data.length;i++){
                    movieid.push(response.data.data[i].movieid);
                    title.push(response.data.data[i].movieName);
                    rating.push(response.data.data[i].reviewRating);
                    comment.push(response.data.data[i].comment);
                }
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
    .get(`/api/follow/status/${memberId}`,{
        headers: {
              Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
        },
    })
    .then((response)=>{
        if(response.status===200){
            setFollow(response.data.data);
        }
    })
    .catch((error)=>{
        console.log(error);
    })
  },[memberId]);

  const handleSubscribeButton=()=>{
    if(follow===false){
      return(
        <button id='sub-btn' onClick={followButton}>구독</button>
      )
    }
    else{
      return(
        <button id='sub-btn' onClick={unfollowButton}>구독 중</button>
      )
    }
  }

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

  const followButton=()=>{
    axios
    .post(`/api/follow/${memberId}`,{},{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
      },
    })
    .then((response)=>{
      if(response.status===200){
        alert(`@${nickname}님을 구독했습니다.`);
        window.location.reload();
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  
  const unfollowButton=()=>{
    axios
    .delete(`/api/follow/${memberId}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
      },
    })
    .then((response)=>{
      if(response.status===200){
        alert(`@${nickname}님을 구독 취소했습니다.`);
        window.location.reload();
      }
    })
    .catch((error)=>{
      console.log(error);
    })
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
    if(reviewMovieTitle.length===0){
        displayReviewDataArr.push(
            <h3 className={styles.notice}>작성한 리뷰가 존재하지 않습니다.</h3>
        );
    }
    else{
        for(let i=0;i<reviewMovieTitle.length;i++){
            displayReviewDataArr.push(
                <div class={styles.review}>
                    <p onClick={(e)=>{navigate(`/movie-information/${reviewMovieId[i]}`)}}>{reviewMovieTitle[i]}</p>
                    <p>{displayReviewRating(reviewRating[i])}</p>
                    <p>{reviewComment[i]}</p>
                </div>
            )
        }
    }
    return displayReviewDataArr;
  }

  return (
    <body className={styles.userPageBody}>
      <div className={styles.mainLogo}>
        <img src={`${process.env.PUBLIC_URL}/img/main_logo.PNG`} onClick={goToMain} alt='로고 이미지'></img>
      </div>
              
      <div className={styles.searchMovie}>
        <button onClick={goToUserSearch}>
          <img src={`${process.env.PUBLIC_URL}/img/search.png`}/>
        </button>
      </div>
      <div className={styles.buttonLogout}>
        <button onClick={logout}>로그아웃</button>
      </div>

      <div className={styles.userPageBottom}>
        <table>
          <tr>
            <td colspan="2" align="center">
              <div className={styles.imgContainer}>
                {displayProfileImg()}
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2" align="center">
              <div className={styles.subscribeButtonContainer}>
                {handleSubscribeButton()}
              </div>
            </td>
          </tr>
          <tr>
            <td className={styles.label}><p id="nickname_label">닉네임</p></td>
            <td className={styles.value}><p id="nickname_value">{nickname}</p></td>
          </tr>
          <tr>
            <td className={styles.label}><p id="id_label">아이디</p></td>
            <td className={styles.value}><p id="id_value">@{userId}</p></td>
          </tr>
        </table>

        <h2>{nickname}님이 작성한 리뷰</h2>
        <div className={styles.userReview}>
          <div className={styles.reviewSpace}>
            {displayReviewData()}
          </div>
        </div>
      </div>
    </body>
  );
};
  
export default Userpage;