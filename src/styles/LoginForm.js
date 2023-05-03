import styled from "styled-components";
export const LoginForm = styled.form`
        display: block;
padding-top: 60px;
.area {
  width: 100%;
  position: relative;
}
    .login_input {
    margin-bottom: 14px;
    width: 100%;
    height: 56px;
    padding: 20px 10px 10px;
    background-color: transparent;
    font-size: 15px;
    font-weight: 500;
    border: none;
    border-bottom: 1px solid #999;
    font-family: 'Chosunilbo_myungjo';
}
    .login_input:active,
    .login_input:focus {
        border-bottom: 2px solid #07f;
    }
    label {
      position: absolute;
      left: 10px;
      top: 15px;
      font-size: clamp(14px, 2vw, 15px);
      transition: top .5s ease;
      color: #625f5f;
      cursor: pointer;
    }
    .login_input:focus + label  {
      top: 0;
      font-size: clamp(13px, 1.8vw, 14px);
      color: #166cea;
    }
    .login_btn {
    width: 100%;
    height: 60px;
    font-size: clamp(15px, 2vw, 16px);
    color: #fff;
    background-color: #4A8BFD;
    transition: all .15s linear;
    }
    .login_btn:hover,
    .login_btn:active {
    background-color: #07f;
    transition: all .2s linear;
    }
`