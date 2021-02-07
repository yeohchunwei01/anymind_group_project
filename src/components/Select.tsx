import React from 'react'
import styled from '@emotion/styled'

interface SelectProps {
  children: React.ReactElement | Array<React.ReactElement>;
  value: string;
  [x:string]: any;
}

function Select({ children, value, ...restProps }: SelectProps) {
  const childrenArray = Array.isArray(children) ? [...children] : [children]
  const menuItems = childrenArray.filter(
    (child) => child.type === MenuItem,
  )

  return (
    <StyledSelect value={value} {...restProps}>
      {menuItems}
    </StyledSelect>
  )
}

interface MenuItemProps {
  children: any;
  value: string;
}

function MenuItem({
  children,
  value,
}: MenuItemProps) {
  return <option value={value}>{children}</option>
}

const StyledSelect = styled.select`
    background-clip: padding-box;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    color: #495057;
    display: block;
    font-size: 1rem;
    font-weight: 400;
    height: calc(1.5em + .75rem + 2px);
    line-height: 1.5;
    padding: .375rem .75rem;
    text-transform: none;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    width: 100%; 
`

export default Select
export { MenuItem }
