---
language: es
original_file: en/chapter-02/activities/01-truth-tables-and-logic-puzzles.md
last_synced: 2025-03-17
translation_status: complete
---

# Actividad: Tablas de verdad y acertijos lógicos

## Visión general
Esta actividad proporciona práctica práctica con lógica booleana utilizando tablas de verdad y acertijos lógicos. Al trabajar en estos ejercicios, desarrollarás tu comprensión de cómo funcionan los operadores lógicos (AND, OR, NOT) y cómo pueden combinarse para expresar condiciones complejas.

## Objetivos de aprendizaje
- Crear e interpretar tablas de verdad para operaciones lógicas básicas
- Evaluar expresiones lógicas complejas
- Traducir escenarios cotidianos a expresiones lógicas
- Identificar patrones en operaciones lógicas
- Desarrollar habilidades de razonamiento lógico esenciales para la programación

## Materiales necesarios
- Tu cuaderno
- Lápiz (y borrador)
- Opcional: Regla para dibujar tablas

## Tiempo requerido
45-60 minutos

## Parte 1: Creando tablas de verdad básicas

### Paso 1: Configura tablas de verdad para operaciones básicas
En tu cuaderno, crea tres tablas de verdad separadas para las operaciones lógicas básicas: AND, OR y NOT.

Para AND y OR, configura tus tablas con tres columnas:
- A
- B
- Resultado (A AND B) o (A OR B)

Para NOT, solo necesitarás dos columnas:
- A
- Resultado (NOT A)

### Paso 2: Completa los valores de verdad
Completa todas las combinaciones posibles de valores VERDADERO y FALSO para cada tabla y determina los resultados basándote en las reglas:

- AND: Devuelve VERDADERO solo cuando ambas entradas son VERDADERO
- OR: Devuelve VERDADERO cuando al menos una entrada es VERDADERO
- NOT: Devuelve lo opuesto del valor de entrada

### Ejemplo:
Para la operación AND, tu tabla completada debería verse así:

| A        | B        | A AND B  |
|----------|----------|----------|
| VERDADERO | VERDADERO | VERDADERO |
| VERDADERO | FALSO    | FALSO    |
| FALSO    | VERDADERO | FALSO    |
| FALSO    | FALSO    | FALSO    |

## Parte 2: Expresiones lógicas compuestas

Ahora practiquemos con expresiones más complejas que combinan múltiples operadores.

### Paso 1: Configura tablas de verdad para expresiones compuestas
Crea tablas de verdad para cada una de las siguientes expresiones:

1. (A AND B) OR C
2. A AND (B OR C)
3. NOT (A AND B)
4. (NOT A) OR (NOT B)

Para cada expresión, tu tabla necesitará cuatro columnas:
- A
- B
- C
- Resultado

### Paso 2: Completa todas las combinaciones posibles
Cada tabla tendrá 8 filas (2³ = 8 combinaciones posibles con tres variables).

### Paso 3: Evalúa paso a paso
Para cada expresión, trabaja la lógica paso a paso. Por ejemplo, para "(A AND B) OR C":
1. Primero calcula (A AND B)
2. Luego calcula el resultado final: (A AND B) OR C

### Ejemplo:
Para la expresión (A AND B) OR C, las primeras filas podrían verse así:

| A        | B        | C        | (A AND B) | (A AND B) OR C |
|----------|----------|----------|-----------|----------------|
| VERDADERO | VERDADERO | VERDADERO | VERDADERO  | VERDADERO        |
| VERDADERO | VERDADERO | FALSO    | VERDADERO  | VERDADERO        |
| VERDADERO | FALSO    | VERDADERO | FALSO     | VERDADERO        |
| ...      | ...      | ...      | ...       | ...            |

Puedes crear una columna intermedia como se muestra para ayudar con los cálculos, o simplemente resolverlo paso a paso en tu mente.

## Parte 3: Equivalencias lógicas

Algunas expresiones lógicas diferentes pueden ser equivalentes—siempre producen los mismos resultados para las mismas entradas.

### Paso 1: Compara tus tablas de verdad
Observa tus tablas de verdad completadas para las expresiones 3 y 4:
- NOT (A AND B)
- (NOT A) OR (NOT B)

Compara las columnas de resultados. ¿Son iguales para todas las combinaciones de entrada?

### Paso 2: Descubre las Leyes de De Morgan
Lo que acabas de verificar es una de las Leyes de De Morgan, un principio importante en lógica:
- NOT (A AND B) es equivalente a (NOT A) OR (NOT B)

La otra Ley de De Morgan establece:
- NOT (A OR B) es equivalente a (NOT A) AND (NOT B)

### Paso 3: Verifica la segunda ley
Crea tablas de verdad para verificar la segunda Ley de De Morgan.

## Parte 4: Acertijos lógicos

¡Ahora apliquemos la lógica booleana para resolver algunos acertijos!

### Acertijo 1: Detectando mentiras
Tres personas (Ali, Bo y Cal) hacen una declaración cada una, pero sabes que solo una de ellas está diciendo la verdad.

- Ali dice: "Estoy diciendo la verdad."
- Bo dice: "Ali está mintiendo."
- Cal dice: "Bo está mintiendo."

¿Quién está diciendo la verdad?

Para resolver esto, crea una tabla de verdad con todas las posibilidades (cada persona dice la verdad T o miente M), y verifica qué escenario coincide con la condición de que exactamente una persona dice la verdad.

### Acertijo 2: Los interruptores de luz
Estás en una habitación con tres interruptores de luz, cada uno conectado a una bombilla diferente en otra habitación. No puedes ver las bombillas desde donde están los interruptores, y solo puedes ir a la otra habitación una vez para revisar las bombillas.

¿Cómo puedes determinar qué interruptor controla qué bombilla?

Piensa en este acertijo en términos de los estados (ENCENDIDO/APAGADO) y qué información puedes reunir con solo una visita a la otra habitación.

### Acertijo 3: Deducción lógica
Basándote en estas pistas, determina quién tiene qué mascota:
- Hay tres amigos: Xia, Yoon y Zach
- Cada uno tiene una mascota: un perro, un gato o un pájaro
- Xia no tiene el pájaro
- Si Yoon tiene el gato, entonces Zach tiene el pájaro
- Si Zach no tiene el perro, entonces Xia tiene el perro

Crea una tabla para rastrear posibilidades y usa la lógica booleana para reducir la respuesta.

## Parte 5: Aplicaciones del mundo real

### Aplicación 1: Criterios de elegibilidad
Una beca tiene los siguientes requisitos de elegibilidad:
- El estudiante debe tener un promedio de al menos 3.5 O
- El estudiante debe haber completado al menos 30 horas de servicio comunitario Y tener un promedio de al menos 3.0

Escribe esto como una expresión lógica usando variables:
- Sea G = "El promedio es al menos 3.5"
- Sea H = "Completó al menos 30 horas de servicio comunitario"
- Sea M = "El promedio es al menos 3.0"

Luego crea una tabla de verdad para mostrar todas las combinaciones de estas variables y si cada combinación calificaría para la beca.

### Aplicación 2: Personalización de menú
El sistema de pedidos de un restaurante utiliza lógica para determinar combinaciones de comidas:
- Cada comida viene con arroz O papas (pero no ambos)
- Si eliges el plato de pescado, debes tener verduras
- Si eliges verduras, puedes tener salsa A O salsa B (pero no ambas)

Crea variables para cada elección y escribe expresiones lógicas para combinaciones válidas de comidas.

## Actividades de extensión

### 1. Crea tu propio acertijo lógico
Diseña un acertijo lógico similar a los de la Parte 4, y proporciona su solución. Intercambia acertijos con compañeros de clase si es posible.

### 2. Explora NAND y NOR
Investiga dos operaciones lógicas adicionales: NAND (NOT AND) y NOR (NOT OR). Crea sus tablas de verdad y explora cómo cualquier expresión lógica puede construirse usando solo operaciones NAND o solo operaciones NOR.

### 3. Diagramas de Venn
Dibuja diagramas de Venn para representar las operaciones AND, OR y NOT visualmente. Luego usa diagramas de Venn para ilustrar las expresiones compuestas de la Parte 2.

## Preguntas de reflexión

En tu cuaderno, responde estas preguntas:
1. ¿Qué operación lógica (AND, OR, NOT) fue más fácil de entender para ti? ¿Cuál fue la más desafiante?
2. ¿Cómo ayudan las Leyes de De Morgan a simplificar expresiones lógicas complejas?
3. ¿Cómo podrías usar la lógica booleana en tu toma de decisiones cotidiana?
4. ¿Qué patrones notaste en las tablas de verdad que creaste?
5. ¿Cómo crees que las computadoras usan estas operaciones lógicas para tomar decisiones?

## Conexión con la programación

La lógica booleana que has practicado en esta actividad forma la base de la toma de decisiones en programación. Cada declaración condicional (IF-THEN-ELSE) se basa en evaluar expresiones lógicas. Entender estos principios te ayudará a escribir código claro y efectivo y a depurar errores lógicos en tus programas cuando eventualmente comiences a programar en una computadora.