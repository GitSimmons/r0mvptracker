import styled from 'styled-components';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import { useState, useEffect, ReactElement } from 'react';
import { useInterval } from './useInterval';
import { StatusEnum } from './types/enums';
import { MVPProps } from './types/interfaces';
import { FlexColumn } from './columns/FlexColumn';
import Field from './columns/Field';
import Hide from './columns/Hide';
import Last from './columns/Last';
import Level from './columns/Level';
import Name from './columns/Name';
import Race from './columns/Race';
import Respawn from './columns/Respawn';
import Size from './columns/Size';
import Points from './columns/Points';

const theme = {
  alive: 'rgb(67,178,121)',
  spawning: 'rgb(168,162,67)',
  dead: 'rgb(175,75,75)',
};
// TODO: Move colors into variables, maybe use SASS to highlight base colors.
const StyledRow = styled.div<{ status: StatusEnum; watched?: boolean }>`
  display: flex;
  align-self: center;
  transition: background 0.5s ease;
  background-color: ${(props): string =>
    props.status === StatusEnum.DEAD
      ? 'rgb(175,75,75)'
      : props.status === StatusEnum.ALIVE
      ? 'rgb(67,168,121)'
      : props.status === StatusEnum.SPAWNING
      ? 'rgb(168,162,67)'
      : '#aaa'};
  filter: ${(props): string => (props.watched == true ? 'contrast(150%)' : 'contrast(100%)')};
  color: white;
  display: flex;
  font-weight: 500;
  font-family: Roboto, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
  margin-top: 2px;
  padding: 0 1rem;
  font-style: ${(props): string => (props.watched ? 'italic' : 'auto')};
  width: ${(props): string => (props.watched ? '101%' : '100%')};
  @media (min-width: 768px) {
    padding: 0 0;
  }
  &:hover {
    filter: contrast(150%);
  }
`;
const Row: React.FC<MVPProps & { columns: string[]; hideRow: any }> = ({
  columns,
  element,
  field,
  hideRow,
  lastKilled,
  level,
  name,
  points,
  race,
  respawnRate,
  setWatchList,
  size,
  variableRespawn,
  watched,
  whoKilled,
}: MVPProps & { columns: string[]; hideRow: any }) => {
  const [timeToRespawn, setTimeToRespawn] = useState(
    lastKilled ? differenceInMinutes(lastKilled, new Date()) + respawnRate : null,
  );
  const [status, setStatus] = useState<StatusEnum>(StatusEnum.UNKNOWN);
  const getStatus: () => void = () => {
    !timeToRespawn && timeToRespawn !== 0
      ? setStatus(StatusEnum.UNKNOWN)
      : timeToRespawn <= -variableRespawn
      ? setStatus(StatusEnum.ALIVE)
      : timeToRespawn > -variableRespawn && timeToRespawn <= 0
      ? setStatus(StatusEnum.SPAWNING)
      : setStatus(StatusEnum.DEAD);
  };
  useEffect(() => getStatus(), [timeToRespawn]);
  const getRespawn: () => number = () =>
    lastKilled ? differenceInMinutes(lastKilled, new Date()) + respawnRate : null;
  // TODO: Clear the interval somewhere so we don't need to disable eslint
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const respawnTickRefresh: void = useInterval(() => {
    setTimeToRespawn(getRespawn());
  }, 1000);
  const getComponentFromType = (type: string): ReactElement => {
    switch (type) {
      case 'FIELD': {
        return <Field field={field} />;
      }
      case 'HIDE': {
        return <Hide hideRow={hideRow} name={name} />;
      }
      case 'LAST': {
        return <Last whoKilled={whoKilled} />;
      }
      case 'LEVEL': {
        return <Level level={level} />;
      }
      case 'NAME': {
        return <Name name={name} element={element} />;
      }
      case 'POINTS': {
        return <Points points={points} />;
      }
      case 'RACE': {
        return <Race race={race} />;
      }
      case 'RESPAWN': {
        return (
          <Respawn
            timeToRespawn={timeToRespawn}
            status={status}
            variableRespawn={variableRespawn}
            respawnRate={respawnRate}
          />
        );
      }
      case 'SIZE': {
        return <Size size={size} />;
      }
    }
  };
  return (
    <StyledRow
      watched={watched}
      status={status}
      onClick={(): void =>
        setWatchList((prevState: string[]) => {
          if (prevState.includes(name)) {
            return prevState.filter((mvpName) => mvpName !== name);
          }
          return [...prevState, name];
        })
      }
    >
      {columns.map((column) => (
        <FlexColumn type={column} key={name + column}>
          {getComponentFromType(column)}
        </FlexColumn>
      ))}
    </StyledRow>
  );
};

export default Row;
