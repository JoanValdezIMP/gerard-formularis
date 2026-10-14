import './Card.css'

export function TaskCard({task, }) {
    return (
        <div className="card">
            <p>Task: {task.id}</p>
            <h3>{task.titol}</h3>
            <p>{task.descripcio}</p>
            <p>{task.categoria}</p>
            <p>{task.prioritat}</p>
            <p>{task.completada}</p>
            
            <button></button>

        </div>
    )
}