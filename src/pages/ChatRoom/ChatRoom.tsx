import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ChatWorkspace from '../../components/ChatWorkspace';
import { db } from '../../lib/firebase';

export function ChatRoom() {
  const { roomId } = useParams();
  const roomDocRef = roomId ? doc(db, 'rooms', roomId) : null;
  const [roomData] = useDocument(roomDocRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <ChatRoomWrapper>
      {roomData?.exists() ? (
        <ChatWorkspace roomName={roomData?.data()?.name} />
      ) : (
        <NotFoundChatRoom>Not Found Chat Room</NotFoundChatRoom>
      )}
    </ChatRoomWrapper>
  );
}

const ChatRoomWrapper = styled.div`
  flex: 1;
  width: 100%;
  overflow: hidden;
`;

const NotFoundChatRoom = styled.div`
  display: flex;
`;
