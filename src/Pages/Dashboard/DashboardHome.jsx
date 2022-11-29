import { Avatar } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import SmallSpinner from '../../Components/Spinner/SmallSpinner';
import { AuthContext } from '../../Context/UserContext';

const DashboardHome = () => {
    const { userRole, user, setLoading, loading } = useContext(AuthContext);
    const [iam, setIam] = useState();
    // Products loading 

    useEffect(() => {
        const url = `${import.meta.env.VITE_serverUrl}/singleuser/${user?.uid}`;

        const fetchDataFromApi = async () => {
            try {
                const res = await fetch(url);
                const data = await res.json();
                setIam(data.result);
                setLoading(false);
            } catch (error) {
                console.log(error);
                showAlert('danger', 'Data not found from API Call');
                setLoading(false);
            }

        };
        fetchDataFromApi();
        setLoading(true);

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
                    <li>Name {iam?.name}</li>
                    <li>Role {iam?.role}</li>
                    <li>sellerIsVerified {iam?.sellerIsVerified}</li>
                    <li>email {iam?.email}</li>
                    <li>Admin: {iam?.is_admin ? 'True' : 'False'}</li>
                    <li>uid {iam?.uid}</li>
                    <li>uid {iam?.uid}</li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardHome;