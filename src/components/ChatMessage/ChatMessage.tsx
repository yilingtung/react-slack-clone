import { Timestamp } from 'firebase/firestore';
import styled from 'styled-components';

import Avatar from '@material-ui/core/Avatar';

type Props = {
  timestamp: Timestamp;
  auth: { id: string; name: string; avatar: string };
  content: string;
};

export function ChatMessage({
  timestamp,
  content,
  auth: { name, avatar },
}: Props) {
  return (
    <ChatMessageContainer>
      <Avatar variant="rounded" src={avatar} />
      <MessageContent>
        <MessageContentHeader>
          <h3>{name}</h3>
          <span>{new Date(timestamp?.toDate())?.toUTCString()}</span>
        </MessageContentHeader>
        <MessageContentBody>{content}</MessageContentBody>
      </MessageContent>
    </ChatMessageContainer>
  );
}

const ChatMessageContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 8px 20px;
  color: rgba(${(props) => props.theme.colors['primary_foreground']}, 1);

  > .MuiAvatar-root {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    margin-right: 8px;
  }
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

const MessageContentHeader = styled.div`
  display: flex;
  align-items: center;

  > :not(:last-child) {
    margin-right: 12px;
  }

  > h3 {
    display: inline-block;
    font-size: 15px;
    font-weight: 900;
  }

  > span {
    font-size: 12px;
    color: rgba(${(props) => props.theme.colors['primary_foreground']}, 0.6);
  }
`;

const MessageContentBody = styled.div`
  font-size: 15px;
  text-align: start;
  word-break: break-word;
`;
