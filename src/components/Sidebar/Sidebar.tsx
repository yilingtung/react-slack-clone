import styled from 'styled-components';

export function Sidebar() {
  return <SidebarWrapper>sidebar</SidebarWrapper>;
}

const SidebarWrapper = styled.div`
  display: flex;
  position: relative;
  width: 280px;
  background-color: ${(props) => `rgba(${props.theme.colors['sidebar-bg']},1)`};
`;
