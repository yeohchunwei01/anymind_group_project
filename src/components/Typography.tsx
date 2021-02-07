import React from 'react'
import styled from '@emotion/styled'

// this component is created for font formating

interface TypographyProps {
  children: string;
  color?: string;
  fontWeight?: number;
  fontSize?: number;
  lineHeight?: number;
  textAlign?: 'center' | 'left' | 'right';
}

const StyledTypography = styled.div<TypographyProps>`
  ${({
    color, fontWeight, fontSize, lineHeight, textAlign,
  }) => (
    `
      color: ${color};
      font-weight: ${fontWeight};
      font-size: ${fontSize}px;
      line-height: ${lineHeight};
      text-align: ${textAlign};
    `
  )}
`

function Typography({ children, ...restProps }: TypographyProps) {
  return (
    <StyledTypography {...restProps}>
      {children}
    </StyledTypography>
  )
}

Typography.defaultProps = {
  color: 'inherit',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: 1.5,
  textAlign: 'left',
}

export default Typography
