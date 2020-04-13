import styled from "styled-components/macro";

export const Columns = styled.div`
  width: 100%;
  display: flex;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  margin: 0 12.5px;
  opacity: ${({ opacity }) => opacity};
  &:first-child {
    margin-left: 25px;
  }
  &:last-child {
    margin-right: 25px;
  }
  outline: 1px solid lightgrey;
`;

export const Header = styled.div`
  background: ${({ color }) => color};
  font-size: 20px;
  font-weight: bold;
`;

export const Cards = styled.div``;

export const Card = styled.div`
  outline: 1px solid orange;
  opacity: ${({ opacity }) => opacity};
`;
