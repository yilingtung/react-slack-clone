import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { collection, doc, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectChatChannelMessage,
  setChannelMessage,
} from '../../features/chatSlice';
import { db } from '../../lib/firebase';
import FirebaseService from '../../services/firebaseService';
import ChatInput from '../ChatInput';
import ChatMessage from '../ChatMessage';
import Loading from '../Loading';

type Props = {
  roomName?: string;
};

export function ChatWorkspace({ roomName }: Props) {
  const chatbottomRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const params = useParams();
  const roomId = params.roomId as string;
  const roomDocRef = roomId ? doc(db, 'rooms', roomId) : null;
  const [messages, loadingMessages] = useCollection(
    roomDocRef &&
      query(
        collection(db, 'rooms', roomId || '', 'messages'),
        orderBy('timestamp', 'asc')
      )
  );

  const inputMessage = useAppSelector(selectChatChannelMessage)[roomId];
  const isInputEmpty = !(typeof inputMessage === 'string' && inputMessage);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setChannelMessage({ roomId, message: e.target.value }));
    },
    [dispatch, roomId]
  );

  const handleSubmit = useCallback(() => {
    if (roomId !== undefined) {
      FirebaseService.sendMessage({
        roomId,
        message: inputMessage,
      })
        .catch((err) => {
          alert(err);
        })
        .then(() => {
          dispatch(setChannelMessage({ roomId, message: '' }));
          chatbottomRef?.current?.scrollIntoView({ behavior: 'smooth' });
        });
    }
  }, [dispatch, inputMessage, roomId]);

  useEffect(() => {
    chatbottomRef?.current?.scrollIntoView({ behavior: 'auto' });
  }, [loadingMessages, roomId]);

  return (
    <ChatWorkspaceContainer role="main">
      <Header>
        <HeaderText>
          <span>#</span>
          <span>{roomName}</span>
        </HeaderText>
      </Header>
      {!messages ? (
        <Loading />
      ) : (
        <>
          <ChatMessages>
            {messages?.docs.map((doc) => {
              const { content, timestamp } = doc.data();
              return (
                <ChatMessage
                  key={doc.id}
                  content={content}
                  timestamp={timestamp}
                  auth={{
                    id: '123',
                    name: 'irene',
                    avatar:
                      'https://images.unsplash.com/photo-1650493102770-2f61c77d490f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
                  }}
                />
              );
            })}
            <div ref={chatbottomRef} />
          </ChatMessages>
          <ChatInput
            placeholder={`Message # ${roomName}`}
            value={inputMessage}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            disabled={isInputEmpty}
          />
        </>
      )}
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

  > :not(:last-child) {
    margin-right: 12px;
  }

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
