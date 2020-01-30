import styled from "styled-components";
import { SortsEnum } from "./types/enums";
const StyledRow = styled.div`
  background-color: "#ccc" !important;
  width: 100%;
  color: white;
  display: flex;
  font-weight: 500;
  font-family: Roboto, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 14px;
  padding-left: 1rem;
  @media (min-width: 768px) {
    padding-left: 0;
  }
`;
const FlexColumn = styled.div<{
  flex: number;
  center?: boolean;
  hidden?: boolean;
  highlighted?: boolean;
}>`
  flex: ${props => (props.flex ? props.flex : null)};
  display: flex;
  align-items: center;
  justify-content: ${props => (props.center ? "center" : "left")};
  display: ${props => (props.hidden ? "none" : "flex")};
  &:hover {
    cursor: pointer;
    color: #fff;
  }
  @media (min-width: 768px) {
    display: flex;
  }
  color: ${props => (props.highlighted ? "#fff" : "#ddd")};
`;

const Row = ({ setSort, sort }: { setSort: any; sort: SortsEnum }) => {
  const handleClick = (column: SortsEnum) => {
    if (column == sort) {
      setSort(SortsEnum.REVERSE);
    } else {
      setSort(column);
    }
  };
  return (
    <StyledRow>
      <FlexColumn
        flex={1}
        center
        hidden
        onClick={() => handleClick(SortsEnum.LEVEL)}
        highlighted={sort === SortsEnum.LEVEL}
      >
        Level
      </FlexColumn>
      <FlexColumn
        flex={3}
        onClick={() => handleClick(SortsEnum.NAME)}
        highlighted={sort === SortsEnum.NAME}
      >
        MVP
      </FlexColumn>
      <FlexColumn
        flex={2}
        hidden
        onClick={() => handleClick(SortsEnum.FIELD)}
        highlighted={sort === SortsEnum.FIELD}
      >
        Field
      </FlexColumn>
      <FlexColumn
        flex={3}
        onClick={() => handleClick(SortsEnum.RESPAWN)}
        highlighted={sort === SortsEnum.RESPAWN}
      >
        Respawn
      </FlexColumn>
      <FlexColumn
        flex={1}
        center
        hidden
        onClick={() => handleClick(SortsEnum.SIZE)}
        highlighted={sort === SortsEnum.SIZE}
      >
        Size
      </FlexColumn>
      <FlexColumn
        flex={2}
        hidden
        onClick={() => handleClick(SortsEnum.RACE)}
        highlighted={sort === SortsEnum.RACE}
      >
        Race
      </FlexColumn>
      {/* <FlexColumn flex={2} hidden>
        Killed By
      </FlexColumn> */}
    </StyledRow>
  );
};

export default Row;
