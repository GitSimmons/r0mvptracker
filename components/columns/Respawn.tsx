import styled from 'styled-components'
import FlexColumn, { FlexProps } from './FlexColumn'
import { MVPProps } from '../types/interfaces'


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

interface RespawnProps {
  timeToRespawn: number,
  status: string,
  variableRespawn: number,
  respawnRate: number
}

export const RespawnColumn: React.FC<Partial<MVPProps> & FlexProps & RespawnProps> = ({ flex, hideOnMobile, center, timeToRespawn, status, variableRespawn, respawnRate }: Partial<MVPProps> & FlexProps & RespawnProps) =>
  <FlexColumn flex={flex} hideOnMobile={hideOnMobile} center={center} >
    <div style={{ width: "30%" }}>
      {status === "dead" && timeToRespawn + "m"}
      {status === "spawning" && timeToRespawn + variableRespawn + "m"}
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

export default RespawnColumn
