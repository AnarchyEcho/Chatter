import { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useSockets } from '../context/socket.context'
import RoomsContainer from '../containers/Rooms'
import MessagesContainer from '../containers/Messages'

const Main = styled.div`

`
const UsernameWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 50vh;
  width: 100%;
  height: 100%;
`
const UsernameInner = styled.div`

`
const Container = styled.div`

`

export default function Home() {
  const { socket, username, setUsername } = useSockets()
  const usernameRef = useRef(null)

  function handleUsername() {
    const value = usernameRef.current.value
    if (!value) {
      return
    }

    setUsername(value)
    localStorage.setItem('username', value)

    const date = new Date()

    // Set it expire in 7 days
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = username+"="+value+"; expires="+date.toUTCString()+"; path=/";
  }

  useEffect(() => {
    if (usernameRef) {
      usernameRef.current.value = localStorage.getItem('username') || ''
    }
  }, [])

  return (
    <Main>
      {!username && (
      <UsernameWrapper>
          <UsernameInner>
            <form action={null}>
              <input placeholder="username" ref={usernameRef} />
              <button type="submit" onClick={handleUsername} >Login</button>
            </form>
          </UsernameInner>
        </UsernameWrapper>
      )}
      {username && (
        <Container>
          <RoomsContainer />
          <MessagesContainer />
        </Container>
      )}
    </Main>
  );
}
