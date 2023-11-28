import styles from './Login.module.css';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const goToHome=()=>{
    navigate("/");
  }
  const goToJoin=()=>{
    navigate("/join");
  }

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/login", {
        userId: userId,
        password: password,
      })
      .then((response) => {
        if((response.status===200)){
          alert("로그인에 성공했습니다.");
          localStorage.setItem("authorization", response.headers.authorization.substr(7));
          return navigate("/main");
        }   
      })
      .catch((error) => {
        console.log(error)
        if(error.response.status===403){
          alert("다시 로그인해주세요.");
        }
        else if(error.response.status===400){
          alert("로그인 실패(validation 오류로 실패)");
        }
        else if(error.response.status===404){
          alert("로그인 실패(서버 검점으로 실패)");
        }
      });
  };

  return (
    <div className={styles.loginBody}>
      <div className={styles.mainLogo}>
        <img src="img/main_logo.PNG" onClick={goToHome} alt="로고 이미지"></img>
      </div>
      <div className={styles.loginContainer}>
        <h1>로그인</h1>
        <form method="post" action="login" className={styles.loginInput}>
          <input type="text" placeholder="아이디" onChange={(e) => { setUserId(e.target.value); }} name="id"></input>
          <input type="password" placeholder="비밀번호" onChange={(e) => { setPassword(e.target.value); }} name="password"></input>
          <button type="submit" onClick={onSubmit} id="loginButton">로그인하기</button>
        </form>
        <div className={styles.signupLink}>
        <p>아직 계정이 없으신가요? <button onClick={goToJoin}>회원가입</button></p>
      </div>
      </div>
      
    </div>
  );
}

export default Login;