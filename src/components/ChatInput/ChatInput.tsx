import styled from 'styled-components';

import SendIcon from '@material-ui/icons/Send';
import { useCallback } from 'react';

type Props = {
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit?: () => void;
};

export function ChatInput({
  placeholder,
  disabled,
  value,
  onChange,
  onSubmit,
}: Props) {
  const handleFormSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();

      if (typeof onSubmit === 'function' && value) {
        onSubmit();
      }
    },
    [onSubmit, value]
  );

  return (
    <ChatInputContainer>
      <form onSubmit={handleFormSubmit}>
        <input placeholder={placeholder} value={value} onChange={onChange} />
        <StyledSendButton type="submit" disabled={disabled}>
          <SendIcon fontSize="small" />
        </StyledSendButton>
      </form>
    </ChatInputContainer>
  );
}

const ChatInputContainer = styled.div`
  flex-shrink: 0;
  width: 100%;
  color: rgba(${(props) => props.theme.colors['primary_foreground']}, 1);
  min-height: 74px;
  padding: 12px 20px 24px;

  > form {
    display: flex;

    > :not(:last-child) {
      margin-right: 8px;
    }

    > input {
      flex: 1;
      min-height: 26px;
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid
        rgba(${(props) => props.theme.colors['primary_foreground']}, 0.3);
      background-color: transparent;
      color: rgba(${(props) => props.theme.colors['primary_foreground']}, 1);
      outline: none;
      font-size: 15px;
      line-height: 24px;
      height: auto;

      :focus {
        border: 1px solid
          rgba(${(props) => props.theme.colors['primary_foreground']}, 0.6);
      }

      ::placeholder {
        color: rgba(
          ${(props) => props.theme.colors['primary_foreground']},
          0.6
        );
      }
    }
  }
`;

interface StyledSendButtonProps {
  disabled?: boolean;
}

const StyledSendButton = styled.button<StyledSendButtonProps>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  align-self: end;
  height: 34px;
  width: 34px;
  border-radius: 999px;
  border: none;
  overflow: hidden;
  background-color: transparent;
  cursor: ${(props) => (props.disabled ? 'inherit' : 'pointer')};

  > .MuiSvgIcon-root {
    color: ${(props) =>
      props.disabled
        ? `rgba(${props.theme.colors['primary_foreground']}, 0.3)`
        : `rgba(${props.theme.colors['sidebar-bg--selected']}, 1)`};
  }
`;
