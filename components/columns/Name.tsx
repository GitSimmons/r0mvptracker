import FlexColumn, { FlexProps } from './FlexColumn'
import { MVPProps } from '../types/interfaces'

export const NameColumn: React.FC<Partial<MVPProps> & FlexProps> = ({ flex, hideOnMobile, center, element, name }: Partial<MVPProps> & FlexProps) =>
  <FlexColumn flex={flex} hideOnMobile={hideOnMobile} center={center} >
    {
      <img
        src={`/static/elements/${element.toLowerCase()}.png`}
        alt={`${element} icon`}
        height="18px"
        style={{ margin: "2px 2px 2px 2px" }}
      />
    }
    {name}
  </FlexColumn>

export default NameColumn
