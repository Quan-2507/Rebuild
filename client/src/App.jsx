import './App.css';

import React from "react";
import Login from './pages/Login';
import {Route, Routes, BrowserRouter, Navigate} from 'react-router-dom';
import Register from './pages/Register';
import Chat from './pages/Chat';

function isUserLoggedIn() {
    // Kiểm tra giá trị của username trong sessionStorage
    const username = sessionStorage.getItem('username');
    return !!username; // Trả về true nếu đã đăng nhập, ngược lại trả về false
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                        {isUserLoggedIn() ? (
                            <Route path="/" element={<Chat/> }/>
                        ) : (
                            <Route path="*" element={<Navigate to="/login"/>}/>
                        )}
            </Routes>
        </BrowserRouter>
    );
}

export default App
