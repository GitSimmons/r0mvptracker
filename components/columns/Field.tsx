import FlexColumn, { FlexProps } from './FlexColumn'
import { MVPProps } from '../types/interfaces'

export const FieldColumn: React.FC<Partial<MVPProps> & FlexProps> = ({ flex, hideOnMobile, center, field }: Partial<MVPProps> & FlexProps) =>
  <FlexColumn flex={flex} hideOnMobile={hideOnMobile} center={center} >
    {field}
  </FlexColumn>

export default FieldColumn
