import { MVPProps } from '../types/interfaces'

export const FieldColumn: React.FC<Partial<MVPProps>> = ({ field }: Partial<MVPProps>) =>
  <>
    {field}
  </>

export default FieldColumn
