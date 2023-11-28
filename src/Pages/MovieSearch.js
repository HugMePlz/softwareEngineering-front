import styles from './MovieSearch.module.css';
import axios from "axios";
import { useState } from "react";
import { useAsyncError, useNavigate } from "react-router-dom";

const MovieSearch=()=>{
    const navigate=useNavigate();
    const goToMain=()=>{
        navigate("/main");
    }

    const [searchKeyword, setSearchKeyword]=useState("title");
    const [searchContent, setSearchContent]=useState("");

    const [searchSuccess, setSearchSuccess]=useState();
    const [searchMovieId, setSearchMovieId]=useState([]);
    const [searchMoviePoster, setSearchMoviePoster]=useState([]);
    const [searchMovieTitle, setSearchMovieTitle]=useState([]);

    const onSubmit=(event)=>{
        event.preventDefault();
        if(searchContent===""){
            alert("검색어를 입력해주세요.");
            window.location.reload();
        }
        else{
            axios
            .get("/api/movies/search"+"?"+searchKeyword+"="+searchContent,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
                },
            })
            .then((response)=>{
                if(response.status===200){
                    console.log(response);
                    if(response.data.message!==`검색 결과 없음: ${searchContent}`){
                        setSearchSuccess(true);
                        const searchMovieIdArr=[];
                        const searchMoviePosterArr=[];
                        const searchMovieTitleArr=[];
                        for(let i=0;i<response.data.data.length;i++){
                            searchMovieIdArr.push(response.data.data[i].id);
                            searchMoviePosterArr.push(response.data.data[i].posterPath);
                            searchMovieTitleArr.push(response.data.data[i].title);
                        }
                        setSearchMovieId(searchMovieIdArr);
                        setSearchMoviePoster(searchMoviePosterArr);
                        setSearchMovieTitle(searchMovieTitleArr);
                    }
                    else{
                        setSearchSuccess(false);
                    }
                }
            })
            .catch((error)=>{
                console.log(error);
            })
        } 
    }

    const displaySearchMovieData=()=>{
        const searchMovieDataArr=[];
        if(searchSuccess===true){
            for(let i=0;i<searchMovieId.length;i++){
                searchMovieDataArr.push(
                    <div className={styles.movieComponent}>
                        <img id="movie-poster" className={styles.moviePoster}
                            src={searchMoviePoster[i]}
                            onClick={(e)=>{navigate(`/movie-information/${searchMovieId[i]}`)}}
                        ></img>
                        <h3 id="movie-title" className={styles.movieTitle}>{searchMovieTitle[i]}</h3>
                    </div>
                )
            }
        }
        else if(searchSuccess===false){
            searchMovieDataArr.push(
                <h3>조건에 맞는 영화를 찾을 수 없습니다.</h3>
            )
        }
        return searchMovieDataArr;
    }

    return(
        <div className={styles.movieSearchBody}>
            
            <div className={styles.mainLogo}>
                <img src='img/main_logo.PNG' onClick={goToMain} alt='로고 이미지'></img>
            </div>

            <div className={styles.searchBox}>
                <form method="post">
                    <select onChange={(e)=>{setSearchKeyword(e.target.value)}} name="movie_search" className={styles.searchBox1}>
                        <option value="title">제목</option>
                        <option value="person">감독 및 배우</option>

                    </select>
                    <input onChange={(e)=>{setSearchContent(e.target.value)}} type="text" className={styles.searchBox2} placeholder="키워드를 입력하세요..." ></input>
                    <button onClick={onSubmit} className={styles.searchBox3} type="submit" ><img src='img/search_icon2.png'/></button>
                </form>
            </div>
            <div className={styles.buttonLogout}>
                <button>로그아웃</button>
            </div>
                
            <div className={styles.movieSearchBottom}>
                <h2>영화 검색 결과</h2>
                <div className="search-movie-container">
                    {displaySearchMovieData()}
                </div>
            </div>
        </div>
    )
}

export default MovieSearch;