import styled from 'styled-components';
import ChatWorkspace from '../../components/ChatWorkspace';

export function Home() {
  return (
    <HomeWrapper>
      <ChatWorkspace />
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  flex: 1;
  width: 100%;
  overflow: hidden;
`;
