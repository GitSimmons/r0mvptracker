import { MVPProps } from '../types/interfaces';
import { useRankings } from '../useRankings';
export const LastColumn: React.FC<Partial<MVPProps>> = ({ whoKilled }: Partial<MVPProps>) => {
  const { error, loading, rankings } = useRankings();
  return (
    <div
      style={{
        filter: 'grayscale(100%) brightness(500%) contrast(500%) ',
      }}
    >
      {whoKilled + ' '}
      {rankings && rankings.includes(whoKilled) && (
        <span style={{ fontSize: '0.75rem' }}> 👑 </span>
      )}
    </div>
  );
};

export default LastColumn;
