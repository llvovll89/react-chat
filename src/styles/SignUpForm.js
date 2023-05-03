import styled from "styled-components";
export const SignUpForm = styled.form`
      display: block;
  padding-top: 60px;
  .area {
    width: 100%;
    position: relative;
  }
  .signup_input {
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
  .signup_input:active,
  .signup_input:focus {
    border-bottom: 2px solid #07f;
  }
  .la {
    position: absolute;
    left: 10px;
    top: 15px;
    font-size: 15px;
    transition: top 0.5s ease;
    color: #625f5f;
    cursor: pointer;
  }
  .signup_input:focus + .la {
    top: 0;
    font-size: clamp(13px, 1.8vw, 14px);
    color: #166cea;
  }

  .signup_btn {
    width: 100%;
    height: 60px;
    font-size: clamp(15px, 2vw, 16px);
    color: #fff;
    background-color: #4a8bfd;
    transition: all 0.15s linear;
  }
  .signup_btn:hover,
  .signup_btn:active {
    background-color: #07f;
    transition: all 0.2s linear;
  }
`