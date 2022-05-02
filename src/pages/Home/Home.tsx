import styled from 'styled-components';

import Navigation from '../../components/Navigation';
import Sidebar from '../../components/Sidebar';

export function Home() {
  return (
    <HomeWrapper>
      <Navigation />
      <Sidebar />
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) =>
    `rgba(${props.theme.colors['primary_background']},1)`};
  overflow: hidden;
`;
