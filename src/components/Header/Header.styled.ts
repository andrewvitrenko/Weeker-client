import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Box)`
  flex-grow: 1;
`;

export const Title = styled(Typography)`
  flex-grow: 1;
`;

export const NavLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;
