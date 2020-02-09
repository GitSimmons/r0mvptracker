import styled from "styled-components";
import differenceInMinutes from "date-fns/differenceInMinutes";
import { useState } from "react";
import { useInterval } from "./useInterval";
import { StatusEnum } from "./types/enums";
import { MVPProps } from "./types/interfaces";

const ProgressBar = styled.div`
  width: 80%;
  height: 8px;
  border-radius: 5px;
  background: #674114;
  margin-right: 1.2rem;
  @media (min-width: 768px) {
    margin-right: 0;
  }
`;

const ProgressTracker = styled.div<{ percentage: string }>`
  height: 100%;
  width: ${(props): string => (props.percentage ? props.percentage : null)};
  border-radius: 5px;
  background: #fff;
  transition: width 0.5s ease;
`;

// TODO: Move colors into variables, maybe use SASS to highlight base colors.
const StyledRow = styled.div<{ status: StatusEnum; watched?: boolean }>`
  display: flex;
  align-self: center;
  transition: background 0.5s ease;
  background-color: ${(props): string =>
    props.status === StatusEnum.DEAD && props.watched == true
      ? "#bb2f31"
      : props.status === StatusEnum.ALIVE && props.watched == true
        ? "#29c17a"
        : props.status === StatusEnum.SPAWNING && props.watched == true
          ? "#beb52d"
          : props.status === StatusEnum.DEAD
            ? "#a84344"
            : props.status === StatusEnum.ALIVE
              ? "#43a879"
              : props.status === StatusEnum.SPAWNING
                ? "#a8a243"
                : "#aaa"};
  color: white;
  display: flex;
  font-weight: 500;
  font-family: Roboto, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 14px;
  margin-top: 2px;
  padding-left: 1rem;
  font-style: ${(props): string => (props.watched ? "italic" : "auto")};
  width: ${(props): string => (props.watched ? "101%" : "100%")};
  @media (min-width: 768px) {
    padding-left: 0;
  }
  &:hover {
    background-color: ${(props): string =>
    props.status == "dead"
      ? "#bb2f31"
      : props.status == "alive"
        ? "#29c17a"
        : props.status == "spawning"
          ? "#beb52d"
          : "#aaa"};
  }
`;
const FlexColumn = styled.div<{
  flex: number;
  center?: boolean;
  hidden?: boolean;
}>`
  flex: ${(props): number => (props.flex ? props.flex : null)};
  display: flex;
  align-items: center;
  justify-content: ${(props): string => (props.center ? "center" : "left")};
  display: ${(props): string => (props.hidden ? "none" : "flex")};
  @media (min-width: 768px) {
    display: flex;
  }
`;

const Row: React.FC<MVPProps> = ({
  name,
  level,
  lastKilled,
  field,
  size,
  race,
  respawnRate,
  element,
  variableRespawn,
  setWatchList,
  watched,
  // whoKilled
}: MVPProps) => {
  const [timeToRespawn, setTimeToRespawn] = useState(
    lastKilled
      ? differenceInMinutes(lastKilled, new Date()) + respawnRate
      : null
  );
  const [status, setStatus] = useState<StatusEnum>(
    !timeToRespawn && timeToRespawn !== 0
      ? StatusEnum.UNKNOWN
      : timeToRespawn <= -10 ||
        (variableRespawn && timeToRespawn <= -variableRespawn)
        ? StatusEnum.ALIVE
        : (timeToRespawn > -10 && timeToRespawn <= 0) ||
          (variableRespawn &&
            timeToRespawn >= -variableRespawn &&
            timeToRespawn <= 0)
          ? StatusEnum.SPAWNING
          : StatusEnum.DEAD
  );
  const respawn: () => number = () =>
    lastKilled
      ? differenceInMinutes(lastKilled, new Date()) + respawnRate
      : null;
  const resetStatus: () => void = () => {
    !timeToRespawn && timeToRespawn !== 0
      ? setStatus(StatusEnum.UNKNOWN)
      : timeToRespawn <= -10 ||
        (variableRespawn && timeToRespawn <= -variableRespawn)
        ? setStatus(StatusEnum.ALIVE)
        : (timeToRespawn > -10 && timeToRespawn <= 0) ||
          (variableRespawn &&
            timeToRespawn >= -variableRespawn &&
            timeToRespawn <= 0)
          ? setStatus(StatusEnum.SPAWNING)
          : setStatus(StatusEnum.DEAD);
  };
  // TODO: Clear the interval somewhere so we don't need to disable eslint
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const respawnTickRefresh: void = useInterval(() => {
    setTimeToRespawn(respawn());
    resetStatus();
  }, 1000);
  return (
    <StyledRow
      watched={watched}
      status={status}
      onClick={(): void =>
        setWatchList((prevState: string[]) => {
          if (prevState.includes(name)) {
            return prevState.filter(mvpName => mvpName !== name);
          }
          return [...prevState, name];
        })
      }
    >
      <FlexColumn flex={1} center hidden>
        {level}
      </FlexColumn>
      <FlexColumn flex={3}>
        {name && (
          <img
            src={`/static/elements/${element.toLowerCase()}.png`}
            height="18px"
            style={{ margin: "2px 2px 2px 2px" }}
          ></img>
        )}
        {name}
      </FlexColumn>
      <FlexColumn flex={2} hidden>
        {field}
      </FlexColumn>
      <FlexColumn flex={3}>
        <div style={{ width: "30%" }}>
          {status === "dead" && timeToRespawn + "m"}
          {variableRespawn
            ? status === "spawning" && timeToRespawn + variableRespawn + "m"
            : status === "spawning" && timeToRespawn + 10 + "m"}
        </div>
        {status === "dead" && (
          <ProgressBar>
            <ProgressTracker
              percentage={`${((respawnRate - timeToRespawn) / respawnRate) *
                100}%`}
            />
          </ProgressBar>
        )}
      </FlexColumn>
      <FlexColumn flex={1} center hidden>
        {size && size.slice(0, 1)}
      </FlexColumn>
      <FlexColumn flex={2} hidden>
        {race}
      </FlexColumn>
      {/* <FlexColumn flex={2} hidden>
        {whoKilled}
      </FlexColumn> */}
    </StyledRow>
  );
};

export default Row;
