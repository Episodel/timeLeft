import React from 'react'
import styled from 'styled-components'
import Timer from './components/Timer'
import GlobalStyle from './styles/GlobalStyle'

const AppContainer = styled.div`
  background-color: #808b96;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const App: React.FC = () => {
  return (
    <AppContainer>
      <GlobalStyle />
      <Timer />
    </AppContainer>
  )
}

export default App
