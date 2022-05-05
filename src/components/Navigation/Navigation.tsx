import styled from 'styled-components';
import { up, down } from 'styled-breakpoints';
import Avatar from '@material-ui/core/Avatar';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import {
  selectMobileSidebarOpen,
  setMobileSidebarOpen,
} from '../../features/globalSlice';
import { useBreakpoint } from 'styled-breakpoints/react-styled';
import { auth } from '../../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Popover from '@material-ui/core/Popover';
import { useCallback, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import { signOut } from 'firebase/auth';

type Props = {
  className?: string;
};

export function Navigation({ className }: Props) {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = Boolean(anchorEl);
  const isLg = useBreakpoint(up('lg'));
  const isMobileSidebarOpen = useAppSelector(selectMobileSidebarOpen);
  const dispatch = useAppDispatch();
  const [user] = useAuthState(auth);

  const handleClick = useCallback((event: React.MouseEvent<Element>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const logout = useCallback(() => {
    signOut(auth);
  }, []);

  return (
    <NavigationContainer className={className} role="navigation">
      <LeftContainer>
        <AccessTimeIcon
          onClick={() => {
            if (isLg) {
              return;
            }
            dispatch(setMobileSidebarOpen(!isMobileSidebarOpen));
          }}
        />
      </LeftContainer>
      <SearchContainer>
        <SearchIcon fontSize="small" />
        <input
          type="text"
          placeholder="Search messages, files, around corners, under rugs, etc."
        />
      </SearchContainer>
      <RightContainer>
        <HelpOutlineIcon fontSize="small" />
        <Avatar
          variant="rounded"
          src={user?.photoURL || undefined}
          onClick={handleClick}
        />

        <StyledPopover
          id={open ? 'simple-popover' : undefined}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <PopoverHeader>
            <Avatar variant="rounded" src={user?.photoURL || undefined} />
            <h3>{user?.displayName}</h3>
          </PopoverHeader>
          <Divider />
          <button onClick={logout}>
            Sign up of {user?.displayName}'s workspaceworkspaceworkspace
            workspace
          </button>
        </StyledPopover>
      </RightContainer>
    </NavigationContainer>
  );
}

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  padding: 8px 0;
  background-color: ${(props) =>
    `rgba(${props.theme.colors['navigation-bg']},1)`};
  color: ${(props) => `rgba(${props.theme.colors['navigation-text']},1)`};
  box-shadow: 0 1px 0 0
    ${(props) => `rgba(${props.theme.colors['navigation-text']},0.1)`};
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: 16px;

  ${up('lg')} {
    flex: 1;
    padding-right: 20px;
  }

  ${down('lg')} {
    flex-grow: 0;
    padding-right: 16px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
  justify-content: center;
  position: relative;

  > input {
    flex: 1;
    height: 26px;
    padding: 0 8px 0 36px;
    outline: 0;
    border-radius: 6px;
    border: 1px solid
      ${(props) => `rgba(${props.theme.colors['navigation-text']},0.2)`};
    background-color: ${(props) =>
      `rgba(${props.theme.colors['navigation-text']},0.2)`};
    color: ${(props) => `rgba(${props.theme.colors['navigation-text']},1)`};

    ::placeholder {
      color: ${(props) => `rgba(${props.theme.colors['navigation-text']},1)`};
      opacity: 0.6;
    }

    :hover,
    :focus {
      border: 1px solid
        ${(props) => `rgba(${props.theme.colors['navigation-text']},0.3)`};
      background-color: ${(props) =>
        `rgba(${props.theme.colors['navigation-text']},0.3)`};
    }
  }

  > .MuiSvgIcon-root {
    position: absolute;
    left: 8px;
    pointer-events: none;
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 16px;

  ${up('lg')} {
    flex: 1;
    padding-left: 32px;
  }

  ${down('lg')} {
    flex-grow: 0;
    padding-left: 16px;
  }

  > :not(:last-child) {
    margin-right: 12px;
  }

  > .MuiAvatar-root {
    display: flex;
    width: 26px;
    height: 26px;
    cursor: pointer;

    :hover {
      opacity: 0.8;
    }
  }
`;

const StyledPopover = styled(Popover)`
  > .MuiPaper-root {
    width: 300px;
    max-width: 360px;
    min-width: 200px;
    max-height: calc(100vh - 62px);
    margin-top: 6px;
    padding: 12px 0;
    color: rgba(${(props) => props.theme.colors['popover-text']}, 1);
    background-color: rgba(${(props) => props.theme.colors['popover-bg']}, 1);
    border-radius: 6px;
    user-select: none;
    overflow-y: auto;

    > .MuiDivider-root {
      margin: 8px 0;
    }

    > button {
      display: block;
      width: 100%;
      padding: 0 24px;
      line-height: 28px;
      text-align: start;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border: none;
      outline: none;
      cursor: pointer;
      background-color: transparent;
      color: rgba(${(props) => props.theme.colors['popover-text']}, 1);

      :hover {
        color: rgba(
          ${(props) => props.theme.colors['sidebar-text--selected']},
          1
        );
        background-color: rgba(
          ${(props) => props.theme.colors['sidebar-bg--selected']},
          1
        );
      }
    }
  }
`;

const PopoverHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 24px;

  > .MuiAvatar-root {
    display: flex;
    flex-shrink: 0;
    height: 36px;
    width: 36px;
  }

  > h3 {
    display: block;
    min-width: 0;
    font-size: 15px;
    font-weight: 900;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-left: 12px;
  }
`;
