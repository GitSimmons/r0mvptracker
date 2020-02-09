import FlexColumn, { FlexProps } from './FlexColumn'
import { MVPProps } from '../types/interfaces'

export const RaceColumn: React.FC<Partial<MVPProps> & FlexProps> = ({ flex, hideOnMobile, center, race }: Partial<MVPProps> & FlexProps) =>
  <FlexColumn flex={flex} hideOnMobile={hideOnMobile} center={center} >
    {race}
  </FlexColumn>

export default RaceColumn
