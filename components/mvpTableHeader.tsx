import styled from "styled-components";
import { SortsEnum, ColumnsEnum } from "./types/enums";
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
  hideOnMobile?: boolean;
  highlighted?: boolean;
}>`
  flex: ${(props): number => (props.flex ? props.flex : null)};
  display: flex;
  align-items: center;
  justify-content: ${(props): string => (props.center ? "center" : "left")};
  display: ${(props): string => (props.hideOnMobile ? "none" : "flex")};
  &:hover {
    cursor: pointer;
    color: #fff;
  }
  @media (min-width: 768px) {
    display: flex;
  }
  color: ${(props): string => (props.highlighted ? "#fff" : "#ddd")};
  text-transform: capitalize;
`;

const Row: React.FC<{ setSort: (sort: SortsEnum) => void, sort: SortsEnum }> = ({ setSort, sort }: { setSort: (sort: SortsEnum) => void, sort: SortsEnum }) => {
  const handleClick = (column: SortsEnum): void => {
    if (column == sort) {
      setSort(SortsEnum.REVERSE);
    } else {
      setSort(column);
    }
  };
  const columns = ["LEVEL", "NAME", "FIELD", "RESPAWN", "SIZE", "RACE"]
  return (
    <StyledRow>
      {
        columns.map((column: string) =>
          <FlexColumn
            key={column}
            flex={ColumnsEnum[column]}
            center={ColumnsEnum[column] === 1}
            hideOnMobile={ColumnsEnum[column] !== 3}
            onClick={(): void => handleClick(SortsEnum[column])}
            highlighted={sort === SortsEnum[column]}
          >
            {column.toLowerCase()}
          </FlexColumn>
        )
      }
    </StyledRow>
  );
};

export default Row;
