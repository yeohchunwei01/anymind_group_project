import React from 'react'
import styled from '@emotion/styled'
import Box from '@/components/Box'
import Grid from '@/components/Grid'
import Typography from '@/components/Typography'

interface ButtonProps {
  children?: any;
  color?: string;
  endIcon?: React.ReactElement;
  fullWidth?: boolean;
  startIcon?: React.ReactElement;
  [x:string]: any;
}

const StyledButton = styled.button<ButtonProps>`
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    height: fit-content;
    padding: 10px 15px;
    ${({ color, fullWidth }) => (
    `
      background-color: ${color};
      width: ${fullWidth ? 'auto' : 'fit-content'};
    `
  )};
`

function Button({
  children, endIcon, startIcon, ...restProps
}: ButtonProps) {
  return (
    <StyledButton {...restProps}>
      <Grid alignItems="center" container>
        {startIcon && (
        <Box mr={5}>
          {startIcon}
        </Box>
        )}
        <Typography textAlign="center">{children}</Typography>
        {endIcon && (
        <Box ml={5}>
          {endIcon}
        </Box>
        )}
      </Grid>
    </StyledButton>
  )
}

Button.defaultProps = {
  children: null,
  color: '#17a2b8',
  endIcon: null,
  fullWidth: false,
  startIcon: null,
}

export default Button
