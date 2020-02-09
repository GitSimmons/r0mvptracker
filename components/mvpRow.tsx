import styled from "styled-components";
import differenceInMinutes from "date-fns/differenceInMinutes";
import { useState, useEffect } from "react";
import { useInterval } from "./useInterval";
import { StatusEnum } from "./types/enums";
import { MVPProps } from "./types/interfaces";
import Name from './columns/Name'
import Level from './columns/Level'
import Field from './columns/Field'
import Respawn from './columns/Respawn'
import Race from './columns/Race'
import Size from './columns/Size'

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
  const [timeToRespawn, setTimeToRespawn] = useState(lastKilled
    ? differenceInMinutes(lastKilled, new Date()) + respawnRate
    : null);
  const [status, setStatus] = useState<StatusEnum>(StatusEnum.UNKNOWN);
  const getStatus: () => void = () => {
    !timeToRespawn && timeToRespawn !== 0
      ? setStatus(StatusEnum.UNKNOWN)
      : timeToRespawn <= -variableRespawn
        ? setStatus(StatusEnum.ALIVE)
        : (timeToRespawn > -variableRespawn && timeToRespawn <= 0)
          ? setStatus(StatusEnum.SPAWNING)
          : setStatus(StatusEnum.DEAD)
  };
  useEffect(() => getStatus(), [timeToRespawn])
  const getRespawn: () => number = () =>
    lastKilled
      ? differenceInMinutes(lastKilled, new Date()) + respawnRate
      : null;
  // TODO: Clear the interval somewhere so we don't need to disable eslint
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const respawnTickRefresh: void = useInterval(() => {
    setTimeToRespawn(getRespawn());
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
      <Level flex={1} hideOnMobile center level={level} />
      <Name flex={3} element={element} name={name} />
      <Field flex={2} hideOnMobile field={field} />
      <Respawn flex={3} timeToRespawn={timeToRespawn} status={status} variableRespawn={variableRespawn} respawnRate={respawnRate} />
      <Size flex={1} center hideOnMobile size={size} />
      <Race flex={2} hideOnMobile race={race} />
      {/* <FlexColumn flex={2} hideOnMobile>
        {whoKilled}
      </FlexColumn> */}
    </StyledRow>
  );
};

export default Row;
