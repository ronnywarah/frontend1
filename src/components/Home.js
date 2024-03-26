import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import './home.css';

function Home() {
    const location = useLocation();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get(`http://localhost:8000/user/${location.state.id}`);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError(error.message); // Set the error message
            }
        }

        fetchUserData();
    }, [location.state.id]);

    useEffect(() => {
        function calculateRemainingDays() {
            if (userData && userData.subscriptionStartDate) {
                var remainingDaysElement = document.getElementById('remainingDays');
                var expiryDateValueElement = document.getElementById('expiryDateValue');

                var subscriptionStartDate = new Date(userData.subscriptionStartDate);
                var subscriptionDurationDays = 30;

                var currentDate = new Date();
                var subscriptionEndDate = new Date(subscriptionStartDate);
                subscriptionEndDate.setDate(subscriptionEndDate.getDate() + subscriptionDurationDays);
                var remainingDays = Math.max(0, Math.ceil((subscriptionEndDate - currentDate) / (1000 * 60 * 60 * 24)));

                remainingDaysElement.textContent = remainingDays;
                expiryDateValueElement.textContent = subscriptionEndDate.toDateString();

                if (currentDate > subscriptionEndDate) {
                    alert('Your subscription has ended. Please make a payment for reactivation.');
                }
            }
        }

        calculateRemainingDays();
    }, [userData]);

    return (
        <div>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                userData ? (
                    <div className="container">
                        <div className="box">
                            <div className="topbar">
                                <div className="left">Connected Devices: <span>{userData.connectedDevices}</span></div>
                                <div className="center">Network Device Name: <span>{userData.networkDevicesname}</span></div>
                                <div className="right">Username: <span>{userData.username}</span></div>
                            </div>
                            <div className="div1">
                                <div>
                                    <p><i className="fas fa-wallet" style={{ color: "orange" }}></i> Current Balance: <span><i className="fas fa-dollar-sign"></i>{userData.currentBalance}</span></p>
                                    <p><i className="fas fa-coins" style={{ color: "orange" }}></i> Amount Due: Ksh <span><i className="fas fa-money-bill-alt"></i>{userData.Amount}</span></p>
                                </div>
                                <div>
                                    <p><i className="fas fa-check fa-lg" style={{ color: "#2fb90c" }} ></i> Payment Status: <span><i className={userData.paymentStatus === "Paid" ? "fas fa-check-circle" : "fas fa-times-circle"}></i>{userData.paymentStatus}</span></p>
                                </div>
                            </div>
                            <div className="div2">
                                <p>Current Package</p>
                                <div className="net">
                                    <div>
                                        <p className="span"><span><i className="fas fa-signal"></i>{userData.networkSpeed}</span></p>
                                        <p>Network Speed</p>
                                    </div>
                                    <div className="line"></div>
                                    <div>
                                        <p className="span"><span id="remainingDays"></span> Days</p>
                                        <p>Expires on: <span id="expiryDateValue"></span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="div3">
                                <div>
                                    <p><i className="fa-solid fa-signal" style={{ color: "#dcedf9" }}></i> Signal Strength </p>
                                    <p className="dbm"><i className="fas fa-signal"></i>{userData.signalStrength}</p>
                                </div>
                            </div>
                            <div className="net">
                                <a href="https://wa.me/+254772809396" target="_blank" rel="noopener noreferrer">Chat with us on WhatsApp</a>
                                <a href="/" className="button">Log out</a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            )}
        </div>
    );
}

export default Home;
