
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
