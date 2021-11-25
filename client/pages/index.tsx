import { useRef, useEffect } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSockets } from '../context/socket.context'
import RoomsContainer from '../containers/Rooms'
import MessagesContainer from '../containers/Messages'


const UsernameWrapper = styled.div`
  
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
  }

  useEffect(() => {
    if (usernameRef) {
      usernameRef.current.value = localStorage.getItem('username') || ''
    }
  }, [])

  return (
    <div>
      {!username && (
      <UsernameWrapper>
          <UsernameInner>
            <form>
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
    </div>
  );
}
