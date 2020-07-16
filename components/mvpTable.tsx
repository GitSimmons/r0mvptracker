import styled from 'styled-components';
import { useRouter } from 'next/router';
import * as queryString from 'querystring';
import HeaderRow from './mvpTableHeader';
import Row from './mvpRow';
import Settings from './settings';
import { useState, useEffect } from 'react';
import { useMVPs } from './useMVPs';
import { sortBy } from './sorts';
import { SortsEnum } from './types/enums';

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

const mvpTable: React.FC = () => {
  // use the Router to get params
  const router = useRouter();
  const [sort, setSort] = useState<SortsEnum>(SortsEnum.RESPAWN);
  const [watchList, setWatchList] = useState<string[]>([]);
  const { mvps, loading } = useMVPs();
  const allColumns = [
    'LEVEL',
    'NAME',
    'FIELD',
    'RESPAWN',
    'SIZE',
    'RACE',
    'POINTS',
    'LAST',
    'HIDE',
  ];
  const hiddenColumns = ['FIELD', 'SIZE', 'RACE', 'HIDE'];
  const [columns, setColumns] = useState<string[]>(
    allColumns.filter((column) => !hiddenColumns.includes(column)),
  );
  const [hiddenRows, setHiddenRows] = useState<string[]>([]);
  const hideRow = (row): void => setHiddenRows((prevRows) => [...prevRows, row]);
  const unhideRows = (): void => setHiddenRows([]);
  const toggleColumn = (column): void => {
    setColumns((prevColumns) =>
      prevColumns.includes(column)
        ? prevColumns.filter((test) => test !== column)
        : allColumns.filter((testColumn) => [...prevColumns, column].includes(testColumn)),
    );
  };
  // Build URL string
  let [queryURL, setQueryURL] = useState('');
  useEffect(() => {
    const stateToBeIncludedInURL = {
      sort,
      watchList,
      columns,
      hiddenRows,
    };
    setQueryURL(queryString.stringify(stateToBeIncludedInURL));
  }, [sort, watchList, columns, hiddenRows]);
  // Use an effect hook to update state with params
  useEffect(() => {
    const {
      sort,
      watchList,
      columns,
      hiddenRows,
    }: {
      sort?: SortsEnum;
      watchList?: string[];
      columns?: string[];
      hiddenRows?: string[];
    } = router.query;
    if (sort) {
      setSort(sort);
    }
    if (watchList) {
      setWatchList(watchList);
    }
    if (columns) {
      setColumns(columns);
    }
    if (hiddenRows) {
      setHiddenRows(hiddenRows);
    }
  }, [router]);
  return (
    <Container>
      <HeaderRow setSort={setSort} sort={sort} columns={columns} unhideRows={unhideRows} />
      {!loading &&
        sortBy(mvps, sort)
          .filter((mvp) => !hiddenRows.includes(mvp.name))
          .map((mvp) => (
            <Row
              columns={columns}
              element={mvp.element}
              field={mvp.field}
              hideRow={hideRow}
              key={mvp.name}
              lastKilled={mvp.lastKilled}
              level={mvp.level}
              name={mvp.name}
              points={mvp.points}
              race={mvp.race}
              setWatchList={setWatchList}
              size={mvp.size}
              respawnRate={mvp.respawnRate}
              variableRespawn={mvp.variableRespawn}
              watched={watchList.includes(mvp.name)}
              whoKilled={mvp.whoKilled}
            />
          ))}
      <Settings toggleColumn={toggleColumn} columns={columns} queryURL={queryURL} />
    </Container>
  );
};

export default mvpTable;
