import styled from 'styled-components';

type Props = {
  className?: string;
};

export function Header({ className }: Props) {
  return (
    <HeaderContainer className={className}>
      <HeaderLeft>header</HeaderLeft>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  padding: 10px 20px;
  background-color: rgba(var(--color-secondary-default, 1));
  color: white;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex: 0.3;
  align-items: center;
`;
