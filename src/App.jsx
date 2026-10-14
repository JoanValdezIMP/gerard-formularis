import { useState } from 'react'
import { Footer } from './components/layout/Footer.jsx'
import { Header } from './components/layout/Header.jsx'
import { ListTasks } from './components/lists/List.jsx'
import { FilterButtons } from './components/FilterButtons.jsx'

import { TasquesInicials } from './data/Data.jsx'
// import './App.css'
function filterTasks(taskList, estat, category, priority) {
  return taskList.filter((task) => {
    const matchCategory = category === 'Totes' || task.categoria === category;
    const matchPriority = priority === 'Totes' || task.prioritat === priority;
    const matchEstat = 
      estat === 'Totes' || 
      (estat === 'Completades' && task.completada) || 
      (estat === 'Pendents' && !task.completada);

    return matchCategory && matchPriority && matchEstat;
  });
}




function App() {

  const [tasques, setTasques] = useState(TasquesInicials);

  const [selectedEstat, setselectedEstat] = useState('Pendents'); 
  const [selectedCategory, setselectedCategory] = useState('Totes'); 
  const [selectedPriority, setselectedPriority] = useState('Totes'); 
  
  function canviarEstat(id) {
    setTasques((tasquesActuals) =>
      tasquesActuals.map((task) =>
        task.id === id
          ? { ...task, completada: !task.completada }
          : task
      )
    );
  }


  //////////////FORMULARI////////////////////////

  const [mostrarFormulari, setMostrarFormulari] = useState(false);

  function afegirTasca(novaTasca) {
    setTasques((tasquesActuals) => {
      const novaId = tasquesActuals.length + 1;
      return [...tasquesActuals, { ...novaTasca, id: novaId }];
    })

    setMostrarFormulari(false); 
  };









  //////////////FORMULARI////////////////////////
  return (
    <div>
      <Header />
  
      <div className="App">

        <FilterButtons
          selectedEstat={selectedEstat}
          setselectedEstat={setselectedEstat}
          selectedCategory={selectedCategory}
          setselectedCategory={setselectedCategory}
          selectedPriority={selectedPriority}
          setselectedPriority={setselectedPriority}      
        />

        {/* <button onClick={() => setTasques([...tasques, </Formulari>])}>Afegir tasca</button> */}
        <button onClick={() => setMostrarFormulari(!mostrarFormulari)}>
          {mostrarFormulari ? 'Amagar formulari' : 'Afegir tasca'}
        </button>

        {mostrarFormulari && <Formulari onAdd={afegirTasca} />}


        <ListTasks 
          title="Llistat de tasques" 
          task={filterTasks(tasques, selectedEstat,selectedCategory,selectedPriority)}
          canviarEstat={canviarEstat}
        />

        {/* <ListTasks title="Llistat de tasques" task={TasquesInicials}/> */}


      </div>

      <Footer />
    </div>
  )
}


/////////////////////////////
function Formulari({onAdd}) {
  // Estados iniciales de los campos individuales, conservados como referencia del aprendizaje.
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [priority, setPriority] = useState('');
  // const [urgent, setUrgent] = useState(false);

  // Estado para mensajes de error; todavía no se utiliza en este formulario.
   const [error, setError] = useState({
    // id: '', 
    titol: '', 
    descripcio: '', 
    categoria: '', 
    prioritat: '', 
    completada: false 
  });

  const [formulari, setFormulari] = useState({
    // id: '', 
    titol: '', 
    descripcio: '', 
    categoria: '', 
    prioritat: '', 
    completada: false 
  });


  function handleSubmit(event) {
    event.preventDefault(); 

    const errorNou = {
      // id: '',
      titol: '',
      descripcio: '',
      categoria: '',
      prioritat: '',
      completada: ''
    };

    // if (formulari.id.trim() === '') {errorNou.id = 'L\'ID és obligatori';}
    if (formulari.titol.trim() === '') {errorNou.titol = 'El títol és obligatori';}
    if (formulari.descripcio.trim() === '') {errorNou.descripcio = 'La descripció és obligatòria';}
    if (formulari.categoria === '') {errorNou.categoria = 'La categoria és obligatòria';}
    if (formulari.prioritat === '') {errorNou.prioritat = 'La prioritat és obligatòria';}
    setError(errorNou);

    if (Object.values(errorNou).some((message) => message !== '')) {return;}

    onAdd(formulari);
    console.log('Formulari enviat:', formulari);
  }

  // Muestra en la consola el contenido actual del formulario mientras se edita.

  // Actualiza la propiedad correspondiente al campo que ha cambiado.
  function handleInput(event) {
    const { name, value, type, checked } = event.target; // Es para que añada el valor del input al state, y si es checkbox añade el checked en vez del value
    const valor = type === 'checkbox' ? checked : value;
    setFormulari((anterior) => ({
      ...anterior,
      [name]: valor // Si es checkbox añade el checked en vez del value
    }));

    if (name in error && String(valor).trim() !== '') {
      setError((anterior) => ({ ...anterior, [name]: '' }));
    }
  }




  return (
  // Agrupa los campos y llama a handleSubmit cuando se envía el formulario.
  <>
    <form onSubmit={handleSubmit} noValidate>
      {/* Titol */}
      <label>titol</label>
      <br/>
      
      <input
        required
        type="text"
        name="titol"
        key="id02"
        value={formulari.titol}
        onChange={handleInput} 
      ></input>

      <div style={{ color: 'red' }} >
        {error.titol}
      </div>

      {/* Descripció */}

      <br/>
      <label>descripcio</label>
      <br/>
      
      <input
        required
        type="text"
        name="descripcio"
        key="id03"
        value={formulari.descripcio}
        onChange={handleInput}
      ></input>

      <div style={{ color: 'red' }} >
        {error.descripcio}
      </div>



      
      {/* Categoria */}
      <br/>
        <label>Category</label>
      <br/>

      <select name="categoria" value={formulari.categoria} onChange={handleInput} required  >
        <option value=""></option>
        <option value="Feina">Feina</option>
        <option value="Personal">Personal</option>
        <option value="Estudis">Estudis</option>
      </select>


      <div style={{ color: 'red' }} >
        {error.categoria}
      </div>


      {/* Prioritat */}
      <br/>
        <label>Priority</label>
      <br/>

      <select name="prioritat" value={formulari.prioritat} onChange={handleInput} required  >
        <option value=""></option>
        <option value="Baixa">Baixa</option>
        <option value="Mitjana">Mitjana</option>
        <option value="Alta">Alta</option>
      </select>



      <div style={{ color: 'red' }} >
        {error.prioritat}
      </div>


      {/* Completada */}
      <br/>
        <label>Estat</label>

      <input type="checkbox" name="completada"
        checked={formulari.completada}
        onChange={handleInput}
      ></input>
      

      <div style={{ color: 'red' }} >
        {error.completada}
      </div>

      <button type="submit" >Enviar</button>

      </form>
  </>
  )
}

export default App;
