import styled from 'styled-components';

import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';

type Props = {
  Icon?: OverridableComponent<SvgIconTypeMap>;
  withIconBg?: boolean;
  actived?: boolean;
  title?: string;
  levels?: number;
  onClick?: (e: React.MouseEvent) => void;
};

export function SidebarOption({
  Icon,
  withIconBg,
  actived,
  title,
  levels = 0,
  onClick,
}: Props) {
  return (
    <SidebarOptionContainer
      withIconBg={withIconBg}
      actived={actived}
      levels={levels}
      role="button"
      tabIndex={0}
      onClick={onClick}
    >
      {Icon ? <Icon fontSize="small" /> : <StyledHash>#</StyledHash>}
      {title && <StyledTitle>{title}</StyledTitle>}
    </SidebarOptionContainer>
  );
}

type SidebarOptionContainerProps = Pick<
  Props,
  'onClick' | 'withIconBg' | 'actived' | 'levels'
>;

const SidebarOptionContainer = styled.div<SidebarOptionContainerProps>`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 28px;
  line-height: 28px;
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 16px;
  padding-left: calc(16px + 8px * ${(props) => props.levels});
  font-size: 15px;
  color: ${(props) =>
    props.actived
      ? `rgba(${props.theme.colors['sidebar-text--selected']},1)`
      : `rgba(${props.theme.colors['sidebar-text']},1)`};
  background-color: ${(props) =>
    props.actived
      ? `rgba(${props.theme.colors['sidebar-bg--selected']},1)`
      : 'inherit'};
  cursor: ${(props) =>
    typeof props.onClick === 'function' ? 'pointer' : 'inherit'};

  :hover {
    background-color: ${(props) =>
      props.actived
        ? `rgba(${props.theme.colors['sidebar-bg--selected']},1)`
        : typeof props.onClick === 'function'
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

const StyledHash = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  margin-right: 6px;
`;
