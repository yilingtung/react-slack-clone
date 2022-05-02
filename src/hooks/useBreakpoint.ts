import { up, only, down } from 'styled-breakpoints';
import { useBreakpoint } from 'styled-breakpoints/react-styled';

export const useBreakpoints = () => {
  const isXs = useBreakpoint(down('sm'));
  const isSm = useBreakpoint(only('sm'));
  const isMd = useBreakpoint(only('md'));
  const isLg = useBreakpoint(only('lg'));
  const isXl = useBreakpoint(up('xl'));

  return {
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
  };
};

export default useBreakpoints;
