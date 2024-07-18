import React, { useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBTypography,
    MDBInput,
    MDBBtnGroup,
    MDBBtn,
} from "mdb-react-ui-kit";
import moment from "moment-timezone";
import CreateRoom from "../CreateRoom";

const formatDate = (dateString) => {
    // Giả định dateString là UTC
    const utcDate = moment.utc(dateString); // Chuyển đổi chuỗi ngày giờ thành thời gian UTC
    const vnDate = utcDate.tz('Asia/Ho_Chi_Minh'); // Chuyển đổi thời gian sang múi giờ Việt Nam

    const currentDate = moment.tz('Asia/Ho_Chi_Minh');

    if (
        vnDate.date() === currentDate.date() &&
        vnDate.month() === currentDate.month() &&
        vnDate.year() === currentDate.year()
    ) {
        return vnDate.format('HH:mm');
    } else {
        return vnDate.format('DD/MM/YYYY');
    }
};

export default function UserChat({ userList, handleUserClick, selectedUser }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [userTypeFilter, setUserTypeFilter] = useState("all"); // 'all', 'group', 'user'

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleUserTypeFilter = (type) => {
        setUserTypeFilter(type);
    };

    const filteredUsers = userList.filter((user) => {
        const isInSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
        if (userTypeFilter === "all") {
            return isInSearch;
        } else if (userTypeFilter === "group") {
            return user.type === 1 && isInSearch; // Filter groups
        } else {
            return user.type === 0 && isInSearch; // Filter users
        }
    });

    const circleStyle = {
        borderRadius: '2rem',
    };

    return (
        <MDBCard style={circleStyle} className="mb-3">
            <MDBCardBody>
                <MDBInput
                    type="text"
                    label="Tìm kiếm"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="me-3 mb-2" // Thêm class mb-2 để tạo khoảng cách dưới MDBInput
                    style={{ maxWidth: '200px' }} // Thêm maxWidth để giới hạn chiều rộng của MDBInput
                />
                <MDBBtnGroup className="mt-1 d-flex align-items-center" style={{paddingBottom:'5px'}}>
                    <MDBBtn
                        color={userTypeFilter === "all" ? "primary" : "outline-primary"}
                        onClick={() => handleUserTypeFilter("all")}
                        className="mx-1 btn-sm"
                        style={{ borderRadius: '0.25rem', fontSize: '0.75rem', border: 'none' }}
                    >
                        Tất cả
                    </MDBBtn>
                    <MDBBtn
                        color={userTypeFilter === "group" ? "primary" : "outline-primary"}
                        onClick={() => handleUserTypeFilter("group")}
                        className="mx-1 btn-sm"
                        style={{ borderRadius: '0.25rem', fontSize: '0.75rem', border: 'none' }}
                    >
                        Nhóm
                    </MDBBtn>
                    <MDBBtn
                        color={userTypeFilter === "user" ? "primary" : "outline-primary"}
                        onClick={() => handleUserTypeFilter("user")}
                        className="mx-1 btn-sm"
                        style={{ borderRadius: '0.25rem', fontSize: '0.75rem', border: 'none' }}
                    >
                        Người dùng
                    </MDBBtn>
                </MDBBtnGroup>
                <MDBTypography style={{ maxHeight: "460px", overflowY: "auto", scrollbarWidth: "thin", scrollbarColor: "rgba(0, 0, 0, 0.1) transparent" }} listUnStyled className="mb-0">
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
                                            className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                            width="60"/>
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
                                    <p style={{marginRight: 10}}
                                       className="small text-muted mb-1">{formatDate(user.actionTime)}</p>
                                </div>
                            </a>
                        </li>
                    ))}
                </MDBTypography>
            </MDBCardBody>
        </MDBCard>
    );
}
