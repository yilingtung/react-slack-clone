import styled from 'styled-components';

import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';

type Props = {
  Icon?: OverridableComponent<SvgIconTypeMap>;
  title?: string;
};

export function SidebarOption({ Icon, title }: Props) {
  return (
    <SidebarOptionContainer>
      {Icon && <Icon fontSize="small" />}
      {title && <StyledTitle>{title}</StyledTitle>}
    </SidebarOptionContainer>
  );
}

const SidebarOptionContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 28px;
  line-height: 28px;
  padding: 0 16px;
  font-size: 15px;
  color: ${(props) => `rgba(${props.theme.colors['sidebar-text']},1)`};

  :hover {
    background-color: ${(props) =>
      `rgba(${props.theme.colors['sidebar-bg--hover']},1)`};
  }

  > .MuiSvgIcon-root {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    margin-right: 6px;
  }
`;

const StyledTitle = styled.div`
  margin-right: auto;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
