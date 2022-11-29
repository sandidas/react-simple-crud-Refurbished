import React from 'react';

const AdminProductsCell = () => {
    return (
        <>
            <tr className="text-left">
                <td className="p-3">id</td>
                <td className="p-3">Photo</td>
                <td className="p-3">Original Price</td>
                <td className="p-3">Resale Price</td>
                <td className="p-3">Status</td>
                <td className="p-3">Action</td>
            </tr>
        </>
    );
};

export default AdminProductsCell;