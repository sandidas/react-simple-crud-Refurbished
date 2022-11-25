import generatePassword from "./GeneratePassword";

export const storeSingleUserWithJwt = async (user) => {
    let userPassword;
    if (!user.password) {
        userPassword = generatePassword();
    } else {
        userPassword = user.password;
    }
    // StoreSingleUserWithJwtWithJwt

    const userInfo = {
        name: user?.name || 'Unknown User',
        email: user?.email || false,
        photoURL: user?.photoURL,
        role: user?.role || 'Buyer',
        sellerIsVerified: false,
        phoneNumber: user?.phoneNumber,
        uid: user?.uid,
        emailVerified: user?.emailVerified || false,
        description: user?.description || "",
        email_temp: user?.email_temp || "",
        remember_token: user?.remember_token || "",
        is_admin: user?.is_admin || false,
        soft_delete: user?.soft_delete || false,
        lastLoginAt: Date.now(),
        deleted_at: user?.deleted_at || false,
        updated_at: user?.updated_at || Date.now(),
    }
    // since this function is for social login and form registration (not form login), So the only fresh new users are allowed to generate new password. Already existing users no need to create new password
    if (user?.createdAt) { userInfo['password'] = userPassword }



    const uri = `${import.meta.env.VITE_serverUrl}/user/${user?.uid}`;
    const settings = {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(userInfo)
    };
    try {
        const fetchResponse = await fetch(uri, settings);
        const data = await fetchResponse.json();
        console.log(data);
        if (data.success === true) {
            // store jwt token in local storage
            localStorage.setItem('refurbished', data.token);
            return true
        } else if (data.success === false) {
            return false;
        } else {
            return false
        }
    } catch (error) {
        console.log(error);
        return false
    }
}

// this for form login only 
export const getJwtToken = async (currentUser) => {
    const location = `${import.meta.env.VITE_serverUrl}/jwt`;
    const settings = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(currentUser)
    };
    try {
        const fetchResponse = await fetch(location, settings);
        const data = await fetchResponse.json();
        if (data.success === true) {
            // local storage is not the best place to store token, but easiest.
            localStorage.setItem('refurbished', data.token)

        } else if (data.success === false) {
            showAlert('error', data.message)
        } else {
            showAlert('danger', data.message)
        }
    } catch (error) {
        // console.log(error);
        showAlert('danger', "fail to communicate with server: Token")
    }
}