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



        <ListTasks 
          title="TEST" 
          task={filterTasks(tasques, selectedEstat,selectedCategory,selectedPriority)}
        />

        <ListTasks title="TEST" task={TasquesInicials}/>


      </div>

      <Footer />
    </div>
  )
}


/////////////////////////////
function Formulari() {
  // Estados iniciales de los campos individuales, conservados como referencia del aprendizaje.
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [priority, setPriority] = useState('');
  // const [urgent, setUrgent] = useState(false);

  // Estado para mensajes de error; todavía no se utiliza en este formulario.
  const [error, setError] = useState({
      nom: '',
      edat: '',
      description: '',
      estat: '',
      urgent: ''
  });
  // Guarda juntos todos los valores que introduce el usuario.
  const [formulari, setFormulari] = useState({
    nom: '',
    edat: '',
    description: '',
    estat: '',
    urgent: false
  });

    // Ejemplo anterior: actualizaba el estado de un único campo de texto.
    // function handleTitleChange(event) {
    //   setTitle(event.target.value)
    //   console.log(event.target.value)
    // }

  // Gestiona el envío y evita que el navegador recargue la página.
  function handleSubmit(event) {
    event.preventDefault(); 

    const errorNou = {
      nom: '',
      edat: '',
      description: '',
      estat: ''
    };

    if (formulari.nom.trim() === '') {errorNou.nom = 'El nom és obligatori';}
    if (formulari.edat.trim() === '') {errorNou.edat = "L'edat és obligatòria";}
    if (formulari.description.trim() === '') {errorNou.description = 'La descripció és obligatòria';}
    if (formulari.estat === '') {errorNou.estat = 'La prioritat és obligatòria';}
    setError(errorNou);

    if (Object.values(errorNou).some((message) => message !== '')) {return;}


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


    {/* Campo obligatorio para escribir el nombre. */}
    <label>Nom</label>
    <br/>
    
    <input
      required
      type="text"
      name="nom"
      key="id02"
      value={formulari.nom}
      onChange={handleInput} 
    ></input>
    
    <div style={{ color: 'red' }} >
      {error.nom}
    </div>

    <br/>
    {/* Campo para introducir la edad como número. */}
    <label>edat</label>
    <br/>
    
    <input
      required
      type="number"
      name="edat"
      key="id03"
      value={formulari.edat}
      onChange={handleInput}
    ></input>

    <div style={{ color: 'red' }} >
      {error.edat}
    </div>


    <br/>
    {/* Área de texto para escribir una descripción más larga. */}
    <label>Description</label>
    <br/>

    <textarea
      required
      name="description"
      value={formulari.description}
      onChange={handleInput}
    ></textarea>
  
    <div style={{ color: 'red' }} >
      {error.description}
    </div>

    <br/>
    {/* Selector de prioridad; su opción elegida se guarda en formulari.estat. */}
    <label>Priority</label>
    <br/>

    <select name="estat" value={formulari.estat} onChange={handleInput} required  >
      <option value=""></option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>


    <br/>
    {/* Casilla que guarda si el elemento es urgente o no. */}
    <label>Urgent</label>

    <input type="checkbox" name="urgent"
      checked={formulari.urgent}
      onChange={handleInput}
    ></input>

    

    {/* Envía el formulario y activa handleSubmit. */}
    <button type="submit" >Submit</button>

  </form>

  </>
  )
}

export default App;
