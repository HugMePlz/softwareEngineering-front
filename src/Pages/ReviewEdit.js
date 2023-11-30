import { useNavigate, useParams } from 'react-router-dom';
import styles from './ReviewEdit.module.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const ReviewEdit=()=>{
    const params=useParams();
    const reviewId=params.reviewId;

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

    const [reviewRating, setReviewRating]=useState("");
    const [comment, setComment]=useState("");

    const onSubmit=()=>{
        axios
        .put(`/api/reviews/${reviewId}`,{
            reviewRating: reviewRating,
            comment: comment
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
            },
        })
        .then((response)=>{
            if(response.status===200){
                alert("리뷰를 수정했습니다.");
                navigate("/my-page");
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return(
        <body className={styles.reviewEditBody}>
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

            <div className={styles.reviewEditBottom}>
                <div className={styles.reviewWrite}>
                    <div className={styles.starpointWrap}>
                        <div className={styles.starpointBox}>
                            <select onChange={(e)=>{setReviewRating(e.target.value)}}>
                                <option value="0">⚝</option>
                                <option value="1">⭐</option>
                                <option value="2">⭐⭐ </option>
                                <option value="3">⭐⭐⭐</option>
                                <option value="4">⭐⭐⭐⭐</option>
                                <option value="5">⭐⭐⭐⭐⭐</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" onClick={onSubmit}>등록</button>
                    <textarea onChange={(e)=>{setComment(e.target.value)}} placeholder='코멘트를 작성해보세요...'></textarea>
                </div>
            </div>
        </body>
    )
}

export default ReviewEdit;