import React from 'react'
import ReactAvatar from 'react-avatar'

interface Props {
  round?: boolean;
  size?: string;
  [x:string]: any;
}

function Avatar({ round, size, ...restProps }: Props) {
  return <ReactAvatar round={round} size={size} {...restProps} />
}

Avatar.defaultProps = {
  round: true,
  size: '50',
}

export default Avatar
