---
language: es
original_file: en/chapter-02/activities/04-human-computer-simulation.md
last_synced: 2025-03-17
translation_status: complete
---

# Actividad: La computadora humana - Representando programas simples

## Visión general
Esta actividad práctica transforma a los estudiantes en "computadoras humanas" que ejecutan código actuando físicamente la lógica y el flujo de programas simples. Al encarnar el papel de un procesador de computadora, los estudiantes obtienen una comprensión más profunda de cómo las computadoras interpretan y ejecutan instrucciones, particularmente la lógica condicional y las estructuras de toma de decisiones.

## Objetivos de aprendizaje
- Experimentar de primera mano cómo las computadoras ejecutan instrucciones
- Comprender la naturaleza precisa y literal de la ejecución de programas
- Visualizar el flujo de control en programas con declaraciones condicionales
- Reconocer cómo las computadoras mantienen y actualizan valores de variables
- Desarrollar una intuición para la depuración identificando dónde pueden fallar los programas

## Materiales necesarios
- Tarjetas grandes con instrucciones escritas (una instrucción por tarjeta)
- Notas adhesivas o pequeñas libretas para representar variables y sus valores
- Cinta adhesiva para marcar "caminos de ejecución" en el suelo
- Opcional: Objetos relacionados con los escenarios del programa (paraguas, mochila, etc.)
- Opcional: Insignias de roles (ej., "CPU", "Memoria", "Entrada/Salida")

## Tiempo requerido
60-90 minutos

## Preparación
Antes de la actividad, crea tarjetas de instrucciones para al menos dos programas simples. Cada tarjeta debe contener una instrucción que corresponda a una línea de pseudocódigo. Numera las tarjetas para mostrar la secuencia.

Por ejemplo, para un programa de "Rutina matutina":
1. INICIO
2. SI (está lloviendo) ENTONCES ir a tarjeta #3, SI NO ir a tarjeta #5
3. Tomar paraguas
4. Ir a tarjeta #6
5. No tomar paraguas
6. SI (temperatura < 15°C) ENTONCES ir a tarjeta #7, SI NO ir a tarjeta #9
7. Usar chaqueta pesada
8. Ir a tarjeta #10
9. Usar chaqueta ligera
10. Caminar a la parada de autobús
11. FIN

## Parte 1: Introducción a ser una computadora

### Paso 1: Explicar la actividad
Explica que en esta actividad, los estudiantes se convertirán en "computadoras humanas", siguiendo instrucciones exactamente como lo haría una computadora. Enfatiza que las computadoras:
- Siguen instrucciones paso a paso
- No pueden adelantarse o hacer suposiciones
- Solo pueden hacer exactamente lo que se les indica
- Solo pueden tomar decisiones basadas en condiciones específicas

### Paso 2: Asignar roles
Asigna diferentes roles a los estudiantes:
- "CPU" - sigue instrucciones y toma decisiones
- "Memoria" - mantiene valores de variables (usando notas adhesivas)
- "Entrada" - proporciona información del mundo exterior
- "Salida" - comunica resultados al mundo exterior

Rota los roles para que todos tengan la oportunidad de experimentar ser la CPU.

## Parte 2: Ejecución básica de programa

### Programa 1: Rutina matutina

#### Configuración
- Organiza las tarjetas de instrucciones en orden numérico pero separadas
- Marca caminos en el suelo con cinta para mostrar las diferentes rutas de ejecución
- Establece valores de variables en notas adhesivas (ej., "clima = lluvioso", "temperatura = 10°C")
- Coloca objetos apropiados en diferentes estaciones

#### Ejecución
1. El estudiante "CPU" comienza en la tarjeta #1 (INICIO)
2. Lee cada instrucción en voz alta y realiza la acción especificada
3. Para declaraciones condicionales, consulta con el estudiante "Memoria" para obtener el valor de las variables
4. Basándose en la condición, sigue el camino apropiado a la siguiente instrucción
5. Si la instrucción actualiza una variable, el estudiante "Memoria" actualiza la nota adhesiva
6. El estudiante "Salida" registra o anuncia cualquier acción de salida
7. Continúa hasta llegar a la tarjeta FIN

#### Discusión
Después de completar el programa:
- ¿Cómo fue seguir instrucciones exactamente?
- ¿Hubo instrucciones ambiguas? ¿Cómo las resolviste?
- ¿Cómo cambió el camino cuando cambiaste los valores de las variables?

## Parte 3: Programas más complejos

### Programa 2: Comprobando elegibilidad

Crea un programa más complejo que determine si alguien es elegible para una actividad específica basándose en múltiples condiciones:

1. INICIO
2. ESTABLECER elegible = falso
3. OBTENER edad
4. SI edad >= 13 ENTONCES ir a tarjeta #5, SI NO ir a tarjeta #11
5. OBTENER tiene_permiso
6. SI tiene_permiso == verdadero ENTONCES ir a tarjeta #7, SI NO ir a tarjeta #11
7. OBTENER nivel_habilidad
8. SI nivel_habilidad == "principiante" ENTONCES ir a tarjeta #9
9. ESTABLECER elegible = verdadero
10. Ir a tarjeta #11
11. SI elegible == verdadero ENTONCES ir a tarjeta #12, SI NO ir a tarjeta #14
12. MOSTRAR "Puedes unirte a la clase intermedia"
13. Ir a tarjeta #15
14. MOSTRAR "Lo siento, no puedes unirte a esta clase"
15. FIN

#### Variables a seguir
- edad (ej., 10, 15)
- tiene_permiso (verdadero/falso)
- nivel_habilidad ("principiante", "intermedio", "avanzado")
- elegible (verdadero/falso)

#### Ejecución
Ejecuta este programa varias veces con diferentes valores de entrada para ver cómo cambia el resultado.

## Parte 4: Simulación de depuración

### Paso 1: Introducir errores
Crea una versión de uno de los programas anteriores con "errores" intencionales como:
- Instrucciones faltantes
- Verificaciones de condición incorrectas
- Bucles infinitos (caminos que nunca llegan al FIN)

### Paso 2: Depurar en grupo
Haz que los estudiantes ejecuten el programa e identifiquen dónde salen mal las cosas.

### Paso 3: Corregir los errores
Discutan cómo corregir cada error y modifiquen las tarjetas de instrucciones en consecuencia.

## Parte 5: Creando tus propios programas

### Paso 1: Diseño en grupo
Divide a los estudiantes en pequeños grupos y haz que cada grupo diseñe un programa simple que:
- Use al menos dos variables
- Incluya al menos dos puntos de decisión (declaraciones SI)
- Tenga un comienzo y final claros
- Se relacione con un escenario de la vida real

### Paso 2: Crear tarjetas de instrucciones
Cada grupo crea tarjetas de instrucciones para su programa.

### Paso 3: Ejecutar los programas de otros
Los grupos intercambian programas y los representan.

### Paso 4: Retroalimentación
Los grupos proporcionan retroalimentación sobre los programas de los demás:
- ¿El programa era claro de seguir?
- ¿Había instrucciones ambiguas?
- ¿Había errores o errores lógicos?
- ¿Cómo podría mejorarse el programa?

## Actividades de extensión

### 1. Añadir bucles
Introduce estructuras de bucle simples (bucles MIENTRAS o PARA) en tus programas. Marca un camino de "retorno de bucle" en el suelo.

### 2. Múltiples caminos de ejecución
Ejecuta el mismo programa con diferentes valores de entrada y usa cinta de diferentes colores para marcar cada camino de ejecución, creando un mapa visual de todos los posibles caminos a través del programa.

### 3. Ejecución concurrente
Simula múltiples "CPUs" ejecutando diferentes partes de un programa simultáneamente, y discute los desafíos de la coordinación.

## Preguntas de reflexión

En tu cuaderno, responde estas preguntas:
1. ¿Cómo se sintió ser una "computadora humana"? ¿Qué fue desafiante al respecto?
2. ¿Cómo te ayudó trazar los programas a entender la lógica condicional?
3. ¿Te sorprendió alguno de los caminos de ejecución o resultados?
4. ¿Cómo podría ayudarte esta experiencia cuando escribas tus propios programas en el futuro?
5. ¿De qué manera crees que las computadoras reales difieren de nuestra simulación de "computadora humana"?

## Conexión con la programación

El proceso de ejecución paso a paso que experimentaste refleja cómo las computadoras reales procesan el código. Cuando eventualmente programes en una computadora, esta comprensión te ayudará a:
- Escribir instrucciones más claras y precisas
- Predecir cómo se comportará tu programa con diferentes entradas
- Depurar problemas trazando mentalmente la ejecución
- Entender cómo la computadora mantiene el estado a través de variables

Esta simulación también demuestra por qué las computadoras necesitan instrucciones tan precisas—solo pueden seguir exactamente lo que se les dice, sin la capacidad humana de inferir, asumir o entender el contexto.