import { useCallback } from 'react';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { useBreakpoint } from 'styled-breakpoints/react-styled';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import InsertCommentOutlinedIcon from '@material-ui/icons/InsertCommentOutlined';
import AddIcon from '@material-ui/icons/Add';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import AlternateEmailOutlinedIcon from '@material-ui/icons/AlternateEmailOutlined';
import ApartmentOutlinedIcon from '@material-ui/icons/ApartmentOutlined';
import ArrowDropDownOutlinedIcon from '@material-ui/icons//ArrowDropDownOutlined';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import FirebaseService from '../../services/firebaseService';
import {
  selectMobileSidebarOpen,
  setMobileSidebarOpen,
} from '../../features/globalSlice';
import { auth, db } from '../../lib/firebase';
import SidebarOption from '../SidebarOption';
import Switch from '@material-ui/core/Switch';
import {
  selectThemeMode,
  ThemeModeEnum,
  toggleThemeMode,
} from '../../features/themeSlice';

export function Sidebar() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const isLg = useBreakpoint(up('lg'));
  const isMobileSidebarOpen = useAppSelector(selectMobileSidebarOpen);
  const themeMode = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();
  const [channels] = useCollection(collection(db, 'rooms'));
  const [user] = useAuthState(auth);

  const closeMobileSidebar = useCallback(() => {
    dispatch(setMobileSidebarOpen(false));
  }, [dispatch]);

  const handleChange = useCallback(() => {
    dispatch(toggleThemeMode());
  }, [dispatch]);

  const handleChannelSelect = useCallback(
    async (id: string) => {
      navigate(`/${id}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  const handleChannelCreate = useCallback(async () => {
    const channelName = prompt('Please enter the channel name.');
    if (channelName) {
      const response = await FirebaseService.createChannel(channelName);
      navigate(`/${response.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <span>{user?.displayName}'s workspace</span>
        </WorkspaceNameContainer>
        <CreateButton>
          <CreateOutlinedIcon fontSize="small" />
        </CreateButton>
      </SidebarHeader>
      <SidebarBody>
        <SidebarOption Icon={InsertCommentOutlinedIcon} title="Threads" />
        <SidebarOption Icon={ForumOutlinedIcon} title="All DMs" />
        <SidebarOption
          Icon={AlternateEmailOutlinedIcon}
          title="Mentions & reactions"
        />
        <SidebarOption Icon={ApartmentOutlinedIcon} title="Slack Connect" />
        <SidebarList>
          <SidebarOption Icon={ArrowDropDownOutlinedIcon} title="Channels" />
          {channels?.docs.map((doc) => (
            <SidebarOption
              key={doc.id}
              title={doc.data().name}
              actived={roomId === doc.id}
              levels={1}
              onClick={() => handleChannelSelect(doc.id)}
            />
          ))}
          <SidebarOption
            Icon={AddIcon}
            withIconBg
            title="Add Channels"
            levels={1}
            onClick={handleChannelCreate}
          />
        </SidebarList>
      </SidebarBody>
      <SidebarBottom>
        <Switch
          checked={themeMode === ThemeModeEnum.LIGHT}
          size="small"
          onChange={handleChange}
        />
      </SidebarBottom>
    </SidebarContainer>
  );
}

const SidebarContainer = styled(Drawer)`
  display: block;
  flex-shrink: 0;
  width: ${(props) => `${props.theme.sizes['sidebar_width']}px`};
  height: ${(props) =>
    `calc(100vh - ${props.theme.sizes['navigation_height']}px)`};

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
  color: rgba(${(props) => props.theme.colors['sidebar-bg']}, 1);
`;

const WorkspaceNameContainer = styled.div`
  flex: 1;
  min-width: 0;
  overflow: hidden;

  > span {
    display: block;
    min-width: 0;
    font-size: 18px;
    line-height: 1.33334;
    text-align: left;
    font-weight: 700;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: ${(props) =>
      `rgba(${props.theme.colors['sidebar-text--selected']},1)`};
    margin-right: 12px;
  }
`;

const SidebarBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  padding: 12px 0;
`;

const SidebarList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
`;

const SidebarBottom = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 16px;
  box-shadow: 0 0 0 1px
    ${(props) => `rgba(${props.theme.colors['navigation-text']},0.1)`};

  > .MuiSwitch-root {
    align-self: flex-end;

    .MuiSwitch-colorSecondary.Mui-checked {
      color: white;
    }

    .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track {
      background-color: white;
    }
  }
`;
