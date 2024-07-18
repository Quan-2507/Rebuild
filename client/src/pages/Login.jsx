import React, { useState, useEffect } from "react";
import { createBrowserHistory } from 'history';
import imagePath from '../utils/image/logo.png'
import '../index.css'
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [socket, setSocket] = useState(null);
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);
    const [userList, setUserList] = useState([]);
    const history = createBrowserHistory();

    useEffect(() => {
        const newSocket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

        newSocket.addEventListener("open", (event) => {
            console.log("Kết nối WebSocket đã được thiết lập", event);
            setSocket(newSocket);
        });

        return () => {
            newSocket.close();
        };
    }, []);

    const register = () => {
        window.location.href = '/register';
    }

    const loginAndGetUserList = () => {
        if (!username || !password) {
            setError('Vui lòng nhập tên đăng nhập và mật khẩu');
            return;
        }

        if (!socket || socket.readyState !== WebSocket.OPEN) {
            setError('Không thể kết nối đến WebSocket Server');
            return;
        }

        const loginData = {
            action: 'onchat',
            data: {
                event: 'LOGIN',
                data: {
                    user: username,
                    pass: password,
                },
            },
        };
        socket.send(JSON.stringify(loginData));
        console.log("Đã gửi thông tin login cho server")

        const userList = {
            action: 'onchat',
            data: {
                event: 'GET_USER_LIST',
            },
        };
        socket.send(JSON.stringify(userList));
        console.log("Đã gửi yêu cầu lấy danh sách cho server")
        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            if (response && response.status === "success" && response.event === 'LOGIN') {
                sessionStorage.setItem('relogin_code', btoa(response.data.RE_LOGIN_CODE));
                console.log("Đã lưu relogin_code vào session")
            }
            if (response && response.status === "error" && response.event === 'LOGIN') {
                setError(response.mes);
                console.log(response.mes);
            }
            if (response.status === 'success' && response.event === 'GET_USER_LIST') {
                const users = response.data;
                setUserList(users);
                setIsLoginSuccess(true);
                console.log("đã lưu vào users")
                history.push('/', { userList: users }, { setUserList: setUserList })
                console.log("Đã chuyển sang trang '/'")
                setError(response.mes)
                window.location.href = '/'
            }
        }
    }

    useEffect(() => {
        if (isLoginSuccess) {
            sessionStorage.setItem('username', username);
        }

        if (socket) {
            socket.onmessage = (event) => {
                const responseData = JSON.parse(event.data);
                if (responseData && responseData.status === "success") {
                    sessionStorage.setItem('relogin_code', btoa(responseData.data.RE_LOGIN_CODE));
                }
                if (responseData && responseData.event === "LOGIN" && responseData.status === "error") {
                    setError(responseData.mes);
                    console.log(responseData.mes)
                }
            };
        }
    }, [socket, isLoginSuccess, username, password]);

    return (
        <div className="login-page  d-flex align-items-center justify-content-center"> {/* Đưa ảnh và form đăng nhập xuống giữa */}
            <MDBContainer fluid className="p-0 m-0 h-100">
                <MDBRow className="h-100">
                    <MDBCol col='12' md='7' className="d-flex align-items-center justify-content-center">
                        <img src={imagePath} className="img-fluid" alt="Phone image" />
                    </MDBCol>
                    <MDBCol col='12' md='5' className="d-flex align-items-center justify-content-center">
                        <div className="login-form-wrapper">
                            <MDBInput wrapperClass='mb-4' label='Username' id='formControlLg' value={username} onChange={(e) => setUsername(e.target.value)} size="lg" />
                            <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' value={password} onChange={(e) => setPassword(e.target.value)} size="lg" />
                            <div className="d-flex justify-content-between mx-4 mb-4">
                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                                <a href="!#">Quên mật khẩu?</a>
                            </div>
                            <MDBBtn className="mb-4 w-100" size="lg" onClick={loginAndGetUserList}>Đăng nhập</MDBBtn>
                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0">HOẶC</p>
                            </div>
                            <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#3b5998' }}>
                                <MDBIcon fab icon="facebook-f" className="mx-2" />
                                Tiếp tục với Facebook
                            </MDBBtn>
                            <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#c51f3d' }}>
                                <MDBIcon fab icon="google" className="mx-2" />
                                Tiếp tục với gmail
                            </MDBBtn>
                            <p className="small fw-bold mt-2 pt-1 mb-2">Bạn chưa có tài khoản ? <a href="/register" className="link-danger">Đăng ký ngay</a></p>
                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default Login;