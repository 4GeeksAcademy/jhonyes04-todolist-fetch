const URL_API = 'https://playground.4geeks.com/todo';
const USUARIO = 'jhonyes04';

export const getUsers = async () => {
    const response = await fetch(`${URL_API}/users`);

    if (!response.ok) throw new Error('Error al obtener usuarios');

    const data = await response.json();

    return data;
};

export const postUser = async () => {
    try {
        const response = await fetch(`${URL_API}/users/${USUARIO}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok || response.status === 400) return true;

        return false;
    } catch (error) {
        console.error('Error al crear usuario:', error);
        return false;
    }
};

export const getTodos = async () => {
    let response = await fetch(`${URL_API}/users/${USUARIO}`);

    if (response.status === 404) {
        await postUser();

        response = await fetch(`${URL_API}/users/${USUARIO}`);
    }

    if (!response.ok) throw new Error('Error al obtener tareas');

    const data = await response.json();

    return data.todos;
};

export const postTodo = async (tarea) => {
    const response = await fetch(`${URL_API}/todos/${USUARIO}`, {
        method: 'POST',
        body: JSON.stringify({ label: tarea, is_done: false }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Error al agregar tarea');

    return await response.json();
};

export const deleteTodo = async (id) => {
    const response = await fetch(`${URL_API}/todos/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) throw new Error('Error al eliminar tarea');

    return true;
};

export const deleteAllTodos = async () => {
    const response = await fetch(`${URL_API}/users/${USUARIO}`, {
        method: 'DELETE',
    });

    if (!response.ok) throw new Error('Error al eliminar el usuario/tareas');

    return true;
};
