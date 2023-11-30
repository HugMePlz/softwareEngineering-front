import styles from './Main.module.css';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Main=()=>{
    const navigate=useNavigate();
    const goToMain=()=>{
        navigate("/main");
    }
    const goToMyPage=()=>{
        navigate("/my-page");
    }
    const goToCommunity=()=>{
        navigate("/community");
    }
    const goToMovieSearch=()=>{
        navigate("/movie-search");
    }
    const logout=()=>{
        localStorage.removeItem('authorization');
        alert("로그아웃 성공");
        navigate("/");
    }

    const [genre, setGenre]=useState("ACTION");
    const [genreMovieId, setGenreMovieId]=useState([]);
    const [genrePoster, setGenrePoster]=useState([]);
    const [genreTitle, setGenreTitle]=useState([]);
    const [upcomingMovieId, setUpcomingMovieID]=useState([]);
    const [upcomingPoster, setUpcomingPoster]=useState([]);
    const [upcomingTitle, setUpcomingTitle]=useState([]);
    const [nowPlayingMovieId, setNowPlayingMovieID]=useState([]);
    const [nowPlayingPoster, setNowPlayingPoster]=useState([]);
    const [nowPlayingTitle, setNowPlayingTitle]=useState([]);
    const [popularMovieId, setPopularMovieID]=useState([]);
    const [popularPoster, setPopularPoster]=useState([]);
    const [popularTitle, setPopularTitle]=useState([]);
    const [topRatedMovieId, setTopRatedMovieID]=useState([]);
    const [topRatedPoster, setTopRatedPoster]=useState([]);
    const [topRatedTitle, setTopRatedTitle]=useState([]);
    const [statusMbti, setStatusMbti]=useState(false);
    const [recommendedByMbtiMovieId, setRecommendedByMbtiMovieId]=useState([]);
    const [recommendedByMbtiPoster, setRecommendedByMbtiPoster]=useState([]);
    const [recommendedByMbtiTitle, setRecommendedByMbtiTitle]=useState([]);
    const [statusGenre, setStatusGenre]=useState(false);
    const [recommendedByGenreMovieId, setRecommendedByGenreMovieId]=useState([]);
    const [recommendedByGenrePoster, setRecommendedByGenrePoster]=useState([]);
    const [recommendedByGenreTitle, setRecommendedByGenreTitle]=useState([]);

    useEffect(()=>{
        axios
        .get(`/api/movies/genres/${genre}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
            },
        })
        .then((response)=>{
            if(response.status===200){
                const genreMovieIdArr=[];
                const genrePosterArr=[];
                const genreTitleArr=[];
                for(let i=0;i<response.data.data.length;i++){
                    genreMovieIdArr.push(response.data.data[i].id);
                    genrePosterArr.push(response.data.data[i].posterPath);
                    genreTitleArr.push(response.data.data[i].title);
                }
                setGenreMovieId(genreMovieIdArr);
                setGenrePoster(genrePosterArr);
                setGenreTitle(genreTitleArr);
            }
        })
        .catch((error)=>{
            if(error.response.status===403){
                localStorage.removeItem('authorization');
                navigate("/login")
            }
        })

        axios
        .get("/api/movies/upcoming", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
            },
        })
        .then((response)=>{
            if(response.status===200){
                const upcomingMovieIdArr=[];
                const upcomingPosterArr=[];
                const upcomingTitleArr=[];
                for(let i=0;i<response.data.data.length;i++){
                    upcomingMovieIdArr.push(response.data.data[i].id);
                    upcomingPosterArr.push(response.data.data[i].posterPath);
                    upcomingTitleArr.push(response.data.data[i].title);
                }
                setUpcomingMovieID(upcomingMovieIdArr);
                setUpcomingPoster(upcomingPosterArr);
                setUpcomingTitle(upcomingTitleArr);
            }
        })
        .catch((error)=>{
            if(error.response.status===403){
                localStorage.removeItem('authorization');
                navigate("/login")
            }
        })

        axios
        .get("/api/movies/now-playing", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
            },
        })
        .then((response)=>{
            if(response.status===200){
                const nowPlayingMovieIdArr=[];
                const nowPlayingPosterArr=[];
                const nowPlayingTitleArr=[];
                for(let i=0;i<response.data.data.length;i++){
                    nowPlayingMovieIdArr.push(response.data.data[i].id);
                    nowPlayingPosterArr.push(response.data.data[i].posterPath);
                    nowPlayingTitleArr.push(response.data.data[i].title);
                }
                setNowPlayingMovieID(nowPlayingMovieIdArr);
                setNowPlayingPoster(nowPlayingPosterArr);
                setNowPlayingTitle(nowPlayingTitleArr);
            }
        })
        .catch((error)=>{
            if(error.response.status===403){
                localStorage.removeItem('authorization');
                navigate("/login")
            }
        })

        axios
        .get("/api/movies/popular", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
            },
        })
        .then((response)=>{
            if(response.status===200){
                const popularMovieIdArr=[];
                const popularPosterArr=[];
                const popularTitleArr=[];
                for(let i=0;i<response.data.data.length;i++){
                    popularMovieIdArr.push(response.data.data[i].id);
                    popularPosterArr.push(response.data.data[i].posterPath);
                    popularTitleArr.push(response.data.data[i].title);
                }
                setPopularMovieID(popularMovieIdArr);
                setPopularPoster(popularPosterArr);
                setPopularTitle(popularTitleArr);
            }
        })
        .catch((error)=>{
            if(error.response.status===403){
                localStorage.removeItem('authorization');
                navigate("/login")
            }
        })

        axios
        .get("/api/movies/top-rated", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
            },
        })
        .then((response)=>{
            if(response.status===200){
                const topRatedMovieIdArr=[];
                const topRatedPosterArr=[];
                const topRatedTitleArr=[];
                for(let i=0;i<response.data.data.length;i++){
                    topRatedMovieIdArr.push(response.data.data[i].id);
                    topRatedPosterArr.push(response.data.data[i].posterPath);
                    topRatedTitleArr.push(response.data.data[i].title);
                }
                setTopRatedMovieID(topRatedMovieIdArr);
                setTopRatedPoster(topRatedPosterArr);
                setTopRatedTitle(topRatedTitleArr);
            }
        })
        .catch((error)=>{
            if(error.response.status===403){
                localStorage.removeItem('authorization');
                navigate("/login")
            }
        })

        axios
        .get("/api/movies/recommended-by-mbti", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
            },
        })
        .then((response)=>{
            if(response.status===200){
                if(response.data.message==='MBTI가 등록되지 않음' && response.data.message==='추천 데이터 없음'){
                    setStatusMbti(false);
                }
                else{
                    setStatusMbti(true);
                    if(response.data.data!==null){
                        const recommendedByMbtiMovieIdArr=[];
                        const recommendedByMbtiPosterArr=[];
                        const recommendedByMbtiTitleArr=[];
                        for(let i=0;i<response.data.data.length;i++){
                            recommendedByMbtiMovieIdArr.push(response.data.data[i].id);
                            recommendedByMbtiPosterArr.push(response.data.data[i].posterPath);
                            recommendedByMbtiTitleArr.push(response.data.data[i].title);
                        }
                        setRecommendedByMbtiMovieId(recommendedByMbtiMovieIdArr);
                        setRecommendedByMbtiPoster(recommendedByMbtiPosterArr);
                        setRecommendedByMbtiTitle(recommendedByMbtiTitleArr);
                    } 
                }
            }
        })
        .catch((error)=>{
            if(error.response.status===403){
                localStorage.removeItem('authorization');
                navigate("/login")
            }
        })

        axios
        .get("/api/movies/recommended-by-genre", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
            },
        })
        .then((response)=>{
            if(response.status===200){
                if(response.data.message==='선호 장르가 등록되지 않음'){
                    setStatusGenre(false);
                }
                else{
                    setStatusGenre(true);
                    const recommendedByGenreMovieIdArr=[];
                    const recommendedByGenrePosterArr=[];
                    const recommendedByGenreTitleArr=[];
                    for(let i=0;i<response.data.data.length;i++){
                        recommendedByGenreMovieIdArr.push(response.data.data[i].id);
                        recommendedByGenrePosterArr.push(response.data.data[i].posterPath);
                        recommendedByGenreTitleArr.push(response.data.data[i].title);
                    }
                    setRecommendedByGenreMovieId(recommendedByGenreMovieIdArr);
                    setRecommendedByGenrePoster(recommendedByGenrePosterArr);
                    setRecommendedByGenreTitle(recommendedByGenreTitleArr);
                }
            }
        })
        .catch((error)=>{
            if(error.response.status===403){
                localStorage.removeItem('authorization');
                navigate("/login")
            }
        })
    },[]);

    const onGenreSubmit = () => {
        axios
          .get(`/api/movies/genres/${genre}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              const genreMovieIdArr = [];
              const genrePosterArr = [];
              const genreTitleArr = [];
              for (let i = 0; i < response.data.data.length; i++) {
                genreMovieIdArr.push(response.data.data[i].id);
                genrePosterArr.push(response.data.data[i].posterPath);
                genreTitleArr.push(response.data.data[i].title);
              }
              setGenreMovieId(genreMovieIdArr);
              setGenrePoster(genrePosterArr);
              setGenreTitle(genreTitleArr);
            }
          })
          .catch((error) => {
            if (error.response.status === 403) {
                localStorage.removeItem('authorization');
                navigate("/login")
            }
          });
    };
      
    // useEffect to call onGenreSubmit when the genre changes
    useEffect(() => {
        onGenreSubmit();
    }, [genre]);


    const displayGenreData=()=>{
        const genreDataArr=[];
        for(let i=0;i<genreMovieId.length;i++){
            genreDataArr.push(
                <div className={styles.movieComponent}>
                    <img id='movie-poster' className={styles.moviePoster}
                        src={genrePoster[i]}
                        onClick={(e)=>{navigate(`/movie-information/${genreMovieId[i]}`)}}
                    ></img>
                    <h3 id='movie-title' className={styles.movieTitle}>{genreTitle[i]}</h3>
                </div>
            ) 
        }
        return genreDataArr;
    }

    const displayUpcomingData=()=>{
        const upcomingDataArr=[];
        for(let i=0;i<upcomingMovieId.length;i++){
            upcomingDataArr.push(
                <div className={styles.movieComponent}>
                    <img id='movie-poster' className={styles.moviePoster}
                        src={upcomingPoster[i]}
                        onClick={(e)=>{navigate(`/movie-information/${upcomingMovieId[i]}`)}}
                    ></img>
                    <h3 id='movie-title' className={styles.movieTitle}>{upcomingTitle[i]}</h3>
                </div>
            ) 
        }
        return upcomingDataArr;
    }

    const displayNowPlayingData=()=>{
        const nowPlayingDataArr=[];
        for(let i=0;i<nowPlayingMovieId.length;i++){
            nowPlayingDataArr.push(
                <div className={styles.movieComponent}>
                    <img id='movie-poster' className={styles.moviePoster}
                        src={nowPlayingPoster[i]}
                        onClick={(e)=>{navigate(`/movie-information/${nowPlayingMovieId[i]}`)}}
                    ></img>
                    <h3 id='movie-title' className={styles.movieTitle}>{nowPlayingTitle[i]}</h3>
                </div>
            ) 
        }
        return nowPlayingDataArr;
    }

    const displayTopRatedData=()=>{
        const topRatedDataArr=[];
        for(let i=0;i<topRatedMovieId.length;i++){
            topRatedDataArr.push(
                <div className={styles.movieComponent}>
                    <img id='movie-poster' className={styles.moviePoster}
                        src={topRatedPoster[i]}
                        onClick={(e)=>{navigate(`/movie-information/${topRatedMovieId[i]}`)}}
                    ></img>
                    <h3 id='movie-title' className={styles.movieTitle}>{topRatedTitle[i]}</h3>
                </div>
            ) 
        }
        return topRatedDataArr;
    }

    const displayPopularData=()=>{
        const popularDataArr=[];
        for(let i=0;i<popularMovieId.length;i++){
            popularDataArr.push(
                <div className={styles.movieComponent}>
                    <img id='movie-poster' className={styles.moviePoster}
                        src={popularPoster[i]}
                        onClick={(e)=>{navigate(`/movie-information/${popularMovieId[i]}`)}}
                    ></img>
                    <h3 id='movie-title' className={styles.movieTitle}>{popularTitle[i]}</h3>
                </div>
            ) 
        }
        return popularDataArr;
    }

    const displayRecommendedByMbtiData=()=>{
        const recommendedByMbtiDataArr=[];
        if(recommendedByMbtiMovieId.length===0){
            if(statusMbti===false){
                recommendedByMbtiDataArr.push(
                    <div className={styles.movieComponent}>
                        <h1>마이페이지에서 MBTI를 등록해보세요.</h1>
                    </div>
                )
            }
            else{
                recommendedByMbtiDataArr.push(
                    <div className={styles.movieComponent}>
                        <h1>나와 같은 엠비티아이의 사용자가 리뷰한 영화를 찾을 수가 없습니다.</h1>
                    </div>
                )
            }
        }
        else{
            for(let i=0;i<recommendedByMbtiMovieId.length;i++){
                recommendedByMbtiDataArr.push(
                    <div className={styles.movieComponent}>
                        <img id='movie-poster' className={styles.moviePoster}
                            src={recommendedByMbtiPoster[i]}
                            onClick={(e)=>{navigate(`/movie-information/${recommendedByMbtiMovieId[i]}`)}}
                        ></img>
                        <h3 id='movie-title' className={styles.movieTitle}>{recommendedByMbtiTitle[i]}</h3>
                    </div>
                ) 
            }
        }
        return recommendedByMbtiDataArr;
    }

    const displayRecommendedByGenreData=()=>{
        const recommendedByGenreDataArr=[];
        if(statusGenre===false){
            recommendedByGenreDataArr.push(
                <div className={styles.movieComponent}>
                        <h1>마이페이지에서 선호 장르 해시태그를 등록해보세요.</h1>
                </div>
            )
        }
        else{
            for(let i=0;i<recommendedByGenreMovieId.length;i++){
                recommendedByGenreDataArr.push(
                    <div className={styles.movieComponent}>
                        <img id='movie-poster' className={styles.moviePoster}
                            src={recommendedByGenrePoster[i]}
                            onClick={(e)=>{navigate(`/movie-information/${recommendedByGenreMovieId[i]}`)}}
                        ></img>
                        <h3 id='movie-title' className={styles.movieTitle}>{recommendedByGenreTitle[i]}</h3>
                    </div>
                ) 
            }
        }
        return recommendedByGenreDataArr;
    }

    return(
        <div className={styles.mainBody}>
            <div className={styles.mainLogo}>
                <img src='img/main_logo.PNG' onClick={goToMain} alt='로고 이미지'></img>
            </div>
                
            <div className={styles.mainNavigation}>
                <button onClick={goToMyPage}>마이페이지</button>
                <button onClick={goToCommunity}>커뮤니티</button>
            </div>
            <div className={styles.searchMovie}>
                <button onClick={goToMovieSearch}>
                    <img src='img/search.png'/>
                </button>
            </div>
            <div className={styles.buttonLogout}>
                <button onClick={logout}>로그아웃</button>
            </div>
                
            <div className={styles.mainBottom}>
                <div className={styles.genreBox}>
                    <h2>장르가
                        <select onChange={(e)=>{setGenre(e.target.value)}}>
                            <option value="ACTION">ACTION</option>
                            <option value="ADVENTURE">ADVENTURE</option>
                            <option value="ANIMATION">ANIMATION</option>
                            <option value="COMEDY">COMEDY</option>
                            <option value="CRIME">CRIME</option>
                            <option value="DOCUMENTARY">DOCUMENTARY</option>
                            <option value="DRAMA">DRAMA</option>
                            <option value="FAMILY">FAMILY</option>
                            <option value="FANTASY">FANTASY</option>
                            <option value="HISTORY">HISTORY</option>
                            <option value="HORROR">HORROR</option>
                            <option value="MUSIC">MUSIC</option>
                            <option value="MYSTERY">MYSTERY</option>
                            <option value="ROMANCE">ROMANCE</option>
                            <option value="SCIENCE_FICTION">SCIENCE FICTION</option>
                            <option value="TV_MOVIE">TV_MOVIE</option>
                            <option value="THRILLER">THRILLER</option>
                            <option value="WAR">WAR</option>
                            <option value="WESTERN">WESTERN</option>
                        </select>
                        {' 인 영화'}
                    </h2>
                </div>
                <div className={styles.movieCategory1}>
                    
                    <div className={styles.cateList1}>
                        {displayGenreData()}
                    </div>
                </div>
                <div className={styles.movieCategory2}>
                    <h2 className={styles.cateTitle2}>개봉 예정인 영화</h2>
                    <div className={styles.cateList2}>
                        {displayUpcomingData()}
                    </div>
                </div>
                <div className={styles.movieCategory3}>
                    <h2 className={styles.cateTitle3}>현재 상영 중인 영화</h2>
                    <div className={styles.cateList3}>
                        {displayNowPlayingData()}
                    </div>
                </div>
                <div className={styles.movieCategory4}>
                    <h2 className={styles.cateTitle4}>인기 많은 영화</h2>
                    <div className={styles.cateList4}>
                        {displayPopularData()}
                    </div>
                </div>
                <div className={styles.movieCategory5}>
                    <h2 className={styles.cateTitle5}>평점이 높은 영화</h2>
                    <div className={styles.cateList5}>
                        {displayTopRatedData()}
                    </div>
                </div>
                <div className={styles.movieCategory6}>
                    <h2 className={styles.cateTitle6}>MBTI 기반 추천 영화</h2>
                    <div className={styles.cateList6}>
                        {displayRecommendedByMbtiData()}
                    </div>
                </div>
                <div className={styles.movieCategory7}>
                    <h2 className={styles.cateTitle7}>선호 장르 기반 추천 영화</h2>
                    <div className={styles.cateList7}>
                        {displayRecommendedByGenreData()}
                    </div>
                </div>
            </div>   
        </div>
    );
};

export default Main;