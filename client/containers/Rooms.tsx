import { useSockets } from "../context/socket.context"
import { useRef } from 'react'
import EVENTS from '../config/events'


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
        <nav>
            <div>
                <input ref={newRoomRef} placeholder="Room name" />
                <button onClick={handleCreateRoom} >Create Room</button>
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

        </nav>
    )
}