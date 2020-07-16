import { MVPProps } from '../types/interfaces';

export const PointsColumn: React.FC<Partial<MVPProps>> = ({ points }: Partial<MVPProps>) => (
  <div style={{ width: '3ch', maxHeight: '1rem' }}>
    <p
      style={{
        fontSize: '6px',
        wordWrap: 'break-word',
        whiteSpace: 'pre',
        textAlign: 'center',
        margin: 'auto',
      }}
    >
      {points === 1 && '⭐'}
      {points === 2 && '⭐⭐'}
      {points === 3 && '⭐⭐\n⭐'}
      {points === 4 && '⭐⭐\n⭐⭐'}
      {points === 5 && '⭐⭐⭐\n⭐⭐'}
    </p>
  </div>
);

export default PointsColumn;
