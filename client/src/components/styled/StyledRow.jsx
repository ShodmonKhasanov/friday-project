import styled from "styled-components";
import Row from "react-bootstrap/Row";

export const StyledRow = styled(Row)`
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 0 10px #ccc;
  transition: box-shadow 0.5s;
  &:hover {
    box-shadow: 0 0 15px #aaa;
  }
`;