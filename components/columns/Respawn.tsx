import styled from 'styled-components'
import { MVPProps } from '../types/interfaces'


const ProgressBar = styled.div`
  width: 80%;
  height: 8px;
  border-radius: 5px;
  background: #674114;
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

export const RespawnColumn: React.FC<Partial<MVPProps> & RespawnProps> = ({ timeToRespawn, status, variableRespawn, respawnRate }: Partial<MVPProps> & RespawnProps) =>
  <>
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
  </>

export default RespawnColumn
