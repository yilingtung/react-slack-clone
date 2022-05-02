import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../Navigation';
import Sidebar from '../Sidebar';

export function LayoutMain() {
  return (
    <LayoutMainContainer>
      <Navigation />
      <WorkspaceContainer>
        <Sidebar />
        <Outlet />
      </WorkspaceContainer>
    </LayoutMainContainer>
  );
}

const LayoutMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) =>
    `rgba(${props.theme.colors['primary_background']},1)`};
  overflow: hidden;
`;

const WorkspaceContainer = styled.div`
  display: flex;
  flex: 1;
`;
