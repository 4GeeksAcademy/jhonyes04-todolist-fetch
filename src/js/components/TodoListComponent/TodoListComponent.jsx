import { useEffect, useState } from 'react';
import { ListForm } from './ListForm/ListForm';
import { ListTareas } from './ListTareas/ListTareas';
import { ListCount } from './ListCount/ListCount';
import { ButtonComponent } from '../ButtonComponent';
import * as api from '../../../api/api';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import './TodoListComponent.css';

const USUARIO = 'jhonyes04';

export const TodoListComponent = () => {
    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        // api.existeUsuario(USUARIO)
        //     .then((existe) => {
        //         if (!existe) return api.postUser(USUARIO);

        //         return null;
        //     })
        //     .then(() => {
        //         obtenerTareas();
        //     })
        //     .catch((error) =>
        //         console.error('Error al comprobar usuario:', error),
        //     );
        const comprobarUsuario = async (nombreUsuario) => {
            try {
                const existe = await api.existeUsuario(nombreUsuario);

                if (!existe) await api.postUser(nombreUsuario);

                obtenerTareas();
            } catch (error) {
                console.error('Error al comprobar usuario:', error);
            }
        };

        comprobarUsuario(USUARIO);
    }, []);

    const obtenerTareas = async () => {
        const todos = await api.getTodos();
        setTareas(todos);
    };

    const agregarTarea = async (tarea) => {
        const existeTarea = tareas.some((t) => t.label === tarea);

        if (existeTarea) {
            toast.error(
                <span>
                    La tarea <strong>{tarea}</strong> ya existe
                </span>,
                {
                    toastId: 'tarea-existe',
                    position: 'top-center',
                    autoClose: 2000,
                    closeOnClick: false,
                },
            );
            return;
        }

        const nuevaTareaTemporal = {
            id: Date.now(),
            label: tarea,
            is_done: false,
        };

        setTareas((prev) => [...prev, nuevaTareaTemporal]);

        try {
            await api.postTodo(tarea);
            await obtenerTareas();

            toast.success(
                <span>
                    Tarea <strong>{tarea}</strong> creada correctamente
                </span>,
                {
                    position: 'top-center',
                    autoClose: 2000,
                    closeOnClick: false,
                },
            );
        } catch (error) {
            console.error('No se pudo agregar la tarea:', error);

            const estadoAnteriorTareas = tareas.filter(
                (prev) => prev.id !== nuevaTareaTemporal.id,
            );

            setTareas(estadoAnteriorTareas);
        }
    };

    const handleClickEliminarTarea = async (id) => {
        await api.deleteTodo(id);
        await obtenerTareas();
    };

    const eliminarTareasTodas = async () => {
        const eliminadas = await api.deleteAllTodos();

        if (!eliminadas) return;

        Swal.fire({
            title: 'Eliminadas',
            text: `Se ${tareas.length > 1 ? 'han' : 'ha'} eliminado ${tareas.length} ${tareas.length > 1 ? 'tareas' : 'tarea'}`,
            icon: 'success',
        });
        setTareas([]);
        await obtenerTareas();
    };

    return (
        <div className="container mt-5">
            <h1>todos</h1>
            <div className="todos">
                <div className="d-flex">
                    <div className="w-100">
                        <ListForm
                            agregarTarea={agregarTarea}
                            numeroTareas={tareas.length}
                        />
                    </div>
                    {tareas.length > 0 && (
                        <ButtonComponent
                            eliminarTareasTodas={eliminarTareasTodas}
                        />
                    )}
                </div>

                <ListTareas
                    tareas={tareas}
                    handleEliminar={handleClickEliminarTarea}
                />

                <ListCount tareas={tareas} />
            </div>
        </div>
    );
};
