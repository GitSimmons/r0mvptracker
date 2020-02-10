import styled from 'styled-components'
import { ColumnsEnum } from '../types/enums'

export interface FlexProps {
  flex: number,
  center?: boolean,
  hideOnMobile?: boolean
}

export const StyledFlexColumn = styled.div<FlexProps>`
  flex: ${(props): number => (props.flex ? props.flex : null)};
  display: flex;
  align-items: center;
  justify-content: ${(props): string => (props.center ? "center" : "left")};
  display: ${(props): string => (props.hideOnMobile ? "none" : "flex")};
  white-space: nowrap;
  overflow-x: hidden;
  margin: ${(props): string => props.flex === 1 ? '0 0' : '0 0.5rem'};
@media(min-width: 768px) {
  display: flex;
}
`;

export const FlexColumn: React.FC<{ type: string, children: React.ReactNode }> = ({ type, children }: { type: string, children: React.ReactNode }) =>
  <StyledFlexColumn
    flex={ColumnsEnum[type]}
    center={ColumnsEnum[type] === 1}
    hideOnMobile={ColumnsEnum[type] !== 3}
  >
    {children}
  </StyledFlexColumn>


export default FlexColumn
