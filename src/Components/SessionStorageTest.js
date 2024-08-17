// src/Components/SessionStorageTest.js
import React, { useEffect, useState } from 'react';

function SessionStorageTest() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUserData = sessionStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
            console.log("UserData loaded from sessionStorage:", JSON.parse(storedUserData));
        } else {
            console.error("User data not found in sessionStorage");
        }
    }, []);

    return (
        <div>
            {userData ? (
                <div>
                    <p>User Data: {JSON.stringify(userData)}</p>
                </div>
            ) : (
                <p>No user data found. Please log in.</p>
            )}
        </div>
    );
}

export default SessionStorageTest;
