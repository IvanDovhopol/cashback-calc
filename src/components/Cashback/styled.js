import styled from 'styled-components';

export const Table = styled.table`
  font-family: ${p => p.theme.fonts.regular};
  font-size: ${p => p.theme.fontSizes.m};
  text-align: center;
  margin: ${p => p.theme.space[0]}px auto;
`;

export const Heading = styled.th`
  font-weight: ${p => p.theme.fontWeights.bold};
  background-color: ${p => p.theme.colors.tableAccent};
  padding: ${p => p.theme.space[5]}px ${p => p.theme.space[7]}px;
  border-radius: ${p => p.theme.radii.medium};
`;

export const Row = styled.tr`
  background-color: ${p => p.theme.colors.table};
  &:nth-child(even) {
    background-color: ${p => p.theme.colors.tableAccent};
  }
`;

export const Body = styled.td`
  position: relative;
  border-radius: ${p => p.theme.radii.medium};
  text-align: center;
  padding: ${p => p.theme.space[1]}px ${p => p.theme.space[5]}px;
  &:first-child {
    padding: ${p => p.theme.space[1]}px ${p => p.theme.space[1]}px;
    /* text-align: left; */
  }
`;

export const Copy = styled.button`
  /* position: absolute; */
  /* top: 10%;
  right: 1%; */
  background-color: transparent;
  text-transform: none;
  padding: ${p => p.theme.space[3]}px;
  letter-spacing: 1px;
  cursor: pointer;
  border: none;
  border-radius: ${p => p.theme.radii.medium};

  &:hover {
    color: red;
  }
`;