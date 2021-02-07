import React from 'react'
import styled from '@emotion/styled'

interface DrawerProps {
  anchor?: 'bottom' | 'left' | 'right' | 'top';
  children?: React.ReactElement | Array<React.ReactElement>;
  fixed?: boolean;
  height?: number;
  open?: boolean;
  width?: number;
  onClose?: () => void;
}

const StyledDrawer = styled.div<DrawerProps>`
  background-color: #f4f5fb;
  border: 1px solid #e6ecf3;
  cursor: default;
  position: absolute;
  ${({
    anchor, height, open, width,
  }) => {
    let styles = `${anchor}: 0;`
    switch (anchor) {
      case 'left':
      case 'right':
        styles += `height: 100vh; width: ${open ? width : 0}px;`
        break
      case 'bottom':
      case 'top':
        styles += `height: ${open ? height : 0}px; width: 100vw;`
        break
      default:
    }

    return styles
  }}
`

const StyledOverlay = styled.div<DrawerProps>`
  background-color: rgba(0,0,0,0.3);
  bottom: 0;
  cursor: pointer;
  display: ${({ open }) => (open ? 'block' : 'none')};
  height: 100%;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 1;   
`

function Drawer({
  children, fixed, onClose, ...restProps
}: DrawerProps) {
  const { open } = restProps

  return (
    fixed ? (
      <StyledDrawer {...restProps}>
        {children}
      </StyledDrawer>
    ) : (
      <StyledOverlay open={open} onClick={onClose}>
        <StyledDrawer {...restProps} onClick={(e) => { e.preventDefault(); e.stopPropagation() }}>
          {children}
        </StyledDrawer>
      </StyledOverlay>
    )
  )
}

Drawer.defaultProps = {
  anchor: 'left',
  children: null,
  fixed: false,
  height: 250,
  open: false,
  width: 250,
  onClose: null,
}

export default Drawer
