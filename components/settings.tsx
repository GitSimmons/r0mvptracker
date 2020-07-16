import styled from 'styled-components';
import { useState } from 'react';
import QueryForm from './queryurl';

const StyledSettings = styled.div`
  display: none;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  color: white;
  text-align: center;
  color: white;
  padding: 0;
  @media (min-width: 768px) {
    display: flex;
  }
`;
const StyledSettingsButton = styled.button`
  font-size: 2rem;
  /* line-height: 1.5rem; */
  color: #fff;
  opacity: 0.5;
  background: transparent;
  outline: none;
  border: none;
  transition: opacity 0.2s ease;
  span {
    font-size: 0.75rem;
    text-transform: uppercase;
  }
  &:hover {
    opacity: 1;
  }
  padding-bottom: 1rem;
`;
const SettingsContainer = styled.div<{ visible: boolean }>`
  display: ${(props): string => (props.visible ? 'block' : 'none')};
  width: 100%;
  font-size: 14px;
  text-transform: uppercase;
  font-family: Roboto, 'Open Sans', 'Helvetica Neue', sans-serif;
  list-style: none;
  li {
    display: inline-block;
  }
`;
const ColumnButton = styled.button<{ isVisible: boolean }>`
  color: white;
  background: ${(props): string => (props.isVisible ? '#43a879' : '#a84344')};
  font-size: 14px;
  margin: 0.1rem;
  padding: 0.2rem 0.5rem;
  border: none;
  outline: none;
  &:hover {
    background: ${(props): string => (props.isVisible ? '#29c17a' : '#bb2f31')};
  }
`;

export const Settings: React.FC<{ columns: string[]; toggleColumn: any; queryURL: string }> = ({
  columns,
  toggleColumn,
  queryURL,
}) => {
  const [visible, setVisible] = useState(false);
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
  return (
    <StyledSettings>
      <StyledSettingsButton onClick={(): void => setVisible(!visible)}>
        <span>Settings</span>
        <br />⚙
      </StyledSettingsButton>
      <SettingsContainer visible={visible}>
        Visible Columns
        <ul>
          {allColumns.map((column) => (
            <li key={column} onClick={(): void => toggleColumn(column)}>
              <ColumnButton isVisible={columns.includes(column)}>{column}</ColumnButton>
            </li>
          ))}
        </ul>
        Link with your settings
        <QueryForm queryURL={queryURL} />
      </SettingsContainer>
    </StyledSettings>
  );
};

export default Settings;
