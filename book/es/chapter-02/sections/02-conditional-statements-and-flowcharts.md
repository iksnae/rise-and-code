---
language: es
original_file: en/chapter-02/sections/02-conditional-statements-and-flowcharts.md
last_synced: 2025-03-17
translation_status: complete
---

# Declaraciones condicionales y diagramas de flujo

## Introducción

En la sección anterior, aprendimos sobre la lógica booleana y cómo tomar decisiones básicas usando estructuras SI-ENTONCES-SI NO. Ahora, ampliaremos estos conceptos explorando las declaraciones condicionales con más detalle e introduciendo los diagramas de flujo—herramientas visuales que nos ayudan a mapear la lógica de nuestros programas.

## Entendiendo las declaraciones condicionales

Las declaraciones condicionales son la columna vertebral de la toma de decisiones en programación. Permiten que un programa realice diferentes acciones basándose en si ciertas condiciones son verdaderas o falsas.

La estructura básica de una declaración condicional es:

```
SI condición ENTONCES
    hacer algo
SI NO
    hacer otra cosa
FIN SI
```

Examinemos cada parte:

- **SI**: Señala el inicio de una declaración condicional
- **condición**: Una expresión booleana que se evalúa como verdadera o falsa
- **ENTONCES**: Marca lo que sucede si la condición es verdadera
- **hacer algo**: Las acciones que ocurren si la condición es verdadera
- **SI NO**: Introduce las acciones alternativas
- **hacer otra cosa**: Las acciones que ocurren si la condición es falsa
- **FIN SI**: Señala el final de la declaración condicional

## Tipos de declaraciones condicionales

### 1. Declaración SI simple

La forma más simple solo ejecuta código cuando una condición es verdadera:

```
SI está lloviendo ENTONCES
    llevar un paraguas
FIN SI
```

En este caso, no sucede nada específico si no está lloviendo. El programa simplemente continúa con las siguientes instrucciones.

### 2. Declaración SI-SI NO

Esta forma proporciona dos caminos: uno para cuando la condición es verdadera y otro para cuando es falsa:

```
SI temperatura > 30 grados ENTONCES
    usar ropa ligera
SI NO
    usar una chaqueta
FIN SI
```

### 3. Declaraciones SI anidadas

Las declaraciones condicionales pueden colocarse dentro de otras declaraciones condicionales para manejar escenarios más complejos:

```
SI es un día de semana ENTONCES
    SI es por la mañana ENTONCES
        ir a la escuela
    SI NO
        hacer la tarea
    FIN SI
SI NO
    relajarse y jugar
FIN SI
```

### 4. Declaración SI NO SI (o SINO SI)

Cuando necesitamos verificar múltiples condiciones en secuencia:

```
SI puntuación >= 90 ENTONCES
    calificación = "A"
SI NO SI puntuación >= 80 ENTONCES
    calificación = "B"
SI NO SI puntuación >= 70 ENTONCES
    calificación = "C"
SI NO SI puntuación >= 60 ENTONCES
    calificación = "D"
SI NO
    calificación = "F"
FIN SI
```

En este ejemplo, estamos verificando una serie de condiciones en orden, y solo un bloque de código se ejecutará.

## Introducción a los diagramas de flujo

Un diagrama de flujo es un diagrama que representa un proceso o flujo de trabajo, mostrando los pasos como cajas de diferentes tipos, y su orden conectándolas con flechas. Los diagramas de flujo son particularmente útiles para visualizar la lógica de los programas, especialmente aquellos con declaraciones condicionales.

### Símbolos básicos de los diagramas de flujo

Estos son los símbolos más comunes utilizados en los diagramas de flujo:

1. **Inicio/Fin (Óvalo o Rectángulo redondeado)**
   - Se utiliza para indicar el comienzo o el final de un proceso
   - Ejemplo: "Inicio" o "Fin"

2. **Proceso (Rectángulo)**
   - Representa un paso en el proceso o una acción a tomar
   - Ejemplo: "Agregar 2 tazas de harina" o "Calcular precio total"

3. **Decisión (Diamante)**
   - Muestra un punto donde se debe tomar una decisión
   - Típicamente contiene una pregunta con una respuesta sí/no o verdadero/falso
   - Ejemplo: "¿Está lloviendo?" o "¿Es x > 10?"

4. **Líneas de flujo (Flechas)**
   - Conectan los símbolos para mostrar la secuencia de pasos
   - Indican la dirección del flujo del proceso

5. **Entrada/Salida (Paralelogramo)**
   - Representa operaciones de entrada o salida
   - Ejemplo: "Ingresa tu nombre" o "Mostrar total"

### Creando un diagrama de flujo simple

Vamos a crear un diagrama de flujo para una rutina matutina simple:

```
Inicio
  |
  v
¿Es día de semana?
  |
  |--> Sí --> Despertar a las 6:30 AM
  |              |
  |              v
  |            Desayunar
  |              |
  |              v
  |            Ir a la escuela/trabajo
  |
  |--> No --> Despertar a las 8:00 AM
                |
                v
              Tomar un desayuno tranquilo
                |
                v
              Disfrutar tiempo libre
                |
                v
Fin
```

Este diagrama de flujo muestra claramente los diferentes caminos que nuestra mañana podría tomar dependiendo de si es un día de semana o no.

## Traduciendo entre declaraciones condicionales y diagramas de flujo

Las dos representaciones—código y diagramas de flujo—pueden traducirse fácilmente entre sí. Por ejemplo, la rutina matutina en código sería:

```
SI es un día de semana ENTONCES
    Despertar a las 6:30 AM
    Desayunar
    Ir a la escuela/trabajo
SI NO
    Despertar a las 8:00 AM
    Tomar un desayuno tranquilo
    Disfrutar tiempo libre
FIN SI
```

La correspondencia entre las dos representaciones es directa e intencional. Los diagramas de flujo proporcionan una visión general visual de la lógica del programa, mientras que el código proporciona las instrucciones detalladas.

## Cuándo usar diagramas de flujo

Los diagramas de flujo son particularmente útiles cuando:

1. Planificamos un programa antes de escribir código
2. Explicamos nuestra lógica a otros
3. Depuramos estructuras de decisión complejas
4. Documentamos cómo funciona un programa

## Actividad: Toma de decisiones con diagramas de flujo

Practiquemos creando un diagrama de flujo para decidir qué hacer en una tarde de sábado.

Aquí hay un conjunto de reglas:
- Si está lloviendo, te quedarás dentro y leerás un libro o verás una película
- Si no está lloviendo pero hace mucho calor (más de 35°C), irás a la piscina
- Si no está lloviendo y la temperatura es agradable, irás al parque
- Si no está lloviendo pero hace frío (menos de 15°C), visitarás la casa de un amigo

Dibuja el diagrama de flujo para este proceso de decisión en tu cuaderno. Asegúrate de usar los símbolos adecuados para inicio/fin, decisiones y procesos.

## Condiciones complejas en diagramas de flujo

Los diagramas de flujo también pueden representar condiciones booleanas complejas:

### Condición AND (Y)
Cuando se usa AND, ambas condiciones deben ser verdaderas para seguir el camino "Sí":

```
¿Está soleado?
  |
  |--> Sí --> ¿Tengo tiempo libre?
  |              |
  |              |--> Sí --> Ir a la playa
  |              |
  |              |--> No --> Quedarse en casa y mirar por la ventana
  |
  |--> No --> (siguiente decisión)
```

### Condición OR (O)
Cuando se usa OR, cualquiera de las condiciones siendo verdadera es suficiente para seguir el camino "Sí":

```
¿Está lloviendo O nevando?
  |
  |--> Sí --> Quedarse en interior
  |
  |--> No --> (siguiente decisión)
```

## Decisiones anidadas vs. condiciones compuestas

A menudo hay múltiples formas de representar la misma lógica. Considera estos enfoques equivalentes:

### Enfoque 1: Decisiones anidadas
```
¿Es fin de semana?
  |
  |--> Sí --> ¿El clima es bueno?
  |              |
  |              |--> Sí --> Ir al parque
  |              |
  |              |--> No --> Quedarse en casa
  |
  |--> No --> Quedarse en casa
```

### Enfoque 2: Condición compuesta
```
¿Es fin de semana Y el clima es bueno?
  |
  |--> Sí --> Ir al parque
  |
  |--> No --> Quedarse en casa
```

Ambos enfoques conducen a los mismos resultados, pero el segundo es más conciso. A medida que ganes experiencia con la lógica de programación, desarrollarás una intuición para qué representación funciona mejor en diferentes situaciones.

## Errores comunes en la lógica condicional

### 1. Olvidar casos límite
Siempre considera todos los caminos posibles a través de tu lógica. ¿Qué sucede en casos especiales o extremos?

### 2. Condiciones superpuestas
Ten cuidado cuando las condiciones pueden superponerse. Por ejemplo:

```
SI puntuación > 90 ENTONCES
    calificación = "A"
SI puntuación > 80 ENTONCES
    calificación = "B"
...
```

En este caso, una puntuación de 95 primero establecería la calificación como "A", pero luego inmediatamente la sobrescribiría con "B". El enfoque correcto es usar SI NO SI para hacer que las condiciones sean mutuamente excluyentes.

### 3. Bucles infinitos
Cuando se usan diagramas de flujo para representar procesos repetitivos (que exploraremos más en capítulos futuros), ten cuidado de no crear caminos que nunca terminen.

## Actividad: Diagramando una decisión de la vida real

Piensa en una decisión significativa que tomaste recientemente o necesitas tomar (como elegir un curso para estudiar, decidir sobre una compra o planificar un evento).

1. Enumera todos los factores que influyen en la decisión.
2. Determina cómo estos factores se relacionan entre sí (usando AND, OR, NOT).
3. Dibuja un diagrama de flujo que represente el proceso de decisión.
4. Prueba tu diagrama de flujo con diferentes escenarios para ver si produce los resultados esperados.

Por ejemplo, comprar un nuevo par de zapatos podría involucrar factores como precio, comodidad, estilo y necesidad.

## Puntos clave

- Las declaraciones condicionales (SI-ENTONCES-SI NO) permiten a los programas tomar decisiones basadas en condiciones
- Hay varios tipos de declaraciones condicionales: SI simple, SI-SI NO, SI anidado y SI NO SI
- Los diagramas de flujo son representaciones visuales de la lógica del programa usando símbolos estandarizados
- Las decisiones en los diagramas de flujo están representadas por formas de diamante con caminos Sí/No
- Las condiciones complejas usando AND, OR y NOT pueden representarse en diagramas de flujo
- Tanto el código como los diagramas de flujo son herramientas para expresar la misma lógica subyacente

En la siguiente sección, exploraremos el pseudocódigo—una forma de escribir instrucciones similares a programas en una forma que es más fácil de leer y escribir para los humanos, cerrando la brecha entre el lenguaje natural y los lenguajes de programación formales.