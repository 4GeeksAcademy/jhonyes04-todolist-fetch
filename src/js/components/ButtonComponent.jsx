import Swal from 'sweetalert2';

export const ButtonComponent = ({
    eliminar: eliminarTodasTareas,
    numeroTareas,
}) => {
    const handleClickEliminar = () => {
        Swal.fire({
            title: '¿Eliminar todas las tareas?',
            text: 'Esta acción no se podrá revertir y se perderán todas las tareas',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarTodasTareas();
                Swal.fire({
                    title: 'Eliminadas',
                    text: 'Todas las tareas han sido eliminadas',
                    icon: 'success',
                });
            }
        });
    };

    return (
        <button
            onClick={handleClickEliminar}
            className={`btn m-3 ${numeroTareas > 0 ? 'btn-danger' : 'btn-secondary'}`}
            disabled={numeroTareas <= 0}
            title="Eliminar todas las tareas"
        >
            <i className="fa-solid fa-trash-can"></i>
        </button>
    );
};
