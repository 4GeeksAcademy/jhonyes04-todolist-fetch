import Swal from 'sweetalert2';

export const ButtonComponent = ({ eliminarTareasTodas }) => {
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
                eliminarTareasTodas();
            }
        });
    };

    return (
        <button
            onClick={handleClickEliminar}
            className="btn btn-danger m-3 ms-0"
            title="Eliminar todas las tareas"
        >
            <i className="fa-solid fa-trash-can"></i>
        </button>
    );
};
