import { MVPProps } from '../types/interfaces'

export const NameColumn: React.FC<Partial<MVPProps>> = ({ element, name }: Partial<MVPProps>) =>
  <>
    {
      <img
        src={`/static/elements/${element.toLowerCase()}.png`}
        alt={`${element} icon`}
        height="18px"
        style={{ margin: "2px 2px 2px 2px" }}
      />
    }
    {name}
  </>

export default NameColumn
