import { useCallback } from 'react';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { useBreakpoint } from 'styled-breakpoints/react-styled';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import Drawer from '@material-ui/core/Drawer';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import InsertCommentOutlinedIcon from '@material-ui/icons/InsertCommentOutlined';
import AddIcon from '@material-ui/icons/Add';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import FirebaseService from '../../services/firebaseService';
import {
  selectMobileSidebarOpen,
  setMobileSidebarOpen,
} from '../../features/globalSlice';
import { selectChat, setSelectedRoomId } from '../../features/chatSlice';
import { db } from '../../lib/firebase';
import SidebarOption from '../SidebarOption';

export function Sidebar() {
  const isLg = useBreakpoint(up('lg'));
  const isMobileSidebarOpen = useAppSelector(selectMobileSidebarOpen);
  const { selectedRoomId } = useAppSelector(selectChat);
  const dispatch = useAppDispatch();
  const [channels] = useCollection(collection(db, 'rooms'));

  const closeMobileSidebar = useCallback(() => {
    dispatch(setMobileSidebarOpen(false));
  }, [dispatch]);

  const handleChannelSelect = useCallback(
    async (roomId: string) => {
      dispatch(setSelectedRoomId(roomId));
    },
    [dispatch]
  );

  const handleChannelCreate = useCallback(async () => {
    const channelName = prompt('Please enter the channel name.');
    if (channelName) {
      const response = await FirebaseService.createChannel(channelName);
      console.log(response);
    }
  }, []);

  return (
    <SidebarContainer
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      variant={isLg ? 'persistent' : 'temporary'}
      open={isLg || isMobileSidebarOpen}
      onClose={closeMobileSidebar}
    >
      <SidebarHeader>
        <WorkspaceNameContainer>
          <button>
            <span>tungyiling</span>
            <StyledArrowIcon fontSize="small" />
          </button>
        </WorkspaceNameContainer>
        <CreateButton>
          <CreateOutlinedIcon />
        </CreateButton>
      </SidebarHeader>
      <SidebarBody>
        <SidebarOption Icon={InsertCommentOutlinedIcon} title="Threads" />
        {channels?.docs.map((doc) => (
          <SidebarOption
            key={doc.id}
            title={doc.data().name}
            actived={selectedRoomId === doc.id}
            onClick={() => handleChannelSelect(doc.id)}
          />
        ))}
        <SidebarOption
          Icon={AddIcon}
          withIconBg
          title="Add Channels"
          onClick={handleChannelCreate}
        />
      </SidebarBody>
    </SidebarContainer>
  );
}

const SidebarContainer = styled(Drawer)`
  display: block;
  flex-shrink: 0;
  width: ${(props) => `${props.theme.sizes['sidebar_width']}px`};
  height: ${(props) =>
    `calc(100vh - ${props.theme.sizes['navigation_height']}px)`};
  background-color: ${(props) => `rgba(${props.theme.colors['sidebar-bg']},1)`};

  > .MuiBackdrop-root {
    background-color: transparent;
  }

  > .MuiPaper-root {
    display: flex;
    flex-direction: column;
    width: ${(props) => `${props.theme.sizes['sidebar_width']}px`};
    background-color: ${(props) =>
      `rgba(${props.theme.colors['sidebar-bg']},1)`};
    box-sizing: 'border-box';

    ${up('lg')} {
      position: relative;
    }
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 49px;
  padding: 0 16px;
  box-shadow: 0 1px 0 0
    ${(props) => `rgba(${props.theme.colors['navigation-text']},0.1)`};

  :hover {
    background-color: ${(props) =>
      `rgba(${props.theme.colors['sidebar-bg--hover']},1)`};
  }
`;

const CreateButton = styled.button`
  display: inline-flex;
  flex-shrink: 0;
  height: 34px;
  width: 34px;
  border-radius: 999px;
  border: none;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const WorkspaceNameContainer = styled.div`
  flex: 1;
  min-width: 0;

  > button {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0;
    border: none;
    background-color: transparent;

    > span {
      display: block;
      min-width: 0;
      font-size: 18px;
      line-height: 1.33334;
      font-weight: 900;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: ${(props) =>
        `rgba(${props.theme.colors['sidebar-text--selected']},1)`};
    }
  }
`;

const StyledArrowIcon = styled(KeyboardArrowDownOutlinedIcon)`
  color: ${(props) =>
    `rgba(${props.theme.colors['sidebar-text--selected']},1)`};
`;

const SidebarBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
`;
