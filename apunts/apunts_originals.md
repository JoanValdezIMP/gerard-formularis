Antes que nada. se tiene que realizar un useState de cada opcion de formulario que se haga



Hacer una funcion para añadir un formulario
- Algo que se envia, por ejemplo, para validar los datos que nos estan entrando
 - Para interectuar con el usuario.


el usuario escribe, en el momento que escribe se activa el onchange. Cada vez que se escribe algo, la pagina se actualiza
el onchange actua cada que un valor entra
<input
    value={title}
    onChange = {event=>setTitle(event.target.value)}
  ></input>

*colocando un colsole.log se pueden ver los cambios a tiempo real*
function App() {
  const [title, setTitle] = useState('');
  console.log(title)
  return (
  <>
    <input
      value={title}
      onChange = {event=>setTitle(event.target.value)}
    ></input>
  </>
  )
}

Esto puede servir para controlar lo que se este escribiendo a tiempo real.
si por ejemplo, en un seleccionable seleccionas algo, puedes con eso desplegar mas opcines que no aparecerian si tal no se selecciona. 
Lo mismo se puede hacer con css, la cosa es que con css se envian todos los campos, en React solo los que quieras

Tambe es pot fer amb una funcio

function App() {
  const [title, setTitle] = useState('');

  function handleTitleChange(event) {
    setTitle(event.target.value)
    console.log(event.target.value)
  }

 return (
  <>
    <input
      key="id02"
      value={title}
      onChange = {handleTitleChange}
    ></input>

  </>
 )
}

Para realizar seleccionables se usa el select.
Es el selectior de prioridad, o algo asi, la prioridad, el valor.
    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

Para realizar un checkbox se hace de la siguiente forma. Solo puede estar en 2 formatos. True y False
   <input type="checkbox" 
      checked={urgent}
      onChange={(e) => setUrgent(e.target.checked)}
    ></input>



Para enviar un formulario hay que hacer un boton que envie el formulario
Colocar todos los componentes del formulario dentro de la etiqueta <form>, y al final del formulario colocat el boton del tipo form

  function handleSubmit(event) {
    console.log('Form submitted:');
    event.preventDefault(); //Evita que la pagina se actualize tras darle al boton de enviar
  }
  <form onSubmit={handleSubmit}>
    <button type="submit" >Submit</button>
  </form>


Para poder indicar que es obligatrio: required
Indicar el tipo de valor permitido: type="number" //este caso, numerico


Para crear un sistema de errores creamos un state de error y de los objetos de formularios. Hay que adaptar las demas partes del codigo
  value={formulari.[valor dentro de los objetos de formulari]}
  value={formulari.nom}

y adaptar el on change
  onChange={(e) => setFormulari({...formulari, nom: e.target.value})}

  const [error, setError] = useState('');
  const [formulari, setFormulari] = useState({
    nom: '',
    edat: '',
    description: '',
    estat: '',
    urgent: false
  });

para no tener codigo redundante el onchange lo creamos en una funcion aparte
  function handleInput(event) {
    const { name, value, type, checked } = event.target; // Es para que añada el valor del input al state, y si es checkbox añade el checked en vez del value
    setFormulari({
      ...formulari,
      [name]: type === 'checkbox' ? checked : value // Si es checkbox añade el checked en vez del value
    })
  }

<label>Nom</label>
    <br/>
    
    <input
      required
      name="nom"
      key="id02"
      value={formulari.nom}
      onChange={handleInput} 
    ></input>
