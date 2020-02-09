import styled from 'styled-components'

export interface FlexProps {
  flex: number,
  center?: boolean,
  hideOnMobile?: boolean
}

export const FlexColumn = styled.div<FlexProps>`
  flex: ${(props): number => (props.flex ? props.flex : null)};
  display: flex;
  align-items: center;
  justify-content: ${(props): string => (props.center ? "center" : "left")};
  display: ${(props): string => (props.hideOnMobile ? "none" : "flex")};
  @media (min-width: 768px) {
    display: flex;
  }
`;

export default FlexColumn
