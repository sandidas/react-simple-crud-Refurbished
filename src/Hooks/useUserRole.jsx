import { useEffect, useState } from "react"

const useUserRole = (uid) => {
    const [userRole, setUserRole] = useState(false);
    const [isRoleLoading, setIsRoleLoading] = useState(true);

    useEffect(() => {
        if (uid) {
            const urlApi = `http://localhost:5000/usertype/${uid}`;

            fetch(urlApi)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setUserRole(data.typeOfUser);
                        setIsRoleLoading(false);
                    }
                });
        }

    }, [uid]);
    return [userRole, isRoleLoading]

}
export default useUserRole;