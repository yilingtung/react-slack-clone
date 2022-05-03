import styled from 'styled-components';

export function ChatMessage() {
  return <ChatMessageContainer>123</ChatMessageContainer>;
}

const ChatMessageContainer = styled.div`
  display: flex;
  width: 100%;
  color: rgba(${(props) => props.theme.colors['primary_foreground']}, 1);
`;
