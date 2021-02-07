import React from 'react'
import styled from '@emotion/styled'

// this component is created for box sizing

interface BoxProps {
  children?: any;
  m?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  mt?: number;
  mx?: number;
  my?: number;
  p?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  pt?: number;
  px?: number;
  py?: number;
  [x:string]: any;
}

const StyledBox = styled.div<BoxProps>`
    ${({
    m, mb, ml, mr, mt, mx, my, p, pb, pl, pr, pt, px, py,
  }) => (
    `
      margin-bottom: ${m || my || mb}px;
      margin-left: ${m || mx || ml}px;
      margin-right: ${m || mx || mr}px;
      margin-top: ${m || my || mt}px;
      padding-bottom: ${p || py || pb}px;
      padding-left: ${p || px || pl}px;
      padding-right: ${p || px || pr}px;
      padding-top: ${p || py || pt}px;
    `
  )}
`

function Box({ children, ...restProps }: BoxProps) {
  return (
    <StyledBox {...restProps}>
      {children}
    </StyledBox>
  )
}

Box.defaultProps = {
  children: null,
  m: 0,
  mb: 0,
  ml: 0,
  mr: 0,
  mt: 0,
  mx: 0,
  my: 0,
  p: 0,
  pb: 0,
  pl: 0,
  pr: 0,
  pt: 0,
  px: 0,
  py: 0,
}

export default Box
