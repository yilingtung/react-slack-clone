import { useCallback } from 'react';
import styled from 'styled-components';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../lib/firebase';

export function Login() {
  const handleSignin = useCallback(async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(token, user);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return (
    <LoginContainer>
      <InnerContainer>
        <StyledLogo src="./slack-logo.svg" alt="" />
        <h1>Join Slack Clone App</h1>
        <button onClick={handleSignin}>Sign in with Google</button>
      </InnerContainer>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(${(props) => props.theme.colors['login-bg']}, 1);
  overflow: hidden;
`;

const InnerContainer = styled.div`
  padding: 80px;
  border-radius: 8px;
  background-color: rgba(${(props) => props.theme.colors['login-inner-bg']}, 1);
  color: rgba(${(props) => props.theme.colors['login-text']}, 1);
  text-align: center;

  > :not(:last-child) {
    margin-bottom: 32px;
  }

  > h1 {
    font-size: 24px;
    font-weight: 900;
  }

  > button {
    padding: 0 16px;
    height: 40px;
    font-weight: 900;
    color: rgba(${(props) => props.theme.colors['login-button']}, 1);
    background-color: transparent;
    border: 2px solid rgba(${(props) => props.theme.colors['login-button']}, 1);
    border-radius: 4px;
    outline: none;
    cursor: pointer;

    :hover {
      background-color: rgba(
        ${(props) => props.theme.colors['login-button']},
        1
      );
      color: rgba(${(props) => props.theme.colors['login-inner-bg']}, 1);
    }
  }
`;

const StyledLogo = styled.img`
  height: 80px;
  object-fit: contain;
`;
