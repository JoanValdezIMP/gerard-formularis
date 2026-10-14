import './FilterButtons.css';

export function FilterButtons({
  selectedEstat,
  setselectedEstat,
  selectedCategory,
  setselectedCategory,
  selectedPriority,
  setselectedPriority
}) {

  const estat = ['Totes', 'Pendents', 'Completades'];
  const categoria = ['Totes', 'Feina', 'Personal', 'Estudis'];
  const prioritat = ['Totes', 'Baixa', 'Mitjana', 'Alta'];

  return (
    <div className="filters-container">

      <div className="filter-group">
        <h3>Filtra per estat:</h3>
        <div className="buttons-row">
          {estat.map((opcioEstat) => (
            <button
              key={opcioEstat}
              className={selectedEstat === opcioEstat ? 'active' : ''}
              onClick={() => setselectedEstat(opcioEstat)}
            >
              {opcioEstat}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h3>Filtra per categoria:</h3>
        <div className="buttons-row">
          {categoria.map((opcioCategoria) => (
            <button
              key={opcioCategoria}
              className={selectedCategory === opcioCategoria ? 'active' : ''}
              onClick={() => setselectedCategory(opcioCategoria)}
            >
              {opcioCategoria}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h3>Filtra per prioritat:</h3>
        <div className="buttons-row">
          {prioritat.map((opcioPrioritat) => (
            <button
              key={opcioPrioritat}
              className={selectedPriority === opcioPrioritat ? 'active' : ''}
              onClick={() => setselectedPriority(opcioPrioritat)}
            >
              {opcioPrioritat}
            </button>
          ))}
        </div>
      </div>


    </div>
  );
}