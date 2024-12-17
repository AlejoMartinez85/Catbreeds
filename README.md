
# Catbreeds 🐾

Catbreeds es una aplicación desarrollada con **Ionic/Angular V.7.2.0** que permite explorar diferentes razas de gatos, mostrando detalles específicos de cada una. La aplicación se conecta a una API para obtener información actualizada sobre las razas, optimizando el rendimiento con paginación y carga bajo demanda.

En el desarrollo de esta aplicación se hizo uso de [Capacitor](https://capacitorjs.com/docs/apis/splash-screen) para poder acceder a las plataformas de Android y iOS.

---

## Retos a abordar
- Construir una aplicación con una arquitectura escalable
- Construir una aplicación amigable con el usuario.
- Implementar estrategias de mejor de performance y optimización de información para mejorar la interacción entre la aplicación y el usuario
- Priorizar siempre los feedbacks para que el usuario este enterado de que esta sucediendo en la aplicación.
## Funcionalidades principales 🚀

- **Listado de gatos:** Utiliza la API [CatApi](https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t) para mostrar razas de gatos en bloques de 10 (paginación) para mejorar el rendimiento.
- **Vista al detalle de un gato:** Sección en la cual se puede ver la información relacionada al gato seleccionado.
- **Búsqueda local:** Filtra razas por nombre usando un cuadro de búsqueda dinámico.
- **Infinite scroll:** Carga más razas de gatos a medida que el usuario se desplaza.
- **Botón de scrollUp:** Facilita regresar al inicio de la página.
- **Validación inteligente:** Comprueba si la información ya existe antes de realizar nuevas consultas en las vistas **Home** y **Detail**, evitando solicitudes innecesarias.

---

## Experiencia de Usuario (UX/UI) ✨

* **Skeleton Screens:** 
   Implementados en las vistas **Home** y **Detail** para mostrar un feedback visual mientras la información se carga.
   
*  **Popover interactivo:** 
   Proporciona una explicación del sistema de puntuación con el componente **Rating**.

*  **Imagen por defecto:** 
   Se muestra una imagen por defecto si la API no retorna una para la raza de gato.

* **Indicadores de país:** 
   Uso de la dependencia [flag-icons](https://flagicons.lipis.dev/) para mostrar la bandera del país al que pertenece la raza.

* **Ion Refresh:** 
   Permite al usuario actualizar manualmente la información con una interacción nativa y fluida.
* **Rating component:**
    Busca ofrecer una manera más comoda de visualizar el valor númerico que tiene la raza para características específicas, como por ejemplo inteligencia, nivel de energía, entre otros.
---
## Estructura del proyecto 🗂️
```
src/
├── app/
│   ├── home/            # Vista principal (Home)
│   ├── detail/          # Vista de detalle (Detail)
│
├── shared/              # Elementos compartidos y reutilizables
│   ├── components/      # Componentes UI reutilizables como Rating y CatCard
│   ├── constants/       # Archivo centralizado para constantes
│   ├── interfaces/      # Definición de modelos de datos (TypeScript Interfaces)
│   ├── services/        # Servicios para manejar lógica de negocio y API
```

#### Carpeta `shared/`
Agrupa todos los elementos reutilizables y compartidos entre las vistas:

- **components/**:
  - Contiene componentes de UI reutilizables como:
    - `Rating`: Visualiza o asigna puntuaciones.
    - `CatCard`: Muestra información básica de una raza.
    - `InputSearch`: Barra de búsqueda para filtrar razas por nombre.

- **constants/**:
  - Archivos con valores estáticos utilizados globalmente, como:
    - URLs base de la API.
    - Mensajes predefinidos o configuraciones generales.

- **interfaces/**:
  - Definiciones de modelos de datos utilizando **TypeScript Interfaces** para mantener un tipado estricto. Por ejemplo:
    - Estructura de datos para las razas de gatos.
    - Estructura de respuesta de los servicios

- **services/**:
  - Contiene los servicios que gestionan la lógica de negocio, como:
    - `CatService`: Servicio que conecta con la API para listar razas y obtener detalles.
    - Manejo de paginación y caché para optimizar consultas.
    - `ExternalLinkService`: Servicio que centraliza la lógica para abrir enlaces externos.

## Componentes reutilizables ⚙️

* **Rating**
   - Asigna puntuaciones para razas (valores númericos).
   - Compatible con popovers explicativos.

* **CatCard**
   - Muestra información básica de una raza: nombre, imagen, país e inteligencia.

* **InputSearch**
   - Permite captar el texto con el cual el usuario quiere realizar una búsqueda

---

## Pruebas unitarias 🧪

Se realizaron pruebas unitarias para garantizar el correcto funcionamiento de los componentes:

### Rating Component
- **Validación de valores:** Asegura que solo se muestren valores dentro del rango permitido.
- **Interacciones:** Verifica que los clics actualicen correctamente la puntuación.
- **Visualización:** Comprueba que los valores sean renderizados según la configuración inicial.

### InputSearch Component
- **Eventos de entrada:** Confirma que las búsquedas actualizan los resultados dinámicamente.
- **Reseteo:** Valida que el componente pueda reiniciarse correctamente tras una búsqueda.

---

## Vistas disponibles 📱

### Home
- Muestra una lista de razas disponibles y que puede ir incrementando bajo demanda.
- Permite buscar razas usando el componente **InputSearch**.

### Detail
- Muestra información detallada de una raza, incluyendo:
  - Nombre
  - Descripción
  - País de origen
  - Inteligencia
  - Adaptación
  - Expectativa de vida
  - Amistad con perros
  - Necesidades sociales
  - Temperamento
  - Nivel de energía
  - Peso
  - Imagen por defecto si no hay disponible
  - Valoraciones usando el componente **Rating**.
  - Descripción
---

## API utilizada 🌐

La aplicación utiliza una API pública para obtener información sobre razas de gatos. La integración está gestionada desde los servicios en `shared/services`.

## Instalación y configuración 🛠️

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/Catbreeds.git
   cd catApp
2. Instalar las depedencias:
    ```bash
    npm install
3. Inica el servidor local:
    ```bash
    ionic serve -l
4. Al momento de abrir el navegador por favor abrir la consola de desarrollo y seleccionar en la parte superior derecha **toggle device toolbar** para poder ver la aplicación emulando un dispositivo.

La aplicación también se puede compilar con **Android** o con  **iOS**, para este proceso por favor seguir los siguientes pasos:

1. tener instalado Android studio y Xcode para poder compilar cada una de las plataformas.
2. Correr el siguiente comando dependiendo de que plataforma desea correr:
    ```bash
    npx cap open Android
    npx cap open ios
3.Adjunto enlace de descarga directa del APK para ser instalada en dispositivos android.
* [enlace_google_drive](https://drive.google.com/drive/folders/1hfTTust8yEZisPLMPD1Y5CAboPtlqiYH?usp=drive_link)

## Información de contacto 
* Daniel Alejandro Martínez Estevan
* Celular: +57 3234486554
* Email: alejomartinez85@hotmail.com
* LinkedIn: [alejomartinez85](https://www.linkedin.com/in/alejomartinez85/)

pd. De ante mano muchas gracias por tomarse el tiempo de revisar mi prueba, estoy totalmente disponible para socializar y discutir cual aspecto relacionado con el desarrollo de la aplicación y la toma de decisiones que realicé para la construcción de ella.

