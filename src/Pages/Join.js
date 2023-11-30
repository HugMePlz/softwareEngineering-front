import styles from './Join.module.css';

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment';

const Join=()=>{
  const navigate=useNavigate();
  const goToHome=()=>{
    navigate("/");
  }
  
  const [userId, setUserId]=useState("");
  const [password, setPassword]=useState("");
  const [checkPassword, setCheckPassword]=useState("");
  const [name, setName]=useState("");
  const [phoneNumberPrefix, setPhoneNumberPrefix]=useState("");
  const [phoneNumberPostfix, setPhoneNumberPostfix]=useState("");
  const [gender, setGender]=useState("");
  const [birthYear, setBirthYear]=useState("");
  const [birthMonth, setBirthMonth]=useState("");
  const [birthDay, setBirthDay]=useState("");
  const [nickname, setNickname]=useState("");

  const onSubmit=(event)=>{
    event.preventDefault();
    axios
      .post("/api/members/create",{
        userId: userId,
        password: password,
        checkPassword: checkPassword,
        name: name,
        phoneNumber: `${phoneNumberPrefix}${phoneNumberPostfix}`,
        gender: gender,
        birthDate: moment(`${birthYear}-${birthMonth}-${birthDay}`,'YYYY-MM-DD').format('YYYY-MM-DD'),
        nickname: nickname
      })
      .then((response)=>{
        if(response.status===200){
          alert("회원가입에 성공했습니다.");
          return navigate("/login");
        }
      })
      .catch((error) => {
        if(error.response.status===403){
          alert("알 수 없는 오류로 실패했습니다.");
        }
        if(error.response.status===400){
          alert("공백이 있거나 비밀번호가 불일치합니다.");
        }
        else if(error.response.status===409){
          alert("아이디 중복으로 실패했습니다.")
        }
      });
  }

  return (
    <div className={styles.joinBody}>

      <div className={styles.mainLogo}>
        <img src='img/main_logo.PNG' onClick={goToHome} alt='로고 이미지'></img>
      </div>
        <div className={styles.signupContainer}>
        <h1>회원가입</h1>
        <p>*필수입력사항</p>
        
        <form method='post' action='join' >

                    <input type='text' placeholder='  *아이디 (영문 소문자/숫자, 4~16자)' onChange={(e)=>{setUserId(e.target.value);}} id='id' name='id' className={styles.inputField}></input>

                    <input type='password' placeholder='  *비밀번호 (영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8자~16자)' onChange={(e)=>{setPassword(e.target.value);}} id='password' name='password' className={styles.inputField}></input>

                    <input type='password' placeholder='  *비밀번호 확인' onChange={(e)=>{setCheckPassword(e.target.value);}} id='password-confirm' name='password-confirm' className={styles.inputField}></input>

                    <input type='text' placeholder='  *이름' onChange={(e)=>{setName(e.target.value);}} id='name' name='name'className={styles.inputField}></input>

                    <input type='text' placeholder='  *닉네임' onChange={(e)=>{setNickname(e.target.value);}} id='nickname' name='nickname' className={styles.inputField}></input>

                    <div className={styles.phoneContainer}>
                        <select onChange={(e)=>{setPhoneNumberPrefix(e.target.value)}} name='phone-prefix' id='phone-prefix' className={styles.phoneField1}>
                            <option value="010">010</option>
                            <option value="011">011</option>
                            <option value="012">012</option>
                            <option value="013">013</option>
                            <option value="014">014</option>
                            <option value="015">015</option>
                            <option value="016">016</option>
                            <option value="017">017</option>
                            <option value="018">018</option>
                            <option value="019">019</option>
                        </select>

                        <input type='text' placeholder='나머지 번호 입력(-제외)' onChange={(e)=>setPhoneNumberPostfix(e.target.value)} id='phone-number' name='phone-number' className={styles.phoneField2}></input>
                    </div>

                    <select onChange={(e)=>{setGender(e.target.value)}} name="gender" id="gender" class={styles.genderField}>
                        <option value="" disabled selected>성별 선택</option>
                        <option value="MALE">남성</option>
                        <option value="FEMALE">여성</option>
                    </select>

                    <div className={styles.birhdateContainer}>
                        <select onChange={(e)=>{setBirthYear(e.target.value)}} name="birthdate-year" id="birthdate-year" className={styles.birthdateField1}>
                            <option value="" disabled selected>출생 연도 선택</option>
                            <option value="2023">2023년</option>
                            <option value="2022">2022년</option>
                            <option value="2021">2021년</option>
                            <option value="2020">2020년</option>
                            <option value="2019">2019년</option>
                            <option value="2018">2018년</option>
                            <option value="2017">2017년</option>
                            <option value="2016">2016년</option>
                            <option value="2015">2015년</option>
                            <option value="2014">2014년</option>
                            <option value="2013">2013년</option>
                            <option value="2012">2012년</option>
                            <option value="2011">2011년</option>
                            <option value="2010">2010년</option>
                            <option value="2009">2009년</option>
                            <option value="2008">2008년</option>
                            <option value="2007">2007년</option>
                            <option value="2006">2006년</option>
                            <option value="2005">2005년</option>
                            <option value="2004">2004년</option>
                            <option value="2003">2003년</option>
                            <option value="2002">2002년</option>
                            <option value="2001">2001년</option>
                            <option value="2000">2000년</option>
                            <option value="1999">1999년</option>
                            <option value="1998">1998년</option>
                            <option value="1997">1997년</option>
                            <option value="1996">1996년</option>
                            <option value="1995">1995년</option>
                            <option value="1994">1994년</option>
                            <option value="1993">1993년</option>
                            <option value="1992">1992년</option>
                            <option value="1991">1991년</option>
                            <option value="1990">1990년</option>
                            <option value="1989">1989년</option>
                            <option value="1988">1988년</option>
                            <option value="1987">1987년</option>
                            <option value="1986">1986년</option>
                            <option value="1985">1985년</option>
                            <option value="1984">1984년</option>
                            <option value="1983">1983년</option>
                            <option value="1982">1982년</option>
                            <option value="1981">1981년</option>
                            <option value="1980">1980년</option>
                            <option value="1979">1979년</option>
                            <option value="1978">1978년</option>
                            <option value="1977">1977년</option>
                            <option value="1976">1976년</option>
                            <option value="1975">1975년</option>
                            <option value="1974">1974년</option>
                            <option value="1973">1973년</option>
                            <option value="1972">1972년</option>
                            <option value="1971">1971년</option>                    
                        </select>

                        <select onChange={(e)=>{setBirthMonth(e.target.value)}} name="birthdate-month" id="birthdate-month" className={styles.birthdateField2}>
                            <option value="" disabled selected>월 선택</option>
                            <option value="1">1월</option>
                            <option value="2">2월</option>
                            <option value="3">3월</option>
                            <option value="4">4월</option>
                            <option value="5">5월</option>
                            <option value="6">6월</option>
                            <option value="7">7월</option>
                            <option value="8">8월</option>
                            <option value="9">9월</option>
                            <option value="10">10월</option>
                            <option value="11">11월</option>
                            <option value="12">12월</option>
                        </select>

                        <select onChange={(e)=>{setBirthDay(e.target.value)}} name="birthdate-day" id="birthdate-day" className={styles.birthdateField3}>
                            <option value="" disabled selected>일 선택</option>
                            <option value="1">1일</option>
                            <option value="2">2일</option>
                            <option value="3">3일</option>
                            <option value="4">4일</option>
                            <option value="5">5일</option>
                            <option value="6">6일</option>
                            <option value="7">7일</option>
                            <option value="8">8일</option>
                            <option value="9">9일</option>
                            <option value="10">10일</option>
                            <option value="11">11일</option>
                            <option value="12">12일</option>
                            <option value="13">13일</option>
                            <option value="14">14일</option>
                            <option value="15">15일</option>
                            <option value="16">16일</option>
                            <option value="17">17일</option>
                            <option value="18">18일</option>
                            <option value="19">19일</option>
                            <option value="20">20일</option>
                            <option value="21">21일</option>
                            <option value="22">22일</option>
                            <option value="23">23일</option>
                            <option value="24">24일</option>
                            <option value="25">25일</option>
                            <option value="26">26일</option>
                            <option value="27">27일</option>
                            <option value="28">28일</option>
                            <option value="29">29일</option>
                            <option value="30">30일</option>
                            <option value="31">31일</option>           
                        </select>
                    </div>

                    <button type='submit' onClick={onSubmit} id='signup-button' className={styles.buttonJoin}>회원가입하기</button>
                </form>
            </div>
            </div>
        
    )
}
export default Join;