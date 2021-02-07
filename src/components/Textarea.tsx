import React from 'react'
import styled from '@emotion/styled'

const StyledTextarea = styled.textarea`
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-family: inherit;
  font-size: 16px;
  padding: .375rem .75rem;
`

function Textarea(props: any) {
  return <StyledTextarea {...props} />
}

export default Textarea
