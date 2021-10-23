import React from 'react';

const NotAuth = () => {
    return (
        <>
            <main className="max-w-screen-xl mx-auto  px-2.5 py-5 h-screen flex justify-center items-center border-red-300">
                <h1 className="text-white user-page-title">
                    請登入會員才能享有後續服務
                </h1>
            </main>
        </>
    );
};

export default NotAuth;
