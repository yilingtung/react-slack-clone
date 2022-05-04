import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';

export function Loading() {
  return (
    <LoadingContainer>
      <CircularProgress />
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
