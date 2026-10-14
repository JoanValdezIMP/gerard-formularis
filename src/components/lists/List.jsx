import { TaskCard } from './Card.jsx'
import './List.css'

export function ListTasks({ title = "Unnamed", task, canviarEstat }) {
    return (
        <div className="list">
            <h2>{title}</h2>
            <ul>
                {task.map(item => {
                    return (
                        <li key={item.id}>
                            <TaskCard task={item} canviarEstat={canviarEstat} />
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}