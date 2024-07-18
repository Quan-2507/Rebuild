export function handleChange1(event, setRoomName) {
    console.log("handleChange1 called", event.target.value);
    setRoomName(event.target.value);
}

export function handleChange2(event, setMess) {
    console.log("handleChange2 called", event.target.value);
    setMess(event.target.value);
}

export function joinPeople(roomName, mess, handleJoinPeople, setRoomName, setMess, toggleShow, getListUser) {
    console.log("joinPeople called", roomName, mess);
    if (roomName !== "") {
        handleJoinPeople(roomName, mess);
        setRoomName('');
        setMess('');
        toggleShow();
        getListUser();
    }
}
