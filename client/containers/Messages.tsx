import { useSockets } from "../context/socket.context"
import { useRef } from "react"
import EVENTS from '../config/events'
import styled from "styled-components"

const Chat = styled.div`
    display: flex;
    position: absolute;
    right: 5%;
    flex-direction: column;
    height: 100%;
    width: 72vw;
    justify-content: center;
    align-items: center;
    text-align: center;
`
const ChatMessages = styled.div`
    word-wrap: break-word;
    width: 100%;
`
const ChatSend = styled.div`
    display: flex;
    gap: 5px;
    position: fixed;
    bottom: 10px;
    left: auto;
    right: auto;
`
const TextArea = styled.textarea`
    width: 70vw;
    height: 5em;
    background-color: #404040;
    color: #fff;
    ::placeholder {
        color: #f5f5f590;
    }
`

export default function MessagesContainer() {
    const { socket, messages, roomId, username, setMessages } = useSockets()
    const newMessageRef = useRef(null)

    function handleSendMessage() {
        const message = newMessageRef.current.value;

        if(!String(message).trim()) return;
    

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, {roomId, message, username})

    const date = new Date()

    setMessages([
        ...messages,{
            username: 'You',
            message,
            time: `${date.getHours()}:${date.getMinutes()}`,
        }
    ])

    newMessageRef.current.value = ""
    document.getElementById('messageField').focus()
}

    const dated = new Date()
    const ms = dated.getMilliseconds().toString()

    if (!roomId) {
        return <div />
    }

    return (
        <Chat>
            {messages.map(({message}, index) => {
                return (
                    <ChatMessages>
                        <p key={ms}><b>{username}</b>: {message}</p>
                    </ChatMessages>
                )
            })}

            <ChatSend>
                <TextArea
                placeholder="Send a message"
                ref={newMessageRef}
                id="messageField"
                style={{resize: "none"}}
                />
                <button onClick={handleSendMessage}>Send</button>
            </ChatSend>
        </Chat>
    )
}