import styled from 'styled-components'
const StyledEye = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
font-size: 24px;
overflow: hidden;
font-style: normal;
line-height: 1rem;
text-align: center;
background-color: royalblue;
transition: background 0.2s ease;
&:hover {
  background-color: blueviolet
}
`
export const HideColumn: React.FC<{ hideRow: any, name: string }> = ({ hideRow, name }: any) =>
  <StyledEye onClick={(e): void => {
    e.stopPropagation();
    hideRow(name)
  }
  }>
    👁
  </StyledEye>

export default HideColumn
