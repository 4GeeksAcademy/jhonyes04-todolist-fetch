import { useEffect, useState } from 'react';
import { ListForm } from './ListForm/ListForm';
import { ListTareas } from './ListTareas/ListTareas';
import { ListCount } from './ListCount/ListCount';
import { ButtonComponent } from '../ButtonComponent';
import * as api from '../../../api/api';

import './TodoListComponent.css';

const URL_API = 'https://playground.4geeks.com/todo';
const USUARIO = 'pepito';

export const TodoListComponent = () => {
    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        obtenerTareas();
    }, []);

    const obtenerTareas = async () => {
        try {
            const todos = await api.getTodos();
            setTareas(todos);
        } catch (error) {
            console.error(error.message);
        }
    };

    const agregarTarea = async (tarea) => {
        const nuevaTareaTemporal = {
            id: Date.now(),
            label: tarea,
            is_done: false,
        };

        setTareas((prev) => [...prev, nuevaTareaTemporal]);

        try {
            await api.postTodo(tarea);
            await obtenerTareas();
        } catch (error) {
            console.error('No se pudo agregar la tarea:', error);

            const estadoAnteriorTareas = tareas.filter(
                (prev) => prev.id !== nuevaTareaTemporal.id,
            );

            setTareas(estadoAnteriorTareas);
        }
    };

    const handleClickEliminarTarea = async (id) => {
        try {
            await api.deleteTodo(id);
            await obtenerTareas();
        } catch (error) {
            console.error('No se pudo eliminar la tarea:', error);
        }
    };

    const eliminarTareasTodas = async () => {
        try {
            await api.deleteAllTodos(tareas);

            setTareas([]);
            await obtenerTareas();
        } catch (error) {
            console.error('Error al eliminar todas las tareas:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>todos</h1>
            <div className="todos">
                <div className="d-flex">
                    <div className="w-100">
                        <ListForm agregarTarea={agregarTarea} />
                    </div>
                    <ButtonComponent
                        eliminar={eliminarTareasTodas}
                        numeroTareas={tareas.length}
                    />
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
