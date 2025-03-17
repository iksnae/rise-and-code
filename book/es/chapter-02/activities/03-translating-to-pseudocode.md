---
language: es
original_file: en/chapter-02/activities/03-translating-to-pseudocode.md
last_synced: 2025-03-17
translation_status: complete
---

# Actividad: Traduciendo del lenguaje natural al pseudocódigo

## Visión general
Esta actividad te ayuda a desarrollar la habilidad de traducir instrucciones en lenguaje natural al pseudocódigo. Aprenderás a tomar procesos cotidianos y reescribirlos en un formato más estructurado y paso a paso que cierra la brecha entre el lenguaje humano y el código de programación formal.

## Objetivos de aprendizaje
- Convertir descripciones en lenguaje natural en pseudocódigo claro y estructurado
- Practicar el uso de convenciones y sintaxis estándar de pseudocódigo
- Desglosar procesos complejos en pasos lógicos
- Identificar puntos de decisión y estructuras de control dentro de los procesos
- Desarrollar precisión al expresar algoritmos

## Materiales necesarios
- Tu cuaderno
- Lápiz y borrador
- La guía de referencia de pseudocódigo (de la Sección 3)

## Tiempo requerido
45-60 minutos

## Parte 1: Revisión de convenciones de pseudocódigo

Antes de comenzar los ejercicios de traducción, repasemos las convenciones clave del pseudocódigo:

1. **Palabras clave**: Comúnmente en mayúsculas (SI, SI NO, MIENTRAS, PARA, etc.)
2. **Indentación**: Usada para mostrar anidamiento y estructura
3. **Asignación**: Usa = (ej., ESTABLECER total = 0)
4. **Comparación**: Usa ==, >, <, >=, <= (ej., SI edad >= 18 ENTONCES)
5. **Operaciones básicas**:
   - Entrada: OBTENER o ENTRADA
   - Salida: MOSTRAR o SALIDA
   - Procesamiento: ESTABLECER, CALCULAR
   - Toma de decisiones: SI-ENTONCES-SI NO
   - Repetición: MIENTRAS, PARA
   - Función: FUNCIÓN, PROCEDIMIENTO, DEVOLVER

En tu cuaderno, crea una página de referencia con estas convenciones y añade ejemplos de cada una.

## Parte 2: Traducciones simples

### Paso 1: Estudia el ejemplo
Aquí hay un ejemplo de traducción de una descripción simple en lenguaje natural a pseudocódigo:

**Lenguaje natural**:
Para hacer una taza de té, primero hierve agua en una tetera. Una vez que el agua esté hirviendo, viértela en una taza con una bolsa de té. Déjala reposar por 3 minutos, luego retira la bolsa de té. Añade azúcar si lo deseas.

**Pseudocódigo**:
```
INICIO
    Hervir agua en tetera
    MIENTRAS el agua no esté hirviendo
        Esperar
    FIN MIENTRAS
    Verter agua en taza con bolsa de té
    Esperar por 3 minutos
    Retirar bolsa de té
    MOSTRAR "¿Quieres azúcar?"
    OBTENER desea_azucar
    SI desea_azucar == "sí" ENTONCES
        Añadir azúcar al té
    FIN SI
FIN
```

### Paso 2: Practica con procesos simples
Traduce cada una de estas descripciones en lenguaje natural a pseudocódigo:

1. **Verificar si un número es par o impar**:
   "Toma un número. Si puedes dividirlo por 2 sin un resto, es par. De lo contrario, es impar."

2. **Hacer un sándwich**:
   "Toma dos rebanadas de pan. Unta mantequilla en un lado de cada rebanada. Añade queso y jamón entre las rebanadas, con los lados con mantequilla hacia adentro. Opcionalmente, tuesta el sándwich hasta que el queso se derrita."

3. **Configurar una alarma**:
   "Decide a qué hora necesitas despertar. Resta el tiempo que necesitas para alistarte. Configura tu alarma para esa hora. Asegúrate de que la alarma esté encendida antes de ir a dormir."

### Paso 3: Revisa y refina
Para cada una de tus traducciones:
- Verifica que hayas usado las convenciones correctas de pseudocódigo
- Asegúrate de que todos los pasos estén incluidos y en el orden correcto
- Busca ambigüedades o detalles faltantes en tu pseudocódigo
- Asegúrate de que los puntos de decisión (declaraciones SI) tengan condiciones claras

## Parte 3: Traduciendo procesos complejos

Ahora abordemos procesos más complejos que involucran múltiples decisiones y posibles bucles.

### Paso 1: Ejercicio de traducción
Traduce estos procesos más complejos a pseudocódigo:

1. **Encontrar el máximo de tres números**:
   "Dados tres números, primero compara los dos primeros números para encontrar cuál es mayor. Luego compara ese resultado con el tercer número para encontrar el mayor de los tres."

2. **Calculando una cuenta de restaurante con propina**:
   "Suma el costo de todos los platos ordenados. Verifica si ya se incluye un cargo por servicio. Si no, calcula una propina del 15% por buen servicio o 20% por servicio excelente. Añade la propina al total de la cuenta. Divide el total equitativamente entre todos los comensales."

3. **Planificando un viaje**:
   "Decide un destino. Verifica si tienes suficiente dinero para el viaje. Si lo tienes, reserva transporte y alojamiento. Si no, elige un destino más económico o ahorra más dinero antes de reservar. Antes del viaje, haz una lista de equipaje y empaca tus maletas. El día del viaje, verifica nuevamente que tengas todos los elementos esenciales."

### Paso 2: Añade detalle y claridad
Revisa tu pseudocódigo y mejóralo:
- Añade comentarios para explicar partes complejas
- Usa nombres de variables más específicos (ej., `costo_total` en lugar de solo `total`)
- Desglosa pasos muy complejos en más simples
- Asegúrate de que todos los casos límite estén manejados

## Parte 4: De diagramas de flujo a pseudocódigo

### Paso 1: Elige un diagrama de flujo
Selecciona uno de los diagramas de flujo que creaste en la actividad anterior, o usa este ejemplo simple de decidir si llevar un paraguas:

```
Inicio
  |
  v
¿Está lloviendo actualmente?
  |
  |--> Sí --> Llevar paraguas
  |              |
  |              v
  |           Salir afuera
  |
  |--> No --> Revisar el pronóstico
               |
               v
          ¿Se pronostica lluvia?
               |
               |--> Sí --> Llevar paraguas
               |              |
               |              v
               |           Salir afuera
               |
               |--> No --> Dejar el paraguas en casa
                             |
                             v
                          Salir afuera
                             |
                             v
                            Fin
```

### Paso 2: Convierte a pseudocódigo
Traduce el diagrama de flujo seleccionado a pseudocódigo. Recuerda que:
- Los diamantes (símbolos de decisión) se convierten en declaraciones SI
- Los rectángulos (símbolos de proceso) se convierten en acciones
- Las líneas de flujo indican la secuencia y anidamiento de las declaraciones

Para el ejemplo del paraguas, el pseudocódigo podría verse así:

```
INICIO
    SI actualmente_lloviendo ENTONCES
        Llevar paraguas
        Salir afuera
    SI NO
        Revisar pronóstico
        SI se_pronostica_lluvia ENTONCES
            Llevar paraguas
            Salir afuera
        SI NO
            Dejar paraguas en casa
            Salir afuera
        FIN SI
    FIN SI
FIN
```

### Paso 3: Compara representaciones
Reflexiona sobre las diferencias entre las representaciones de diagrama de flujo y pseudocódigo:
- ¿Cuál es más fácil de crear?
- ¿Cuál es más fácil de entender a simple vista?
- ¿Cuál proporciona más detalle?
- ¿Cuándo podría ser más útil cada representación?

## Parte 5: Del pseudocódigo al lenguaje natural

Ahora practiquemos el proceso inverso: convertir pseudocódigo a lenguaje natural. Esto ayuda a asegurar que tu pseudocódigo sea correcto y completo.

### Paso 1: Estudia el ejemplo
Aquí hay pseudocódigo para encontrar el promedio de una lista de números:

```
INICIO
    ESTABLECER suma = 0
    ESTABLECER contador = 0
    MIENTRAS haya más números por procesar
        OBTENER siguiente_numero
        ESTABLECER suma = suma + siguiente_numero
        ESTABLECER contador = contador + 1
    FIN MIENTRAS
    SI contador > 0 ENTONCES
        ESTABLECER promedio = suma / contador
        MOSTRAR promedio
    SI NO
        MOSTRAR "No hay números para promediar"
    FIN SI
FIN
```

Traducción a lenguaje natural:
"Para encontrar el promedio de una lista de números, comienza estableciendo la suma y el contador en cero. Mientras haya más números por procesar, obtén el siguiente número, agrégalo a la suma y aumenta el contador en uno. Después de procesar todos los números, si el contador es mayor que cero, calcula el promedio dividiendo la suma por el contador y muestra el resultado. De lo contrario, muestra un mensaje de que no hay números para promediar."

### Paso 2: Traduce al lenguaje natural
Convierte cada uno de estos ejemplos de pseudocódigo a lenguaje natural claro:

1. **Verificando la fortaleza de una contraseña**:
```
INICIO
    OBTENER contraseña
    ESTABLECER fortaleza = 0
    SI longitud de contraseña >= 8 ENTONCES
        ESTABLECER fortaleza = fortaleza + 1
    FIN SI
    SI contraseña contiene números ENTONCES
        ESTABLECER fortaleza = fortaleza + 1
    FIN SI
    SI contraseña contiene caracteres especiales ENTONCES
        ESTABLECER fortaleza = fortaleza + 1
    FIN SI
    SI fortaleza == 0 ENTONCES
        MOSTRAR "Contraseña débil"
    SI NO SI fortaleza == 1 ENTONCES
        MOSTRAR "Contraseña moderada"
    SI NO SI fortaleza == 2 ENTONCES
        MOSTRAR "Contraseña fuerte"
    SI NO
        MOSTRAR "Contraseña muy fuerte"
    FIN SI
FIN
```

2. **Haciendo una lista de compras**:
```
INICIO
    ESTABLECER lista_compras = lista vacía
    MOSTRAR "Revisar despensa para artículos que comprar"
    MIENTRAS se necesiten más artículos
        SI el artículo está bajo o vacío ENTONCES
            AÑADIR artículo a lista_compras
        FIN SI
    FIN MIENTRAS
    MOSTRAR "Revisar refrigerador para artículos que comprar"
    MIENTRAS se necesiten más artículos
        SI el artículo está bajo o vacío ENTONCES
            AÑADIR artículo a lista_compras
        FIN SI
    FIN MIENTRAS
    SI lista_compras no está vacía ENTONCES
        MOSTRAR lista_compras
    SI NO
        MOSTRAR "No se necesitan artículos"
    FIN SI
FIN
```

### Paso 3: Evalúa la claridad
Para cada traducción:
- Verifica si tu descripción en lenguaje natural captura todos los pasos en el pseudocódigo
- Asegúrate de que la lógica y la secuencia permanezcan iguales
- Identifica cualquier parte que haya sido difícil de traducir de vuelta al lenguaje natural

## Parte 6: La computadora humana

Esta actividad final ayuda a demostrar cómo el pseudocódigo cierra la brecha entre el pensamiento humano y la ejecución de la computadora.

### Paso 1: Escribe un algoritmo en pseudocódigo
Crea pseudocódigo para un juego o acertijo simple, como:
- Adivinar un número entre 1 y 10
- Jugar piedra-papel-tijeras
- Resolver un acertijo simple

### Paso 2: Actúa como la computadora
Encuentra un compañero (o imagina uno) que actuará como el "programador" mientras tú actúas como la "computadora". Tu trabajo es seguir las instrucciones del pseudocódigo exactamente como están escritas, sin hacer suposiciones o usar información que no esté explícitamente indicada.

### Paso 3: Ejecuta el programa
El "programador" lee cada instrucción en el pseudocódigo, y tú (la "computadora") la ejecutas con precisión. Si hay ambigüedades o errores en el pseudocódigo, debes comportarte como lo haría una computadora—ya sea produciendo un error o haciendo una interpretación específica basada en las reglas del pseudocódigo.

### Paso 4: Depura y mejora
Basándote en la ejecución:
- Identifica cualquier ambigüedad o error en el pseudocódigo
- Revisa el pseudocódigo para hacerlo más preciso y efectivo
- Intenta ejecutar la versión mejorada para ver si funciona mejor

## Actividades de extensión

### 1. Patrones de pseudocódigo
Investiga y crea pseudocódigo para estos patrones comunes de programación:
- Intercambiar los valores de dos variables
- Encontrar el mínimo y máximo en una lista
- Contar ocurrencias de un elemento específico en una lista
- Validar entrada de usuario

### 2. Investigación de algoritmos
Elige un algoritmo famoso (como búsqueda binaria o ordenamiento burbuja), investiga cómo funciona y escribe pseudocódigo para él.

### 3. Crear una guía de pseudocódigo
Crea una guía de estilo completa de pseudocódigo para tu propio uso, combinando las convenciones de este libro con cualquier estándar adicional que encuentres útil.

## Preguntas de reflexión

En tu cuaderno, responde estas preguntas:
1. ¿Cuál fue el aspecto más desafiante de traducir entre lenguaje natural y pseudocódigo?
2. ¿Cómo te ayudó crear pseudocódigo a entender la lógica de diferentes procesos?
3. ¿Cuándo preferirías usar pseudocódigo en lugar de un diagrama de flujo, y viceversa?
4. ¿Cómo podría ayudarte el pseudocódigo en la planificación de tareas complejas en tu vida diaria?
5. ¿Qué ambigüedades en el lenguaje natural se hicieron evidentes cuando intentaste convertirlo a pseudocódigo?

## Conexión con la programación

El pseudocódigo es un puente esencial entre el pensamiento humano y la programación de computadoras. Los programadores profesionales a menudo comienzan con pseudocódigo para planificar sus soluciones antes de escribir código real. Las habilidades que has desarrollado en esta actividad se traducirán directamente a la programación en cualquier lenguaje, ya que el pseudocódigo captura la estructura lógica que comparten todos los lenguajes de programación, independientemente de su sintaxis específica.