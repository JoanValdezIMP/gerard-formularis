import './Card.css'

export function TaskCard({task, canviarEstat}) {
    return (
        <div className="card">
            <p>Task: {task.id}</p>
            <h3>{task.titol}</h3>
            <p>{task.descripcio}</p>
            <p>{task.categoria}</p>

            {/* <p>{task.prioritat}</p> */}
            {/* <p>Estat: {task.completada ? 'Completada' : 'Pendent'}</p> */}

            <p>
                Prioritat: <span className={`card-badge priority-${task.prioritat.toLowerCase()}`}>{task.prioritat}</span>
            </p>
            <p>
                Estat: <span className={`card-badge ${task.completada ? 'status-completada' : 'status-pendent'}`}>
                    {task.completada ? 'Completada' : 'Pendent'}
                </span>
            </p>
            
            <button onClick={() => canviarEstat(task.id)}>{task.completada ? 'Marcar com a pendent' : 'Marcar com a completada'}</button>

        </div>
    )
}



