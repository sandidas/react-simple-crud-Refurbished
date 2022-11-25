const handleStoreUser = (user) => {
    fetch('https://server-side-xi.vercel.app/user', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(data => {

            if (data.success) {
             //  console.log(data);
                 alert(data.message);
                 return data.success;
            } else { return false }
        })
}


export const deleteUser = (id) => {
    console.log('user from utility: ', id);

    fetch(`https://server-side-xi.vercel.app/users/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
                alert('user deleted success');
            }
            return data;
        })
}

export const updateUserData = (id, userUpdatedata) => {
    console.log(userUpdatedata);
    fetch(`https://server-side-xi.vercel.app/users/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(userUpdatedata)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
                alert('user update success');
            }
            return data;
        })
}