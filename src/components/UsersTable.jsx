export const UsersTable = ({ users, handleDelete }) => {
    return (
        <>
            <p className="Table-title">Lista de usuarios</p>
            <div className="Table-wrapper">
                <table className="Table">
                    <thead>
                        <tr className="Table-thead">
                            <th className="Table-th">Nombre</th>
                            <th className="Table-th">Usuario/Email</th>
                            <th className="Table-th">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(({ _id, name, username }) => (
                            <tr key={_id}>
                                <td className="Table-td">{name}</td>
                                <td className="Table-td">{username}</td>
                                <td className="Table-td">
                                    <button className="Table-btn" onClick={() => handleDelete(_id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}