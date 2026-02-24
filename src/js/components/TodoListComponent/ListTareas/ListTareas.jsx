import './ListTareas.css';

export const ListTareas = ({ tareas, handleEliminar }) => {
    return (
        <>
            {tareas.map((tarea) => (
                <div className="tarea" key={tarea.id}>
                    <p className="m-0">{tarea.label}</p>
                    <button
                        onClick={() => handleEliminar(tarea.id)}
                        className="btn-eliminar"
                    >
                        <i className="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            ))}
        </>
    );
};
