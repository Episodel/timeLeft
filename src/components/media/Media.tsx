/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import styled, { css } from 'styled-components'

const size: any = {
  small: 400,
  medium: 960,
  large: 1140,
}

const above = Object.keys(size).reduce((acc: any, label: string) => {
  // eslint-disable-next-line no-param-reassign
  acc[label] = (...args: any) => css`
    @media (max-width: ${size[label] / 16}em) {
      ${css(args)}
    }
  `

  return acc
}, {})

const Heading = styled.div`
  color: #1484e6;
  ${above.small`color: red; background: blue;`}
`

const Media: React.FC = () => {
  return (
    <div>
      <Heading>Media</Heading>
    </div>
  )
}

export default Media
