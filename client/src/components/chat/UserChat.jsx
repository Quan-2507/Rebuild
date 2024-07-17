import React, { useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBTypography,
    MDBInput,
} from "mdb-react-ui-kit";
import CreateRoom from "../CreateRoom";

export default function UserChat({ userList, handleUserClick, selectedUser }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = userList.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const circleStyle = {
        borderRadius: '2rem',
    };

    return (
        <MDBCard style={circleStyle} className="mb-3">
            <MDBCardBody>
                <MDBInput
                    type="text"
                    label="Search users"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <MDBTypography style={{ height: "525px", overflow: "scroll" }} listUnStyled className="mb-0">
                    {filteredUsers.map((user, index) => (
                        <li key={index} className="p-2 border-bottom" onClick={() => handleUserClick(user.name, user.type)}>
                            <a
                                style={circleStyle}
                                className={selectedUser === user.name ? 'd-flex justify-content-between btn-secondary' : 'd-flex justify-content-between'}
                            >
                                <div className="d-flex flex-row">
                                    {user.type === 0 ? (
                                        <img
                                            src="./img/people.png"
                                            alt="avatar"
                                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                            width="60"
                                        />
                                    ) : (
                                        <img
                                            src="./img/room.png"
                                            alt="avatar"
                                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                            width="60"
                                        />
                                    )}
                                    <div className="pt-1">
                                        <p className="fw-bold mb-0">{user.name}</p>
                                        <p className="small text-muted">
                                            {/* Additional user information */}
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-1">
                                    <p style={{ marginRight: 10 }} className="small text-muted mb-1">{user.actionTime}</p>
                                </div>
                            </a>
                        </li>
                    ))}
                </MDBTypography>
            </MDBCardBody>
        </MDBCard>
    );
}