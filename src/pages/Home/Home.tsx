/* eslint-disable jsx-a11y/accessible-emoji */
import styled from 'styled-components';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

export function Home() {
  return (
    <HomeWrapper>
      <h1>Welcome 👋🏻</h1>
      <p>You’re here! Hello!</p>
      <p>
        To learn all about using Slack, click the help icon
        <HelpOutlineIcon />
        in the top right corner of the app. But nothing will happen... Sorry 🥲
      </p>
      <p>Just feel free to leave some message in anywhere you like.</p>
      <p>Have a nice day!</p>
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  flex: 1;
  width: 100%;
  overflow: hidden;
  color: rgba(${(props) => props.theme.colors['primary_foreground']}, 1);
  padding: 48px 20px 16px 20px;

  > h1 {
    margin-bottom: 24px;
  }

  > p {
    line-height: 150%;
    margin-bottom: 12px;

    > .MuiSvgIcon-root {
      margin: 0 4px;
    }
  }
`;
