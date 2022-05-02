import styled from 'styled-components';

export function Home() {
  return <HomeWrapper>home</HomeWrapper>;
}

const HomeWrapper = styled.div`
  width: 100%;
  height: ${(props) =>
    `calc(100vh - ${props.theme.sizes['navigation_height']}px)`};
  background-color: ${(props) =>
    `rgba(${props.theme.colors['primary_background']},1)`};
  overflow-y: auto;
`;
