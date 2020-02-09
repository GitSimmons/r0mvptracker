import FlexColumn, { FlexProps } from './FlexColumn'
import { MVPProps } from '../types/interfaces'

export const LevelColumn: React.FC<Partial<MVPProps> & FlexProps> = ({ flex, hideOnMobile, center, level }: Partial<MVPProps> & FlexProps) =>
  <FlexColumn flex={flex} hideOnMobile={hideOnMobile} center={center} >
    {level}
  </FlexColumn>

export default LevelColumn
