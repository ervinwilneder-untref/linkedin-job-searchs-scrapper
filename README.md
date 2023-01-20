# linkedin-job-searchs-scrapper
Aplicación desarrollada en node.js + python para levantar las búsquedas laborales disponibles en LinkedIn según palabras claves

Instrucciones:
* Instalar node.js y python (requiere pandas). Idealmente usar conda, cambiar el nombre del ambiente en run.cmd o adaptar segùn se prefiera
* npm install en el directorio de la aplicación (para instalar módulos de node)
* Correr run.cmd (o ejecutar manualmente los comandos de este archivo)

Las búsquedas específicamente para la Lic. en Estadística se disponibilizan en https://docs.google.com/spreadsheets/d/1lJ_Wp8ltR1UxQ_8e3AMp3yEqU0mD43u374h2-QlwVrA/edit?usp=sharing

Explicación general de cómo está construído / cómo funciona:

La "aplicación" tiene esencialmente dos partes:
* Extracción de los datos:
> Se realiza utilizando node.js (un framework de javascript) y la librería puppeteer https://pptr.dev/. De la misma manera que si uno ingresara a cada página de búsquedas laborales de LinkedIn con su correspondiente palabra clave y demás filtros, esta librería automatiza esa tarea. Es decir, al ejecutar la aplicación, el navegador (Chrome) se abre, navega a las distintas páginas y extrae la info de cada búsqueda laboral que aparece en el listado. Estos datos se guardan como un .json
* Parseo y transformación de datos:
> Està hecho en python (puntualmente el archivo etl.py) que toma el .json y hace una serie de transformacion con pandas para dejar disponible los datos como .csv. Está configurado para ir appendeando en el data.csv cada vez que se ejecuta. Ese archivo es el que luego se importa a la gsheet que mencioné más arriba.

Cualquier consulta me pueden escribir
