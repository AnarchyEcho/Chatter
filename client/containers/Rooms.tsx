import { useSockets } from "../context/socket.context"
import { useEffect, useRef } from 'react'
import EVENTS from '../config/events'
import styled from "styled-components"

const Navigation = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    padding-right: 10px;
    margin-top: 10px;
    margin-left: 10px;
    border-right: 2px solid #fff;
    width: fit-content;
    height: 100vh;
    overflow-y: scroll;
`

export default function RoomsContainer() {
    const { socket, roomId, rooms } = useSockets()
    const newRoomRef = useRef(null)

    function handleCreateRoom() {
        const roomName = newRoomRef.current.value || "";

        if (!String(roomName).trim()) return;

        socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName })

        newRoomRef.current.value = ""
    }

    function handleJoinRoom(key) {
        if (key === roomId) return;
        
        socket.emit(EVENTS.CLIENT.JOIN_ROOM, key)
    }

    return (
        <Navigation>
            <div>
                <input ref={newRoomRef} placeholder="Room name" />
                <button onClick={handleCreateRoom}>Create Room</button>
            </div>

            {Object.keys(rooms).map((key) => {
                return (
                    <div key={key}>
                        <button
                        disabled={key === roomId}
                        title={`Join ${rooms[key].name}`}
                        onClick={() => handleJoinRoom(key)}
                        >
                            {rooms[key].name}
                        </button>
                    </div>
                )
            }
        )}

        </Navigation>
    )
}