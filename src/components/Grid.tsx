import React from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from '@emotion/styled'

// this component is created for flex-box use, and it's support responsive resize

type MediaQuerySize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

interface GridProps {
  children?: any;
  container?: boolean;
  lg?: MediaQuerySize;
  md?: MediaQuerySize;
  sm?: MediaQuerySize;
  xl?: MediaQuerySize;
  xs?: MediaQuerySize;
  [x:string]: any;
}

const StyledGrid = styled.div<GridProps>`
  ${({
    alignItems, container, flexBasis, justifyContent,
  }) => {
    let styles = container ? 'display: flex; flex-wrap: wrap;' : 'display: grid;'

    if (alignItems) styles += `align-items: ${alignItems};`
    if (justifyContent) styles += `justify-content: ${justifyContent};`
    if (flexBasis) styles += `flex-basis: ${flexBasis};`

    return styles
  }}
`

function Grid({ children, ...restProps }: GridProps) {
  const {
    lg, md, sm, xl, xs,
  } = restProps

  const isExtraLarge = useMediaQuery({ query: '(min-width: 1920px)' })
  const isLarge = useMediaQuery({ query: '(min-width: 1280px)' })
  const isMedium = useMediaQuery({ query: '(min-width: 960px)' })
  const isSmall = useMediaQuery({ query: '(min-width: 600px)' })
  const isExtraSmall = useMediaQuery({ query: '(min-width: 0px)' })

  let flexBasis = 'initial'
  if (xl || lg || md || sm || xs) {
    if (isExtraLarge) flexBasis = `${(xl! || lg || md || sm || xs) * 8.3}%`
    else if (isLarge) flexBasis = `${(lg! || md || sm || xs) * 8.3}%`
    else if (isMedium) flexBasis = `${(md! || sm || xs) * 8.3}%`
    else if (isSmall) flexBasis = `${(sm! || xs) * 8.3}%`
    else if (isExtraSmall) flexBasis = `${xs! * 8.3}%`
  }

  return (
    <StyledGrid flexBasis={flexBasis} {...restProps}>
      {children}
    </StyledGrid>
  )
}

Grid.defaultProps = {
  children: null,
  container: false,
  lg: 0,
  md: 0,
  sm: 0,
  xl: 0,
  xs: 0,
}

export default Grid
