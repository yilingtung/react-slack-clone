import styled from 'styled-components';

import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';

type Props = {
  Icon?: OverridableComponent<SvgIconTypeMap>;
  withIconBg?: boolean;
  title?: string;
  onClick?: (e: React.MouseEvent) => void;
};

export function SidebarOption({ Icon, withIconBg, title, onClick }: Props) {
  return (
    <SidebarOptionContainer
      withIconBg={withIconBg}
      role="button"
      tabIndex={0}
      onClick={onClick}
    >
      {Icon && <Icon fontSize="small" />}
      {title && <StyledTitle>{title}</StyledTitle>}
    </SidebarOptionContainer>
  );
}

type SidebarOptionContainerProps = Pick<Props, 'onClick' | 'withIconBg'>;

const SidebarOptionContainer = styled.div<SidebarOptionContainerProps>`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 28px;
  line-height: 28px;
  padding: 0 16px;
  font-size: 15px;
  color: ${(props) => `rgba(${props.theme.colors['sidebar-text']},1)`};
  cursor: ${(props) =>
    typeof props.onClick === 'function' ? 'pointer' : 'inherit'};

  :hover {
    background-color: ${(props) =>
      typeof props.onClick === 'function'
        ? `rgba(${props.theme.colors['sidebar-bg--hover']},1)`
        : 'inherit'};
  }

  > .MuiSvgIcon-root {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    margin-right: 6px;
    border-radius: 4px;
    background-color: ${(props) =>
      props.withIconBg
        ? `rgba(${props.theme.colors['sidebar-text']},0.1)`
        : 'inherit'};
  }
`;

const StyledTitle = styled.div`
  margin-right: auto;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
