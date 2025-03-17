---
language: es
original_file: en/chapter-02/sections/03-pseudo-coding.md
last_synced: 2025-03-17
translation_status: complete
---

# Pseudocódigo

## Introducción

En las secciones anteriores, exploramos la lógica booleana, las declaraciones condicionales y los diagramas de flujo. Ahora vamos a aprender sobre el pseudocódigo, una herramienta poderosa que cierra la brecha entre el lenguaje humano y los lenguajes de programación formales.

El pseudocódigo es como un borrador de un programa—expresa la lógica y los pasos en una forma que es más fácil de escribir y entender para los humanos, mientras mantiene suficiente estructura para ser fácilmente traducido a código real más tarde.

## ¿Qué es el pseudocódigo?

El pseudocódigo es una forma de describir un algoritmo o programa usando una mezcla de lenguaje natural (como el español) y estructuras similares a la programación. No está destinado a ser ejecutado por una computadora sino más bien a ayudar a los programadores a planificar su código y comunicar sus ideas a otros.

Piensa en el pseudocódigo como un conjunto de instrucciones de cocina. Cuando lees una receta, tiene un formato específico y usa ciertas convenciones, pero está escrita de una manera que los humanos pueden entender fácilmente. De manera similar, el pseudocódigo utiliza conceptos de programación pero los expresa en una forma más legible.

## ¿Por qué usar pseudocódigo?

El pseudocódigo ofrece varias ventajas:

1. **Enfoque en la lógica**: Te permite concentrarte en la lógica de resolución de problemas sin quedar atrapado en detalles de sintaxis del lenguaje de programación.

2. **Comunicación**: Es más fácil de entender para otros (incluso no programadores), lo que lo hace ideal para discutir algoritmos y soluciones.

3. **Planificación**: Te ayuda a organizar tus pensamientos y planificar tu programa antes de escribir código real.

4. **Independencia del lenguaje**: El pseudocódigo no está ligado a ningún lenguaje de programación específico, por lo que el mismo pseudocódigo puede traducirse a diferentes lenguajes.

5. **Prevención de errores**: Al planificar tu lógica en pseudocódigo primero, puedes detectar errores lógicos temprano, antes de escribir código real.

## Convenciones del pseudocódigo

Aunque no existe una sintaxis "oficial" única para el pseudocódigo, comúnmente se utilizan ciertas convenciones:

1. **Usar declaraciones descriptivas en español** para la mayoría de las instrucciones

2. **ESCRIBIR EN MAYÚSCULAS** palabras clave como SI, SI NO, MIENTRAS, PARA, etc.

3. **Indentar** bloques de código para mostrar la estructura

4. **Usar símbolos estándar** para operaciones:
   - = para asignación
   - ==, >, <, >=, <= para comparaciones
   - +, -, *, / para operaciones aritméticas

5. **Numerar líneas** (opcional) para facilitar la discusión

Veamos un ejemplo de pseudocódigo para determinar el mayor de tres números:

```
1. INICIO
2. OBTENER numero1, numero2, numero3
3. ESTABLECER mayor = numero1
4. SI numero2 > mayor ENTONCES
5.     ESTABLECER mayor = numero2
6. FIN SI
7. SI numero3 > mayor ENTONCES
8.     ESTABLECER mayor = numero3
9. FIN SI
10. MOSTRAR "El número mayor es " + mayor
11. FIN
```

## De diagramas de flujo a pseudocódigo

Una de las fortalezas del pseudocódigo es lo bien que se combina con los diagramas de flujo. Tomemos el diagrama de flujo de actividad de fin de semana de la sección anterior y convirtámoslo a pseudocódigo:

Diagrama de flujo (conceptual):
```
¿Es fin de semana Y el clima es bueno?
  |
  |--> Sí --> Ir al parque
  |
  |--> No --> Quedarse en casa
```

Pseudocódigo:
```
1. OBTENER dia_de_semana
2. OBTENER condicion_climatica
3. SI dia_de_semana == "Sábado" O dia_de_semana == "Domingo" ENTONCES
4.     SI condicion_climatica == "buena" ENTONCES
5.         MOSTRAR "Ir al parque"
6.     SI NO
7.         MOSTRAR "Quedarse en casa"
8.     FIN SI
9. SI NO
10.    MOSTRAR "Quedarse en casa"
11. FIN SI
```

Observa cómo el pseudocódigo es más detallado que el diagrama de flujo pero sigue siendo más fácil de leer que el código de programación real.

## Elementos comunes del pseudocódigo

### Entrada y salida
```
OBTENER nombre_variable      // Para entrada
MOSTRAR mensaje              // Para salida
```

### Variables y asignación
```
ESTABLECER variable = valor  // Asigna un valor a una variable
```

### Declaraciones condicionales
```
SI condición ENTONCES        // SI simple
    declaraciones
FIN SI

SI condición ENTONCES        // SI-SI NO
    declaraciones1
SI NO
    declaraciones2
FIN SI

SI condición1 ENTONCES       // SI-SI NO SI-SI NO
    declaraciones1
SI NO SI condición2 ENTONCES
    declaraciones2
SI NO
    declaraciones3
FIN SI
```

### Bucles (que exploraremos más en capítulos posteriores)
```
MIENTRAS condición HACER     // Bucle MIENTRAS
    declaraciones
FIN MIENTRAS

PARA i = inicio HASTA fin    // Bucle PARA
    declaraciones
FIN PARA
```

### Funciones (que también exploraremos más adelante)
```
FUNCIÓN nombre(parámetros)
    declaraciones
    DEVOLVER valor
FIN FUNCIÓN
```

## Ejemplo: Usando pseudocódigo para planificar una solución

Usemos pseudocódigo para planificar una solución para un problema común: determinar si un año es bisiesto.

Un año bisiesto es un año que es divisible por 4, excepto los años que son divisibles por 100 pero no por 400.

Aquí está el pseudocódigo:

```
1. INICIO
2. OBTENER año
3. SI (año es divisible por 400) ENTONCES
4.     ESTABLECER es_bisiesto = verdadero
5. SI NO SI (año es divisible por 100) ENTONCES
6.     ESTABLECER es_bisiesto = falso
7. SI NO SI (año es divisible por 4) ENTONCES
8.     ESTABLECER es_bisiesto = verdadero
9. SI NO
10.    ESTABLECER es_bisiesto = falso
11. FIN SI
12. SI es_bisiesto ENTONCES
13.    MOSTRAR año + " es un año bisiesto"
14. SI NO
15.    MOSTRAR año + " no es un año bisiesto"
16. FIN SI
17. FIN
```

Escribir la lógica en pseudocódigo nos ayuda a detectar posibles problemas antes de comenzar a codificar. Por ejemplo, el orden de las condiciones es crucial; si verificáramos primero la divisibilidad por 4, clasificaríamos incorrectamente años como 1900 (que es divisible por 100 pero no por 400) como años bisiestos.

## Traduciendo lenguaje natural a pseudocódigo

A menudo, necesitarás traducir un problema descrito en lenguaje natural a pseudocódigo. Aquí hay un proceso para hacer esto:

1. **Identificar las entradas y salidas**
2. **Descomponer el problema en pasos**
3. **Identificar puntos de decisión**
4. **Escribir pseudocódigo para cada paso**
5. **Revisar y refinar tu solución**

Practiquemos con un ejemplo:

**Problema**: Un profesor quiere calcular el promedio de las calificaciones de los exámenes de un estudiante, pero quiere eliminar la calificación más baja si el estudiante ha realizado más de tres exámenes.

Paso 1: Identificar entradas y salidas
- Entradas: Una lista de calificaciones de exámenes
- Salida: El promedio (potencialmente con la calificación más baja eliminada)

Pasos 2-5: Descomponer el problema y escribir pseudocódigo

```
1. INICIO
2. OBTENER calificaciones_examenes (una lista de números)
3. ESTABLECER total = 0
4. ESTABLECER cantidad = número de calificaciones en calificaciones_examenes
5. SI cantidad > 3 ENTONCES
6.     ESTABLECER calificacion_min = primera calificación en calificaciones_examenes
7.     PARA cada calificación en calificaciones_examenes
8.         SI calificación < calificacion_min ENTONCES
9.             ESTABLECER calificacion_min = calificación
10.        FIN SI
11.    FIN PARA
12.    ESTABLECER total = suma de todas las calificaciones en calificaciones_examenes - calificacion_min
13.    ESTABLECER cantidad = cantidad - 1
14. SI NO
15.    ESTABLECER total = suma de todas las calificaciones en calificaciones_examenes
16. FIN SI
17. ESTABLECER promedio = total / cantidad
18. MOSTRAR "El promedio es " + promedio
19. FIN
```

## Actividad: Traduciendo problemas a pseudocódigo

Intenta convertir estos problemas del mundo real a pseudocódigo:

1. **Problema**: Determinar si un estudiante ha aprobado un curso. Para aprobar, el estudiante debe tener un promedio de al menos 60% y haber asistido al menos al 80% de las clases.

2. **Problema**: Calcular el costo de un viaje en taxi. La tarifa base es $2.50, y luego $0.50 por kilómetro. Si la distancia total es más de 10 kilómetros, se aplica un descuento del 5% a la tarifa total.

3. **Problema**: Una máquina expendedora da cambio usando la menor cantidad de monedas posible. Dado un monto de cambio a devolver, determinar cuántas monedas de 25¢, 10¢, 5¢, y 1¢ proporcionar.

Después de escribir tu pseudocódigo, pruébalo con ejemplos específicos para asegurarte de que funciona correctamente.

## Mejores prácticas para el pseudocódigo

Para escribir pseudocódigo efectivo:

1. **Sé claro y conciso**: Usa lenguaje simple que cualquiera pueda entender.

2. **Sé consistente**: Elige un estilo y mantente con él a lo largo de tu pseudocódigo.

3. **Usa el nivel adecuado de detalle**: Incluye suficiente detalle para entender la lógica, pero no te pierdas en detalles específicos de implementación.

4. **Piensa paso a paso**: Descompón operaciones complejas en pasos más simples.

5. **Usa nombres de variables significativos**: Elige nombres que describan lo que representan las variables.

6. **Comenta tu pseudocódigo**: Agrega explicaciones para partes complejas o no obvias.

## Del pseudocódigo al código

Una vez que hayas refinado tu pseudocódigo, traducirlo a código real se vuelve mucho más fácil. Aquí hay un ejemplo simple que muestra pseudocódigo y su traducción a varios lenguajes de programación:

Pseudocódigo:
```
SI temperatura > 30 ENTONCES
    MOSTRAR "¡Hace calor!"
SI NO
    MOSTRAR "No hace demasiado calor."
FIN SI
```

Python:
```python
if temperatura > 30:
    print("¡Hace calor!")
else:
    print("No hace demasiado calor.")
```

JavaScript:
```javascript
if (temperatura > 30) {
    console.log("¡Hace calor!");
} else {
    console.log("No hace demasiado calor.");
}
```

Cuando eventualmente comiences a escribir en un lenguaje de programación específico, encontrarás que la transición es mucho más fluida si ya has elaborado la lógica en pseudocódigo.

## Actividad: Implementando pseudocódigo en la vida real

¡El pseudocódigo no es solo para programas de computadora—puede ayudar con procesos de la vida real también!

1. Elige una tarea rutinaria que realizas regularmente (como preparar el desayuno, alistarte para la escuela, u organizar tu tiempo de estudio).

2. Escribe pseudocódigo para este proceso, incluyendo puntos de decisión y acciones repetitivas.

3. Prueba tu pseudocódigo siguiéndolo paso a paso.

4. Revisa tu pseudocódigo para hacer el proceso más eficiente.

Este ejercicio ayuda a desarrollar el pensamiento algorítmico para situaciones cotidianas.

## Puntos clave

- El pseudocódigo es una forma de describir algoritmos usando una mezcla de lenguaje natural y estructuras similares a la programación
- Cierra la brecha entre el pensamiento humano y los lenguajes de programación formales
- El pseudocódigo ayuda a enfocarse en la lógica de una solución sin quedar atrapado en la sintaxis específica del lenguaje
- Aunque no hay un estándar único para el pseudocódigo, la consistencia y la claridad son importantes
- El pseudocódigo funciona bien con los diagramas de flujo—se complementan mutuamente
- Desarrollar habilidades sólidas de pseudocódigo facilita la transición a lenguajes de programación reales

En este capítulo, hemos construido una base sólida en pensamiento lógico y estructura de programa. Hemos explorado la lógica booleana y las tablas de verdad, las declaraciones condicionales y los diagramas de flujo, y finalmente el pseudocódigo como un puente para expresar algoritmos de manera más formal. Estos bloques de construcción son esenciales para la programación y el pensamiento computacional, y te servirán bien a medida que profundizamos en conceptos más complejos en los próximos capítulos.