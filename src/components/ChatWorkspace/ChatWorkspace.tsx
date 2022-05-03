import { useCallback } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectChatChannelMessage,
  updateChatMessage,
} from '../../features/chatSlice';
import ChatInput from '../ChatInput';
import ChatMessage from '../ChatMessage';

export function ChatWorkspace() {
  const dispatch = useAppDispatch();
  const message = useAppSelector(selectChatChannelMessage);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateChatMessage(e.target.value));
    },
    [dispatch]
  );

  return (
    <ChatWorkspaceContainer role="main">
      <Header>
        <HeaderText>
          <span>
            NameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameNameName
          </span>
        </HeaderText>
      </Header>
      <ChatMessages>
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
      </ChatMessages>
      <ChatInput
        placeholder="Message "
        value={message}
        onChange={handleInputChange}
      />
    </ChatWorkspaceContainer>
  );
}

const ChatWorkspaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - ${(props) => props.theme.sizes['navigation_height']}px);
  background-color: rgba(
    ${(props) => props.theme.colors['primary_background']},
    1
  );
  color: rgba(${(props) => props.theme.colors['primary_foreground']}, 1);
`;

const Header = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  height: 49px;
  padding: 0 16px 0 20px;
  box-shadow: 0 1px 0 0
    rgba(${(props) => props.theme.colors['primary_foreground']}, 0.1);
`;

const HeaderText = styled.div`
  display: flex;
  flex: 1 1 0;
  min-width: 0;
  align-items: baseline;
  font-weight: 900;
  font-size: 18px;

  > span {
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
`;
