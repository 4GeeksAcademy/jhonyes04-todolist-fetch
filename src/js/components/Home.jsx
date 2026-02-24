import { TodoListComponent } from './TodoListComponent/TodoListComponent';
import { ToastContainer } from 'react-toastify';

//create your first component
const Home = () => {
    return (
        <div className="text-center">
            <TodoListComponent />
            <ToastContainer />
        </div>
    );
};

export default Home;
