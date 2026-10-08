# Apunts: com crear un formulari amb React

En aquests apunts veurem, pas a pas, com fer un formulari a React. Començarem controlant un camp i hi afegirem més funcionalitats: diferents tipus de controls, l'enviament del formulari i una estructura d'estat que permeti gestionar tots els camps.

La idea és entendre cada pas i el motiu del canvi, en lloc de copiar directament un formulari complet.

## 1. Controlar un camp amb `useState`

Perquè React conegui el valor que escriu l'usuari, guardem aquest valor a l'estat del component. `useState` rep el valor inicial i ens retorna el valor actual i la funció per actualitzar-lo:

```jsx
const [title, setTitle] = useState('');
```

En un camp controlat, `value` ve de l'estat i `onChange` actualitza aquest estat quan l'usuari escriu:

```jsx
<input
  value={title}
  onChange={(event) => setTitle(event.target.value)}
/>
```

El procés és el següent:

1. React mostra al camp el valor de `title`.
2. Quan l'usuari escriu, s'activa `onChange`.
3. `event.target.value` conté el text del camp.
4. `setTitle` actualitza l'estat i React torna a renderitzar el component.

La pàgina no es torna a carregar cada vegada que escrivim; React només actualitza la interfície que depèn del nou estat.

Durant l'aprenentatge podem afegir `console.log(title)` per observar els canvis. És útil per comprovar què està passant, però normalment no forma part del funcionament final del formulari.

## 2. Posar la lògica de canvi en una funció

Quan volem que el JSX sigui més fàcil de llegir o necessitem afegir més lògica, podem definir una funció per gestionar el canvi:

```jsx
function handleTitleChange(event) {
  setTitle(event.target.value);
  console.log(event.target.value);
}
```

Després la fem servir al camp:

```jsx
<input
  value={title}
  onChange={handleTitleChange}
/>
```

El comportament és el mateix que amb una funció curta escrita directament a `onChange`. El nom `handleTitleChange` indica què gestiona: el canvi del títol.

## 3. Afegir un selector amb `select`

Per permetre que l'usuari triï una opció, fem servir `<select>`. Igual que amb un camp de text, el valor seleccionat es controla amb `value` i `onChange`:

```jsx
const [priority, setPriority] = useState('');

<select
  value={priority}
  onChange={(event) => setPriority(event.target.value)}
>
  <option value="">Tria una prioritat</option>
  <option value="low">Baixa</option>
  <option value="medium">Mitjana</option>
  <option value="high">Alta</option>
</select>
```

Cada `<option>` té un `value`, que és el valor que guardem a l'estat. El text entre les etiquetes és el que veu l'usuari.

Un cop tenim el valor a l'estat, podem fer que la interfície depengui de la selecció. Per exemple, podem mostrar informació addicional només quan la prioritat sigui alta:

```jsx
{priority === 'high' && <p>Has triat una prioritat alta.</p>}
```

Això és renderitzat condicional de React: si la condició no es compleix, aquest element no es mostra. No és exactament el mateix que amagar-lo amb CSS, perquè un element ocult amb CSS continua formant part del document.

## 4. Afegir una casella de verificació

Un `checkbox` té dos estats possibles: marcat (`true`) o desmarcat (`false`). Per això el controlem amb `checked` i llegim `event.target.checked`:

```jsx
const [urgent, setUrgent] = useState(false);

<input
  type="checkbox"
  checked={urgent}
  onChange={(event) => setUrgent(event.target.checked)}
/>
```

Cal recordar la diferència:

- En camps de text i selectors, fem servir `event.target.value`.
- En un `checkbox`, fem servir `event.target.checked`.

## 5. Agrupar els valors del formulari en un objecte

Quan el formulari té més camps, podem començar creant un estat per a cadascun. Però, si tots els valors formen part del mateix formulari, pot ser més còmode guardar-los junts en un objecte:

```jsx
const [formulari, setFormulari] = useState({
  nom: '',
  edat: '',
  description: '',
  estat: '',
  urgent: false
});
```

Cada propietat representa un camp. Per exemple, el camp del nom llegeix el seu valor de `formulari.nom`:

```jsx
<input
  name="nom"
  value={formulari.nom}
  onChange={handleInput}
/>
```

L'atribut `name` identifica quin camp ha canviat. El seu valor ha de coincidir amb el nom d'una propietat de l'objecte: `nom`, `edat`, `description`, `estat` o `urgent`.

## 6. Reutilitzar una funció per actualitzar els camps

Si fem una funció diferent per a cada camp, repetim força codi. Com que cada control té un atribut `name`, podem fer servir una sola funció:

```jsx
function handleInput(event) {
  const { name, value, type, checked } = event.target;

  setFormulari({
    ...formulari,
    [name]: type === 'checkbox' ? checked : value
  });
}
```

Què fa aquesta funció?

- `name` ens diu quina propietat del formulari s'ha de canviar.
- `value` conté el valor dels camps de text i del `select`.
- `checked` conté el valor marcat o desmarcat del `checkbox`.
- `...formulari` copia els valors que ja teníem.
- `[name]` indica dinàmicament quina propietat s'actualitza.

Per exemple, si `name` val `"nom"`, `[name]` equival a la propietat `nom`.

Fem una còpia perquè a React no hem de modificar directament l'objecte d'estat existent. En crear un objecte nou, React pot detectar el canvi i actualitzar la interfície.

Ara tots els controls poden utilitzar la mateixa funció, sempre que tinguin el `name` correcte:

```jsx
<input
  required
  name="nom"
  value={formulari.nom}
  onChange={handleInput}
/>

<input
  type="number"
  name="edat"
  value={formulari.edat}
  onChange={handleInput}
/>

<textarea
  name="description"
  value={formulari.description}
  onChange={handleInput}
/>

<select
  name="estat"
  value={formulari.estat}
  onChange={handleInput}
>
  <option value="">Tria una prioritat</option>
  <option value="low">Baixa</option>
  <option value="medium">Mitjana</option>
  <option value="high">Alta</option>
</select>

<input
  type="checkbox"
  name="urgent"
  checked={formulari.urgent}
  onChange={handleInput}
/>
```

## 7. Tenir en compte els tipus de dades

Encara que un camp tingui `type="number"`, el valor que arriba de `event.target.value` normalment és una cadena de text. Per això `edat` comença com `''` i, amb la funció anterior, també es guarda com a text.

Si més endavant necessitem fer càlculs amb l'edat, haurem de convertir aquest valor a número i comprovar que sigui vàlid. En canvi, `urgent` sí que és un booleà, perquè al `checkbox` fem servir `checked`.

## 8. Enviar el formulari

Posem els camps dins de `<form>` i gestionem l'enviament amb `onSubmit`. El botó que envia el formulari ha de tenir `type="submit"`:

```jsx
function handleSubmit(event) {
  event.preventDefault();
  console.log('Formulari enviat');
}

<form onSubmit={handleSubmit}>
  {/* Camps del formulari */}
  <button type="submit">Envia</button>
</form>
```

Quan l'usuari prem el botó, el navegador genera l'esdeveniment `submit`. `event.preventDefault()` evita el comportament tradicional del navegador, que podria recarregar la pàgina. Així podem gestionar les dades amb React.

Aquest codi només evita la recàrrega i escriu un missatge a la consola. Per desar les dades o enviar-les a un servidor, encara caldria afegir aquesta lògica dins de `handleSubmit`.

## 9. Indicar camps obligatoris i tipus d'entrada

Podem afegir atributs HTML per demanar una entrada determinada:

- `required`: el camp és obligatori.
- `type="number"`: el camp està pensat per introduir-hi un número.

Per exemple:

```jsx
<input
  required
  name="nom"
  value={formulari.nom}
  onChange={handleInput}
/>

<input
  type="number"
  name="edat"
  value={formulari.edat}
  onChange={handleInput}
/>
```

Aquests atributs ofereixen una validació bàsica del navegador, però no substitueixen totes les comprovacions que pugui necessitar l'aplicació. Per exemple, si l'edat ha d'estar dins d'un interval, haurem de validar aquest interval.

## 10. Validar els camps i mostrar els errors

Per poder mostrar errors diferents per a cada camp, l'estat `error` és un objecte amb una propietat per camp:

```jsx
const [error, setError] = useState({
  nom: '',
  edat: '',
  description: '',
  estat: ''
});
```

Cada propietat conté el missatge d'error corresponent. Una cadena buida (`''`) vol dir que no hi ha cap error per a aquell camp. El `checkbox` `urgent` no s'inclou perquè pot estar desmarcat: `false` és una resposta vàlida, no un error.

### Comprovar les dades quan s'envia el formulari

Dins de `handleSubmit`, primer evitem la recàrrega normal del navegador. Després creem un objecte nou d'errors i comprovem els valors:

```jsx
function handleSubmit(event) {
  event.preventDefault();

  const errorNou = {
    nom: '',
    edat: '',
    description: '',
    estat: ''
  };

  if (formulari.nom.trim() === '') {
    errorNou.nom = 'El nom és obligatori';
  }
  if (formulari.edat.trim() === '') {
    errorNou.edat = "L'edat és obligatòria";
  }
  if (formulari.description.trim() === '') {
    errorNou.description = 'La descripció és obligatòria';
  }
  if (formulari.estat === '') {
    errorNou.estat = 'La prioritat és obligatòria';
  }

  setError(errorNou);

  if (Object.values(errorNou).some((message) => message !== '')) {
    return;
  }

  console.log('Formulari enviat:', formulari);
}
```

`trim()` elimina els espais del principi i del final. Així, un camp que només conté espais també es considera buit. `setError(errorNou)` actualitza tots els missatges d'una vegada. `Object.values(...).some(...)` comprova si hi ha almenys un missatge; si n'hi ha, `return` atura l'enviament correcte.

En aquest exemple, si no hi ha errors, les dades només es mostren a la consola. Encara no es desen ni s'envien a cap servidor.

### Mostrar cada missatge al costat del seu camp

No s'ha d'intentar mostrar l'objecte complet amb `<p>{error}</p>`: React no pot representar un objecte com si fos text. En lloc d'això, mostrem la propietat concreta sota el camp corresponent:

```jsx
<input
  name="nom"
  value={formulari.nom}
  onChange={handleInput}
/>
<div style={{ color: 'red' }}>{error.nom}</div>
```

Es fa el mateix per als altres camps:

```jsx
<div style={{ color: 'red' }}>{error.edat}</div>
<div style={{ color: 'red' }}>{error.description}</div>
<div style={{ color: 'red' }}>{error.estat}</div>
```

Quan el missatge és buit, aquests contenidors no mostren cap text.

### Esborrar l'error quan es corregeix el camp

El manejador `handleInput` actualitza el valor del camp i, si aquest camp tenia un error i ara ja conté alguna cosa, esborra el missatge:

```jsx
const { name, value, type, checked } = event.target;
const valor = type === 'checkbox' ? checked : value;

setFormulari((anterior) => ({
  ...anterior,
  [name]: valor
}));

if (name in error && String(valor).trim() !== '') {
  setError((anterior) => ({ ...anterior, [name]: '' }));
}
```

La comprovació `name in error` limita aquesta neteja als camps que tenen validació. En omplir un camp buit, el seu missatge desapareix sense esborrar els errors dels altres camps.

Al formulari actual s'utilitza `noValidate` a `<form>`. Això desactiva els missatges automàtics de validació del navegador perquè es puguin veure els missatges definits per l'aplicació. Els atributs `required` continuen documentant quins camps són obligatoris, però la validació personalitzada de `handleSubmit` és la que gestiona aquests errors.

## 11. Per què construir-ho de manera evolutiva?

Cada pas ensenya una idea nova i resol una necessitat que apareix quan el formulari creix:

1. **Un estat i un camp:** aprenem a sincronitzar el valor amb React.
2. **Una funció de canvi:** separem la lògica del JSX.
3. **Més tipus de control:** veiem que un `checkbox` es llegeix diferent d'un camp de text.
4. **Un objecte per als camps:** organitzem dades que pertanyen al mateix formulari.
5. **Un manejador reutilitzable:** evitem repetir la mateixa lògica per a cada camp.
6. **Enviament i validació:** el formulari comença a comportar-se com una eina completa.
7. **Estat d'error:** podem informar l'usuari quan alguna dada no és vàlida.

Treballar així ajuda a entendre què fa cada part, detectar errors amb més facilitat i prendre decisions quan s'afegeixen camps. Si comencem directament amb tot el codi final, és més difícil veure per què necessitem cada canvi.



-- TAREAAA
## Projecte: Task Flow

### Objectiu

Crear una aplicació per gestionar tasques. L'usuari ha de poder afegir tasques, veure-les en un llistat i filtrar-les per trobar més fàcilment les que necessita.

### Dades de cada tasca

Cada tasca ha de tenir aquests camps:

- **ID:** identificador únic per distingir la tasca de totes les altres.
- **Títol:** nom breu de la tasca.
- **Descripció:** informació addicional sobre què cal fer.
- **Categoria:** categoria seleccionada en una llista.
- **Prioritat:** nivell de prioritat seleccionat en una llista.
- **Completada:** casella que indica si la tasca està feta (`true`) o pendent (`false`). En crear una tasca, el valor inicial és `false`.

### Afegir una tasca

1. A la pàgina hi ha d'haver un botó per afegir una tasca.
2. En prémer-lo, es mostra el formulari de creació.
3. L'usuari omple el títol, la descripció, la categoria i la prioritat.
4. El formulari valida que els camps obligatoris estiguin complets i mostra els errors corresponents.
5. En desar, l'aplicació crea la tasca amb un ID únic i amb `completada: false`, i l'afegeix al llistat.

El camp «Completada» no s'ha de demanar com a obligatori en el formulari de creació: una tasca nova comença pendent i es pot marcar com a completada més endavant.

### Llistar i filtrar tasques

Les tasques s'han de mostrar en un llistat. A sobre del llistat hi haurà filtres per:

- Categoria.
- Prioritat.
- Estat: completades o pendents.

Els filtres han de poder combinar-se. Per exemple, es podrien veure només les tasques pendents d'una categoria concreta i d'una prioritat determinada.

**Comportament inicial:** per defecte, no es mostren les tasques completades. L'usuari vol centrar-se en les tasques que encara té pendents. El filtre d'estat ha de permetre consultar les completades quan ho necessiti.

### Millora opcional

Com a ampliació, es pot estudiar la possibilitat d'editar una tasca existent. Aquesta funció és addicional i no és necessària per completar primer les funcions bàsiques d'afegir, llistar i filtrar.
