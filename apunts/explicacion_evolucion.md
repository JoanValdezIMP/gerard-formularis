# Cómo evoluciona un formulario en React

Estos apuntes explican el proceso que hemos ido aprendiendo en clase para construir un formulario. La idea no es empezar directamente con la versión final: primero hacemos funcionar una parte pequeña y, después, la ampliamos cuando entendemos qué problema resuelve cada cambio.

El ejemplo final de estos apuntes es el formulario de `src/App.jsx`. Tiene campos para el nombre, la edad, la descripción, la prioridad y si la tarea es urgente.

## 1. Empezar con un campo controlado

En React, si queremos que el valor de un campo esté sincronizado con el estado del componente, creamos un estado para ese valor. `useState` devuelve el valor actual y una función para actualizarlo:

```jsx
const [title, setTitle] = useState('');
```

El campo recibe el valor del estado mediante `value`. Cuando el usuario escribe, `onChange` recibe el evento y actualiza el estado:

```jsx
<input
  value={title}
  onChange={(event) => setTitle(event.target.value)}
/>
```

El flujo es:

1. React muestra en el campo el valor de `title`.
2. El usuario escribe y se produce el evento `onChange`.
3. `setTitle` actualiza el estado.
4. React vuelve a renderizar el componente con el valor actualizado.

Así el estado de React es la fuente del valor del campo. Se puede observar temporalmente con `console.log(title)`, aunque los registros de consola sirven para aprender y depurar, no para gestionar los datos del formulario.

## 2. Separar la lógica en una función

Cuando la lógica de un evento deja de ser muy pequeña, podemos darle un nombre y definirla fuera del JSX:

```jsx
function handleTitleChange(event) {
  setTitle(event.target.value);
}
```

El campo queda así:

```jsx
<input value={title} onChange={handleTitleChange} />
```

Esto no cambia el comportamiento. Hace que el JSX sea más fácil de leer y permite ampliar la función más adelante.

## 3. Añadir más tipos de campo

Cada tipo de control tiene una forma apropiada de leer y guardar su valor.

### Lista de opciones (`select`)

El `select` se controla con `value` y `onChange`, igual que un `input` de texto:

```jsx
<select
  value={priority}
  onChange={(event) => setPriority(event.target.value)}
>
  <option value="">Elige una prioridad</option>
  <option value="low">Baja</option>
  <option value="medium">Media</option>
  <option value="high">Alta</option>
</select>
```

Cada opción tiene un `value`, que es el dato que se guarda en el estado. El texto visible puede ser distinto del valor interno.

### Casilla de verificación (`checkbox`)

Un `checkbox` no se controla con `value`: su estado se expresa con `checked`, que es `true` o `false`. Por eso se lee `event.target.checked`:

```jsx
<input
  type="checkbox"
  checked={urgent}
  onChange={(event) => setUrgent(event.target.checked)}
/>
```

Esta diferencia es importante: en los campos de texto y en los `select` se suele leer `event.target.value`; en un `checkbox`, `event.target.checked`.

## 4. Reunir los datos del formulario en un objeto

Al principio se puede crear un estado por campo:

```jsx
const [name, setName] = useState('');
const [age, setAge] = useState('');
const [description, setDescription] = useState('');
const [priority, setPriority] = useState('');
const [urgent, setUrgent] = useState(false);
```

Esto es válido y ayuda a entender cómo se controla cada campo. Pero, cuando todos esos valores pertenecen al mismo formulario, mantener muchos estados y funciones puede resultar repetitivo. Podemos agruparlos en un objeto:

```jsx
const [formulari, setFormulari] = useState({
  nom: '',
  edat: '',
  description: '',
  estat: '',
  urgent: false
});
```

Ahora los campos leen sus valores de ese objeto. Por ejemplo:

```jsx
<input
  name="nom"
  value={formulari.nom}
  onChange={handleInput}
/>
```

El atributo `name` identifica qué propiedad del objeto debe actualizarse.

## 5. Crear un único manejador para los campos

Como varios campos actualizan el mismo objeto, podemos reutilizar una función:

```jsx
function handleInput(event) {
  const { name, value, type, checked } = event.target;

  setFormulari({
    ...formulari,
    [name]: type === 'checkbox' ? checked : value
  });
}
```

La función:

- Lee `name` para saber qué propiedad cambiar.
- Lee `value` para los campos de texto, numéricos, el área de texto y el `select`.
- Lee `checked` si el control es un `checkbox`.
- Copia las propiedades anteriores con `...formulari` y reemplaza solo la propiedad indicada por `name`.

La copia es necesaria porque en React debemos actualizar el objeto creando uno nuevo, en vez de modificar directamente el estado existente. La expresión `[name]` calcula el nombre de la propiedad: por ejemplo, si `name` vale `"nom"`, se actualiza `nom`.

En el JSX, cada campo debe tener un `name` que coincida exactamente con una propiedad del objeto (`nom`, `edat`, `description`, `estat` o `urgent`). Si no coincide, se creará o actualizará otra propiedad y el campo esperado no cambiará.

## 6. Distinguir el tipo de dato del valor HTML

En el objeto inicial, `urgent` es booleano (`false`). En cambio, los valores de los campos HTML suelen llegar como texto. Esto también sucede con `type="number"`: aunque el navegador muestre un campo numérico, `event.target.value` normalmente es una cadena.

Por eso, en el ejemplo actual, `formulari.edat` empieza como `''` y se guarda tal como llega del campo. Si más adelante necesitamos hacer operaciones matemáticas, habrá que convertirlo a número y validar que la conversión sea correcta.

## 7. Agrupar los controles en un formulario y gestionar el envío

Los controles se colocan dentro de `<form>`. El envío se gestiona desde `onSubmit`, y el botón que envía el formulario debe tener `type="submit"`:

```jsx
function handleSubmit(event) {
  event.preventDefault();
  console.log('Formulario enviado');
}

return (
  <form onSubmit={handleSubmit}>
    {/* Campos del formulario */}
    <button type="submit">Enviar</button>
  </form>
);
```

Al enviar, el navegador produce el evento `submit`. `event.preventDefault()` evita la navegación o recarga tradicional de la página, para que React pueda gestionar el envío. En el ejemplo actual, el manejador solo evita esa recarga y escribe un mensaje en la consola: todavía no guarda ni envía los datos a ningún sitio.

## 8. Añadir restricciones básicas

Algunos atributos permiten que el navegador haga una validación básica:

- `required` hace obligatorio un campo.
- `type="number"` indica que se espera una entrada numérica.

Por ejemplo:

```jsx
<input required name="nom" value={formulari.nom} onChange={handleInput} />
<input type="number" name="edat" value={formulari.edat} onChange={handleInput} />
```

`required` está aplicado al nombre en `App.jsx`, pero no a la edad. El tipo `number` ayuda con la entrada, aunque no sustituye una validación completa de reglas como edad mínima o máxima. Además, mientras el navegador considere inválido un campo obligatorio, normalmente no disparará `onSubmit`.

## 9. Mostrar contenido según los datos

Una vez que los campos están en el estado, podemos usar sus valores para decidir qué contenido mostrar:

```jsx
{formulari.estat === 'high' && formulari.urgent && (
  <p>¡Prioridad alta y urgente!</p>
)}
```

La expresión aparece solo cuando la prioridad es `"high"` y `urgent` es `true`. Al depender del estado, el mensaje se actualiza automáticamente al cambiar los controles.

Si una sección no debe existir mientras una condición no se cumpla, renderizarla condicionalmente en React es distinto de ocultarla solo con CSS: un elemento oculto con CSS sigue formando parte del documento. En un formulario, también hay que tener en cuenta si los controles ocultos deben seguir participando en la validación o el envío.

## 10. El resultado actual en `App.jsx`

La versión actual reúne lo aprendido:

1. Mantiene los datos en un único estado `formulari`.
2. Usa `value` para los campos de texto, edad, descripción y prioridad.
3. Usa `checked` para la casilla de urgencia.
4. Reutiliza `handleInput` para actualizar el campo adecuado.
5. Usa `required` en el nombre y `type="number"` en la edad.
6. Evita la recarga al enviar el formulario.
7. Muestra un mensaje cuando la prioridad es alta y la tarea está marcada como urgente.

Hay dos detalles del código actual que conviene reconocer para entender qué falta, sin confundirlo con lo que ya hace:

- `error` se declara como estado, pero todavía no se usa para validar ni mostrar errores. Es un posible siguiente paso, no una función implementada.
- `key` en los `input` individuales no es necesario en este formulario. `key` se usa principalmente cuando React muestra listas de elementos y necesita identificarlos.

También se dejaron comentados los estados y el manejador iniciales de `title`. Eso refleja etapas anteriores del aprendizaje; el formulario actual ya usa el objeto `formulari` y `handleInput`.

## ¿Por qué evolucionar paso a paso?

Cada etapa responde a una necesidad que aparece al añadir funcionalidad:

1. Un estado y un campo permiten entender la relación entre React y lo que escribe el usuario.
2. Una función manejadora separa la lógica del marcado.
3. `select` y `checkbox` enseñan que no todos los controles entregan sus datos de la misma manera.
4. Un objeto organiza los datos que pertenecen juntos.
5. Un manejador común evita repetir código cuando varios campos actualizan ese objeto.
6. El envío y las restricciones añaden comportamiento real al formulario.
7. El renderizado condicional aprovecha el estado para adaptar lo que ve el usuario.

Aprenderlo de esta forma hace más fácil localizar errores y entender por qué se introduce cada cambio. Si se empieza directamente con toda la versión final, es más difícil distinguir qué parte controla el valor, cuál procesa los eventos y cuál decide qué se muestra.
