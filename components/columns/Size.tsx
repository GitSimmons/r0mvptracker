import FlexColumn, { FlexProps } from './FlexColumn'
import { MVPProps } from '../types/interfaces'

export const SizeColumn: React.FC<Partial<MVPProps> & FlexProps> = ({ flex, hideOnMobile, center, size }: Partial<MVPProps> & FlexProps) =>
  <FlexColumn flex={flex} hideOnMobile={hideOnMobile} center={center} >
    {size && size.slice(0, 1)}
  </FlexColumn>

export default SizeColumn
