import { TaskCard } from './Card.jsx'
import './List.css'

export function ListTasks({ title = "Unnamed", task}) {
    return (
        <div className="list">
            <h2>{title}</h2>
            <ul>
                {task.map(item => {
                    return (
                        <li key={item.id}>
                            <TaskCard task={item}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}