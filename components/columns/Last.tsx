import { MVPProps } from '../types/interfaces'

export const LastColumn: React.FC<Partial<MVPProps>> = ({ whoKilled }: Partial<MVPProps>) =>
  <>
    {whoKilled}
  </>

export default LastColumn
