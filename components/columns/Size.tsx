
import { MVPProps } from '../types/interfaces'

export const SizeColumn: React.FC<Partial<MVPProps>> = ({ size }: Partial<MVPProps>) =>
  <>
    {size && size.slice(0, 1)}
  </>

export default SizeColumn
