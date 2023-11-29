import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieInformation.module.css';
import { useEffect, useState } from 'react';


const MovieInformation=()=>{
    const navigate=useNavigate();
    const goToMain=()=>{
        navigate("/main");
    }
    const goToMovieSearch=()=>{
        navigate("/movie-search");
    }
    const logout=()=>{
        localStorage.removeItem('authorization');
        alert("로그아웃 성공");
        navigate("/");
    }

    const params=useParams();
    const movieId=params.movieId;

    const [id, setId]=useState("");
    const [moviePosterPath, setMoviePosterPath]=useState("");
    const [movieTitle, setMovieTitle]=useState("");
    const [movieReleaseDate, setMovieReleaseDate]=useState("");
    const [movieDirectorId, setMovieDirectorId]=useState("");
    const [movieDirectorName, setMovieDirectorName]=useState("");
    const [movieActorId, setMovieActorId]=useState([]);
    const [movieActorName, setMovieActorName]=useState([]);
    const [movieGenre, setMovieGenre]=useState([]);
    const [movieRating, setMovieRating]=useState("");
    const [movieOverview, setMovieOverview]=useState("");
    const [movieTrailerPath, setMovieTrailerPath]=useState("");
    const [movieReviewWriter, setMovieReviewWriter]=useState([]);
    const [movieReviewRating, setMovieReviewRating]=useState([]);
    const [movieReviewComment, setMovieReviewComment]=useState([]);

    //리뷰쓰기
    const [reviewRating, setReviewRating]=useState("");
    const [comment, setComment]=useState("");

    const [bookmark, setBookmark]=useState();

    useEffect(()=>{
        axios
        .get(`/api/movies/${movieId}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
            },
        })
        .then((response)=>{
            if(response.status=200){
                setId(response.data.data.id);
                setMoviePosterPath(response.data.data.posterPath);
                setMovieTitle(response.data.data.title);
                setMovieReleaseDate(response.data.data.releaseDate);
                setMovieDirectorId(response.data.data.director.tmdbId);
                setMovieDirectorName(response.data.data.director.name);
                let actorId=[];
                let actorName=[];
                for(let i=0;i<5;i++){
                   actorId.push(response.data.data.actors[i].tmdbId);
                   actorName.push(response.data.data.actors[i].name);
                }
                setMovieActorId(actorId);
                setMovieActorName(actorName);
                let genre=[];
                for(let i=0;i<response.data.data.genres.length;i++){
                    genre.push(response.data.data.genres[i].genre);
                }
                setMovieGenre(genre);
                setMovieRating(response.data.data.rating);
                setMovieOverview(response.data.data.overview);
                let trailerPath=response.data.data.trailerPath.replace("watch?v=","v/");
                setMovieTrailerPath(trailerPath);
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }, [movieId]);

    useEffect(()=>{
        axios
        .get(`/api/reviews/movieall/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
            },
        })
        .then((response)=>{
            let userId=[];
            let reviewRating=[];
            let comment=[];
            for(let i=0;i<response.data.data.length;i++){
                userId.push(response.data.data[i].userid);
                reviewRating.push(response.data.data[i].reviewRating);
                comment.push(response.data.data[i].comment);
            }
            setMovieReviewWriter(userId);
            setMovieReviewRating(reviewRating);
            setMovieReviewComment(comment);
        })
        .catch((error)=>{
            console.log(error);
        })
    }, [id])

    useEffect(()=>{
        axios
        .get(`/api/bookmark/status/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
            },
        })
        .then((response)=>{
            setBookmark(response.data.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[id]);
    
    const displayMovieDirector=()=>{
        return(
            <button id="content"
                onClick={(e)=>{navigate(`/filmography/${movieDirectorId}`)}}
            >{movieDirectorName}</button>
        )
    }

    const displayMovieActor=()=>{
        const displayMovieActorData=[];
        for(let i=0;i<5;i++){
            displayMovieActorData.push(
                <button id='content'
                    onClick={(e)=>{navigate(`/filmography/${movieActorId[i]}`)}}
                >{movieActorName[i]}</button>
            )
        }
        return displayMovieActorData;
    }

    const displayMovieGenre=()=>{
        const displayMovieGenreData=[];
        for(let i=0;i<movieGenre.length;i++){
            displayMovieGenreData.push(
                <button id='content'
                    onClick={(e)=>{navigate(`/genre/${movieGenre[i]}`)}}
                >{movieGenre[i]}</button>
            )
        }
        return displayMovieGenreData;
    }

    const onSubmit=()=>{
        if(comment.length>100){
            alert('코멘트의 글자 수가 초과되었습니다. 100자 이내로 코멘트를 작성해보세요.');
        }
        else{
            axios
            .post(`/api/reviews/${id}`,{
                reviewRating: reviewRating,
                comment: comment
            },{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
                },
            })
            .then((response)=>{
                if(response.status===200){
                    alert("리뷰 작성에 성공했습니다.");
                    window.location.reload();
                }
            })
            .catch((error)=>{
                console.log(error);
            })
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
        if(movieReviewWriter.length===0){
            displayReviewDataArr.push(
                <div className={styles.firstreview}>
                    <h2>첫 리뷰를 달아보세요.</h2>
                </div>
            )
        }
        else{
            for(let i=0;i<movieReviewWriter.length;i++){
                displayReviewDataArr.push(
                    <div className={styles.aReview}>
                        <p className={styles.aReviewWriterId} onClick={(e) => navigate(`/user-page/${movieReviewWriter[i]}`)}>@{movieReviewWriter[i]}</p>
                        <p className={styles.aReviewRating}>{displayReviewRating(movieReviewRating[i])}</p>
                        <p className={styles.aReviewComment}>{movieReviewComment[i]}</p>
                    </div>
                )
            }
        }
        return displayReviewDataArr;
    }

    const handleBookmark=()=>{
        if(bookmark===true){
            axios
            .delete(`/api/bookmark/${id}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
                },
            })
            .then((response)=>{
                if(response.status===200){
                    alert("북마크를 삭제했습니다.");
                    window.location.reload();
                }
            })
            .catch((error)=>{
                console.log(error);
            })
        }
        else{
            axios
            .post(`/api/bookmark/${id}`,{},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
                },
            })
            .then((response)=>{
                if(response.status===200){
                    alert("북마크 성공!! 마이페이지에서 찜한 영화들을 확인해보세요.");
                    window.location.reload();
                }
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }

    return(
        <body className={styles.movieInformationBody}>
        
            <div className={styles.mainLogo}>
                <img src={`${process.env.PUBLIC_URL}/img/main_logo.PNG`} onClick={goToMain} alt='로고 이미지'></img>
            </div>
                
            <div className={styles.searchMovie}>
                <button onClick={goToMovieSearch}>
                    <img src={`${process.env.PUBLIC_URL}/img/search.png`}/>
                </button>
            </div>
            <div className={styles.buttonLogout}>
                <button onClick={logout}>로그아웃</button>
            </div>

            <div className={styles.movieInformationBottom}>
                <div className={styles.poster}>
                    <img src={moviePosterPath} alt="영화 포스터 이미지"></img>
                </div>
                <div className={styles.information}>
                    <h1 id="title">{movieTitle}</h1>
                    <div className={styles.heart}>
                        
                            <input type='checkbox' className={styles.heart_checkbox} checked={bookmark} onClick={handleBookmark}></input>
                        
                    </div>
                    <div className={styles.component}>
                        <h3 id="header">개봉일</h3>
                        <p id="content">{movieReleaseDate}</p>
                    </div>
                    <div className={styles.component}>
                        <h3 id="header">감독</h3>
                        {displayMovieDirector()}
                    </div>
                    <div className={styles.component}>
                        <h3 id="header">출연배우</h3>
                        {displayMovieActor()}
 
                    </div>
                    <div className={styles.component}>
                        <h3 id="header">장르</h3>
                        {displayMovieGenre()}

                    </div>
                    <div className={styles.component}>
                        <h3 id="header">평점</h3>
                        <p id="content">{movieRating}</p>
                    </div>
                </div>
                <div className={styles.summary}>
                    <h3 id="header">줄거리</h3>
                    <p id="content">
                        {movieOverview}
                    </p>
                </div>
                <div className={styles.trailer}>
                    <h3 id="header">예고편</h3>
                    <embed src={movieTrailerPath}></embed>
                </div>
                <div className={styles.reviewWrite}>
                    <h3 id="header">리뷰</h3>
                    <div className={styles.starpointWrap}>
                        <div className={styles.starpointBox}>
                            <select onChange={(e)=>{setReviewRating(e.target.value)}}>
                                <option value="" disabled selected>별점</option>
                                <option value="0">☆☆☆☆☆</option>
                                <option value="1">★☆☆☆☆</option>
                                <option value="2">★★☆☆☆</option>
                                <option value="3">★★★☆☆</option>
                                <option value="4">★★★★☆</option>
                                <option value="5">★★★★★</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" onClick={onSubmit}>등록</button>
                    <textarea onChange={(e)=>{setComment(e.target.value)}} placeholder='100자 이내로 코멘트를 작성해보세요...'></textarea>
                </div>
                <div className={styles.reviewCollection}>
                    <h3 id="header">해당 영화에 작성된 리뷰 둘러보기</h3>
                    <div class={styles.space}>
                        {displayReviewData()}
                    </div>
                </div>
            </div>
        </body>
    );
};

export default MovieInformation;