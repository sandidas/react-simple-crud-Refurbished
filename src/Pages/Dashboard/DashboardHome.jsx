import { Avatar } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import SmallSpinner from '../../Components/Spinner/SmallSpinner';
import { AuthContext } from '../../Context/UserContext';
import useTitle from '../../Hooks/useTitle';

const DashboardHome = () => {
    useTitle('Dashboard');
    const { userRole, user, loading } = useContext(AuthContext);
    const [iam, setIam] = useState('');
    // Products loading 

    useEffect(() => {
        const url = `${import.meta.env.VITE_serverUrl}/singleuser/${user?.uid}`;

        const fetchDataFromApi = async () => {
            try {
                const res = await fetch(url);
                const data = await res.json();
                setIam(data.data);
            } catch (error) {
                showAlert('danger', 'Data not found from API Call');
            }
        };
        fetchDataFromApi();
    }, []);

    // console.log(user);
    if (loading) {
        return <SmallSpinner />
    }

    return (
        <div className='space-y-4'>
            <div>
                <Avatar src={iam?.photoURL} size='lg' alt="it's me" />
                <h1>Hello <strong>{iam?.name}</strong>, Welcome Again!</h1>
                <p>You are operation an <strong>{userRole}</strong> type of account. </p>

                <p>Please navigate using left and top navigation/menu bar. - Thank you  </p>

                <hr />

                <p className='py-3'> <strong>Short Summery of your account:</strong> </p>
                <ul>
                    <li> <strong>Name: </strong> {iam?.name}</li>
                    <li> <strong>Role: </strong> {iam?.role}</li>
                    <li> <strong>Seller Verified</strong> {iam?.sellerIsVerified}</li>
                    <li> <strong>Email:</strong> {iam?.email}</li>
                    <li> <strong>Admin:</strong> {iam?.is_admin ? 'True' : 'False'}</li>
                    <li> <strong>#</strong> {iam?.uid}</li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardHome;