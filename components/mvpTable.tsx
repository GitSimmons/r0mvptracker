import styled from "styled-components";
import HeaderRow from "./mvpTableHeader";
import Row from "./mvpRow";
import { useState } from "react";
import { useMVPs } from "./useMVPs";
import { sortBy } from "./sorts";
import { SortsEnum } from "./types/enums";
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  line-height: 1.5;
  flex-direction: column;
  @media (min-width: 768px) {
    width: 70%;
  }
  padding-bottom: 4rem;
`;

const mvpTable = () => {
  const [columns, setColumns] = useState<SortsEnum[]>([
    SortsEnum.LEVEL,
    SortsEnum.NAME,
    SortsEnum.RESPAWN,
    SortsEnum.SIZE,
    SortsEnum.RACE
  ]);
  const [sort, setSort] = useState<SortsEnum>(SortsEnum.RESPAWN);
  const [watchList, setWatchList] = useState([]);
  const { mvps, loading } = useMVPs();
  return (
    <Container>
      <HeaderRow setSort={setSort} sort={sort} />
      {!loading &&
        sortBy(mvps, sort).map(mvp => (
          <Row
            setWatchList={setWatchList}
            watched={watchList.includes(mvp.name)}
            key={mvp.name}
            name={mvp.name}
            field={mvp.field}
            level={mvp.level}
            size={mvp.size}
            race={mvp.race}
            lastKilled={mvp.lastKilled}
            respawnRate={mvp.respawnRate}
            element={mvp.element}
            variableRespawn={mvp.variableRespawn}
            whoKilled={mvp.whoKilled}
          />
        ))}
    </Container>
  );
};

export default mvpTable;
