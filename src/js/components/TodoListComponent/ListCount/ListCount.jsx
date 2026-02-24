import './ListCount.css';

export const ListCount = ({ tareas }) => {
    const totalTareas =
        tareas.length > 0
            ? `${tareas.length} ${tareas.length === 1 ? 'tarea' : 'tareas'} por hacer`
            : 'No hay tareas pendientes';
    return (
        <div className="numero-tareas">
            <p>{totalTareas}</p>
        </div>
    );
};
