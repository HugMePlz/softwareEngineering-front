import styles from './MyPageEdit.module.css';
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyPageEdit=()=>{
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

    const [profilePath, setProfilePath]=useState("1");
    const [name, setName]=useState("");
    const [nickname, setNickname]=useState("");
    const [userId, setUserId]=useState("");
    const [mbti, setMbti]=useState("");
    const [genres, setGenres]=useState([]);
    const handleCheckboxChange=(event)=>{
        const value=parseInt(event.target.value);
        if(genres.includes(value)){
            setGenres(genres.filter(item=>item!==value));
        } else{
            setGenres([...genres,value]);
        }
    };

    useEffect(()=>{
        axios
        .get("/api/members", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
            },
        })
        .then((response)=>{
            if(response.status===200){
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
        .get("/api/preferred-genres", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
            },
        })
        .then((response)=>{
            let selectedGenres=[];
            for(let i=0;i<response.data.data.length;i++){
                if(response.data.data[i]==="ACTION"){
                    selectedGenres.push(28);
                }
                else if(response.data.data[i]==="ADVENTURE"){
                    selectedGenres.push(12);
                }
                else if(response.data.data[i]==="ANIMATION"){
                    selectedGenres.push(16);
                }
                else if(response.data.data[i]==="COMEDY"){
                    selectedGenres.push(35);
                }
                else if(response.data.data[i]==="CRIME"){
                    selectedGenres.push(80);
                }
                else if(response.data.data[i]==="DOCUMENTARY"){
                    selectedGenres.push(99);
                }
                else if(response.data.data[i]==="DRAMA"){
                    selectedGenres.push(18);
                }
                else if(response.data.data[i]==="FAMILY"){
                    selectedGenres.push(10751);
                }
                else if(response.data.data[i]==="FANTASY"){
                    selectedGenres.push(14);
                }
                else if(response.data.data[i]==="HISTORY"){
                    selectedGenres.push(36);
                }
                else if(response.data.data[i]==="HORROR"){
                    selectedGenres.push(27);
                }
                else if(response.data.data[i]==="MUSIC"){
                    selectedGenres.push(10402);
                }
                else if(response.data.data[i]==="MYSTERY"){
                    selectedGenres.push(9648);
                }
                else if(response.data.data[i]==="ROMANCE"){
                    selectedGenres.push(10749);
                }
                else if(response.data.data[i]==="SCIENCE_FICTION"){
                    selectedGenres.push(878);
                }
                else if(response.data.data[i]==="TV_MOVIE"){
                    selectedGenres.push(10770);
                }
                else if(response.data.data[i]==="THRILLER"){
                    selectedGenres.push(53);
                }
                else if(response.data.data[i]==="WAR"){
                    selectedGenres.push(10752);
                }
                else if(response.data.data[i]==="WESTERN"){
                    selectedGenres.push(37);
                }
            }
            setGenres(selectedGenres);
        })
        .catch((error)=>{
            console.log(error)
        })
    },[]);

    const onSubmit=(event)=>{
        event.preventDefault();
        axios
        .put("/api/members",{
            profilePath: profilePath,
            nickname: nickname,
            mbti: mbti
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
            },
        })
        .then((response)=>{
            if(response.status===200){
                alert("회원 정보를 변경했습니다.");
                return navigate("/my-page");
            }
        })
        .catch((error)=>{
            console.log(error);
        })

        axios
        .put("api/preferred-genres",genres,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authorization') || ''}`,
            },
        })
        .then((response)=>{
            
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return(
        <body className={styles.myPageEditBody}>
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

            <div className={styles.myPageEditBottom}>
                <table>
                    <tr>
                        <td colspan="2" align="center">
                            <div className={styles.imgContainer}>
                                <img src="/img/profile/profile1.jpg"></img>
                                <img src="/img/profile/profile2.jpg"></img>
                                <img src="/img/profile/profile3.jpg"></img>
                                <img src="/img/profile/profile4.jpg"></img>
                                <img src="/img/profile/profile5.jpg"></img>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" align="center">
                            <div className={styles.imgSelect}>
                                <select onChange={(e)=>{setProfilePath(e.target.value)}}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" align="center"><h2>{name}</h2></td>
                    </tr>
                    <tr>
                        <td className={styles.label1}><p>닉네임</p></td>
                        <td className={styles.value1}><input placeholder={nickname} onChange={(e)=>{setNickname(e.target.value);}}></input></td>
                    </tr>
                    <tr>
                        <td className={styles.label1}><p>아이디</p></td>
                        <td className={styles.value2}><p>@{userId}</p></td>
                    </tr>
                    <tr>
                        <td className={styles.label1}><p id="MBTI_label">MBTI</p></td>
                        <td className={styles.value3}>
                            <select onChange={(e)=>{setMbti(e.target.value)}}>
                                <option value="" disabled selected>{mbti}</option>
                                <option value="ISTJ">ISTJ</option>
                                <option value="ISTP">ISTP</option>
                                <option value="ISFJ">ISFJ</option>
                                <option value="ISFP">ISFP</option>
                                <option value="INTJ">INTJ</option>
                                <option value="INTP">INTP</option>
                                <option value="INFJ">INFJ</option>
                                <option value="INFP">INFP</option>
                                <option value="ESTJ">ESTJ</option>
                                <option value="ESTP">ESTP</option>
                                <option value="ESFJ">ESFJ</option>
                                <option value="ESFP">ESFP</option>
                                <option value="ENTJ">ENTJ</option>
                                <option value="ENTP">ENTP</option>
                                <option value="ENFJ">ENFJ</option>
                                <option value="ENFP">ENFP</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.label4}><p id="genre_label">#선호장르</p></td>
                        <td className={styles.value4}>
                           <input type='checkbox' value="28" checked={genres.includes(28)}
                                onChange={handleCheckboxChange}/>
                           <span>ACTION</span>
                           <div className='ch2'>
                           <input type='checkbox' value="12" checked={genres.includes(12)}
                                onChange={handleCheckboxChange}/>
                                
                           <span>ADVENTURE</span>
                           </div>
                           <div className='ch3'>
                           <input type='checkbox' value="16" checked={genres.includes(16)}
                                onChange={handleCheckboxChange}/>
                           <span>ANIMATION</span>
                           </div>
                           <div className='ch4'>
                           <input type='checkbox' value="35" checked={genres.includes(35)}
                                onChange={handleCheckboxChange}/>
                           <span>COMEDY</span>
                           </div>
                           <div className='ch5'>
                           <input type='checkbox' value="80" checked={genres.includes(80)}
                                onChange={handleCheckboxChange}/>
                           <span>CRIME</span>
                           </div>
                           <div className='ch6'>
                           <input type='checkbox' value="99" checked={genres.includes(99)}
                                onChange={handleCheckboxChange}/>
                           <span>DOCUMENTARY</span>
                           </div>
                           <div className='ch7'>
                           <input type='checkbox' value="18" checked={genres.includes(18)}
                                onChange={handleCheckboxChange}/>
                           <span>DRAMA</span>
                           </div>
                           <div className='ch8'>
                           <input type='checkbox' value="10751" checked={genres.includes(10751)}
                                onChange={handleCheckboxChange}/>
                           <span>FAMILY</span>
                           </div>
                           <div className='ch9'>
                           <input type='checkbox' value="14" checked={genres.includes(14)}
                                onChange={handleCheckboxChange}/>
                           <span>FANTASY</span>
                           </div>
                           <div className='ch10'>
                           <input type='checkbox' value="36" checked={genres.includes(36)}
                                onChange={handleCheckboxChange}/>
                           <span>HISTORY</span>
                           </div>
                           <div className='ch11'>
                           <input type='checkbox' value="27" checked={genres.includes(27)}
                                onChange={handleCheckboxChange}/>
                           <span>HORROR</span>
                           </div>
                           <div className='ch12'>
                           <input type='checkbox' value="10402" checked={genres.includes(10402)}
                                onChange={handleCheckboxChange}/>
                           <span>MUSIC</span>
                           </div>
                           <div className='ch13'>
                           <input type='checkbox' value="9648" checked={genres.includes(9648)}
                                onChange={handleCheckboxChange}/>
                           <span>MYSTERY</span>
                           </div>
                           <div className='ch14'>
                           <input type='checkbox' value="10749" checked={genres.includes(10749)}
                                onChange={handleCheckboxChange}/>
                           <span>ROMANCE</span>
                           </div>
                           <div className='ch15'>
                           <input type='checkbox' value="878" checked={genres.includes(878)}
                                onChange={handleCheckboxChange}/>
                           <span>SCIENCE_FICTION</span>
                           </div>
                           <div className='ch16'>
                           <input type='checkbox' value="10770" checked={genres.includes(10770)}
                                onChange={handleCheckboxChange}/>
                           <span>TV_MOVIE</span>
                           </div>
                           <div className='ch17'>
                           <input type='checkbox' value="53" checked={genres.includes(53)}
                                onChange={handleCheckboxChange}/>
                           <span>THRILLER</span>
                           </div>
                           <div className='ch18'>
                           <input type='checkbox' value="10752" checked={genres.includes(10752)}
                                onChange={handleCheckboxChange}/>
                           <span>WAR</span>
                           </div>
                           <div className='ch19'>
                           <input type='checkbox' value="37" checked={genres.includes(37)}
                                onChange={handleCheckboxChange}/>
                           <span>WESTERN</span>
                           </div>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.submitButtonContainer} colspan="2" align="center"><button id='submit-btn' onClick={onSubmit}>완료</button></td>
                    </tr>
                </table>
            </div>
        </body>
    )
}

export default MyPageEdit;