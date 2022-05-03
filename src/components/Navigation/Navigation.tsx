import styled from 'styled-components';
import { up, down } from 'styled-breakpoints';
import Avatar from '@material-ui/core/Avatar';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectMobileSidebarOpen,
  setMobileSidebarOpen,
} from '../../features/globalSlice';
import { useBreakpoint } from 'styled-breakpoints/react-styled';

type Props = {
  className?: string;
};

export function Navigation({ className }: Props) {
  const isLg = useBreakpoint(up('lg'));
  const isMobileSidebarOpen = useAppSelector(selectMobileSidebarOpen);
  const dispatch = useAppDispatch();

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
        <Avatar variant="rounded" />
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
