// docente-portal-content.js
//
// Contenido estático del Portal de Maestra/o: misión del instituto, temarios
// profesionales por especialidad y actividades/reglas del maestro.
//
// Es contenido editorial fijo (no viene de Supabase ni de localStorage), por
// eso vive en su propio archivo en vez de inflar app.js -- igual que
// dataService.js o supabase.js son archivos separados por responsabilidad.
// Transcrito fielmente de los PDF que proporcionó Dirección el 30/oct/2026:
// "Temario Profesional - Barbería", "Temario Profesional - Diseño de Ceja y
// Lashista Profesional" (pestañas) y "Temario Profesional - Máster de Uñas",
// más "Actividades y Reglas del Maestro - Venezia".
//
// Si Dirección actualiza algún temario o las reglas, este es el único
// archivo que hay que tocar -- no hay que buscar el contenido en ningún otro
// lado del código.

window.VeneziaDocenteContent = (function () {
  "use strict";

  const INSTITUTO_LEMA =
    "SOMOS MÁS QUE UN INSTITUTO. IMPULSAMOS A MUJERES A EMPRENDER SU PROPIO NEGOCIO EN LA BELLEZA.";

  const INSTITUTO_MISION =
    "Impulsar a mujeres a transformar su vida mediante la educación en belleza, con conocimientos, " +
    "herramientas y acompañamiento para convertir un oficio en emprendimiento e independencia económica.";

  // Reglas y actividades del maestro -- de "Actividades y Reglas del Maestro -
  // Venezia" (Uñas · Pestañas · Barbería · Maquillaje). Mismas 14 para todas
  // las especialidades, no dependen del curso que imparte cada quien.
  const ACTIVIDADES = [
    {
      numero: 1,
      titulo: "Higiene y seguridad de la modelo",
      detalle: "Guantes, herramientas desinfectadas y cuidado de la modelo todo el tiempo.",
    },
    {
      numero: 2,
      titulo: "Niños fuera del área de trabajo",
      detalle:
        "Si una modelo llega con niños, el maestro le avisa que ella los cuida y que no pueden estar cerca de químicos, navajas ni máquinas.",
    },
    {
      numero: 3,
      titulo: "Pagos",
      detalle: "El maestro no recibe dinero de nadie; todos los cobros los hace el instituto.",
    },
    {
      numero: 4,
      titulo: "Exclusividad",
      detalle: "No ofrecer clases particulares, cursos ni servicios por fuera a alumnas o clientas de Venezia.",
    },
    {
      numero: 5,
      titulo: "Práctica supervisada",
      detalle: "Pasar estación por estación y corregir al momento.",
    },
    {
      numero: 6,
      titulo: "Puntualidad",
      detalle: "Llegar 15 minutos antes y avisar faltas o cambios con mínimo 24 horas, salvo emergencia.",
    },
    {
      numero: 7,
      titulo: "Área lista antes de clase",
      detalle: "Salón limpio, herramientas desinfectadas, material ordenado y equipo funcionando.",
    },
    {
      numero: 8,
      titulo: "Salón listo al terminar",
      detalle:
        "Estaciones limpias, piso y basura revisados, navajas en contenedor rígido, aparatos apagados y todo listo para el siguiente grupo.",
    },
    {
      numero: 9,
      titulo: "Trato",
      detalle: "Respetuoso y paciente con todas las alumnas, sin burlas ni comparaciones que las desmotiven.",
    },
    {
      numero: 10,
      titulo: "Mentalidad de negocio",
      detalle:
        "Que las alumnas traten su estación como si fuera su propio salón, porque una clienta que ve una estación sucia no regresa.",
    },
    {
      numero: 11,
      titulo: "Material",
      detalle: "El material del instituto se usa solo en clase y no sale de las instalaciones.",
    },
    {
      numero: 12,
      titulo: "Confidencialidad",
      detalle: "Los datos de alumnas y clientas, los precios y los temarios no se comparten con nadie fuera del instituto.",
    },
    {
      numero: 13,
      titulo: "Imagen",
      detalle: "Uniforme y presentación personal impecable.",
    },
    {
      numero: 14,
      titulo: "Celular",
      detalle: "Solo para fotos de trabajos y asuntos de la clase.",
    },
  ];

  // Temarios por especialidad. Cada clase conserva sus secciones tal cual
  // vienen en el PDF (Contenido / Teoría / Práctica / Evaluación...), para no
  // perder fidelidad con el documento oficial.
  const TEMARIOS = {
    Barbería: {
      curso: "Barbería",
      duracion: "6 meses",
      totalClases: 24,
      descripcion:
        "Diseñado para desarrollar habilidades profesionales de barbería: manejo de máquina, tijera y navaja, " +
        "cortes clásicos y modernos, desvanecidos, grecas, diseño y servicios de barba y cuidado facial masculino.",
      objetivoFinal:
        "Que al terminar los seis meses, el alumno domine el manejo profesional de máquina, tijera y navaja; " +
        "ejecute cortes clásicos, desvanecidos y diseños modernos con precisión; ofrezca servicios completos de " +
        "barba y cuidado facial masculino; y tenga el criterio técnico y la presentación profesional para atender " +
        "a cualquier cliente en un ambiente de barbería real.",
      clases: [
        {
          numero: 1,
          titulo: "Introducción a la barbería y bioseguridad",
          secciones: [
            {
              nombre: "Contenido",
              items: [
                "Presentación del curso",
                "Higiene y bioseguridad",
                "Desinfección de herramientas",
                "Ergonomía y postura correcta",
                "Conocimiento del área de trabajo",
                "Práctica con globos",
              ],
            },
          ],
        },
        {
          numero: 2,
          titulo: "Herramientas y peines guía y práctica con modelo",
          secciones: [
            {
              nombre: "Contenido",
              items: [
                "Identificación y uso de herramientas",
                "Máquina, trimmer, shaver y tijeras",
                "Uso correcto de peines guía",
                "Práctica con modelo real",
              ],
            },
          ],
        },
        {
          numero: 3,
          titulo: "Técnicas básicas con máquina",
          secciones: [
            {
              nombre: "Contenido",
              items: ["Técnicas básicas con máquina", "Líneas guía", "Uso correcto de muñeca", "Peinado y particiones", "Práctica con modelo real"],
            },
          ],
        },
        {
          numero: 4,
          titulo: "Técnicas básicas con tijera",
          secciones: [
            {
              nombre: "Contenido",
              items: ["Técnicas básicas con tijera", "Práctica de corte recto en modelo real", "Manejo de dedos", "Control de tensión del cabello"],
            },
          ],
        },
        {
          numero: 5,
          titulo: "Práctica de corte clásico tradicional",
          secciones: [{ nombre: "Contenido", items: ["Corte clásico tradicional", "Estructura y simetría"] }],
        },
        {
          numero: 6,
          titulo: "Práctica en modelo de casquete",
          secciones: [{ nombre: "Contenido", items: ["Práctica de casquete corto y regular"] }],
        },
        {
          numero: 7,
          titulo: "Práctica en modelo de casquete",
          secciones: [{ nombre: "Contenido", items: ["Casquete medio y alto", "Técnicas de conexión"] }],
        },
        {
          numero: 8,
          titulo: "Corte militar, Crew Cut y Buzz Cut",
          secciones: [{ nombre: "Contenido", items: ["Corte militar", "Crew Cut", "Buzz Cut"] }],
        },
        {
          numero: 9,
          titulo: "Introducción al fade y Low Fade",
          secciones: [{ nombre: "Contenido", items: ["Introducción al fade", "Fade bajo (Low Fade)"] }],
        },
        {
          numero: 10,
          titulo: "Mid Fade y técnicas de transición",
          secciones: [{ nombre: "Contenido", items: ["Mid Fade", "Técnicas de transición"] }],
        },
        {
          numero: 11,
          titulo: "High Fade y manejo de sombras",
          secciones: [{ nombre: "Contenido", items: ["High Fade", "Manejo de sombras"] }],
        },
        {
          numero: 12,
          titulo: "Taper Fade y perfilado de nuca y patillas",
          secciones: [{ nombre: "Contenido", items: ["Taper Fade", "Perfilado de nuca y patillas"] }],
        },
        {
          numero: 13,
          titulo: "Comb Over y Side Part moderno",
          secciones: [{ nombre: "Contenido", items: ["Comb Over", "Side Part moderno"] }],
        },
        {
          numero: 14,
          titulo: "Crop Top y French Crop",
          secciones: [{ nombre: "Contenido", items: ["Crop Top", "French Crop"] }],
        },
        {
          numero: 15,
          titulo: "Mullet moderno y Burst Fade",
          secciones: [{ nombre: "Contenido", items: ["Mullet moderno", "Burst Fade"] }],
        },
        {
          numero: 16,
          titulo: "Pompadour, Slick Back y texturizado moderno",
          secciones: [{ nombre: "Contenido", items: ["Pompadour", "Slick Back", "Texturizado moderno"] }],
        },
        {
          numero: 17,
          titulo: "Anatomía y diseño de barba",
          secciones: [{ nombre: "Contenido", items: ["Anatomía de barba", "Diseño según rostro"] }],
        },
        {
          numero: 18,
          titulo: "Perfilado de barba con navaja y toalla caliente",
          secciones: [{ nombre: "Contenido", items: ["Perfilado de barba", "Uso de navaja", "Toalla caliente"] }],
        },
        {
          numero: 19,
          titulo: "Ritual profesional de barba",
          secciones: [{ nombre: "Contenido", items: ["Ritual de barba profesional", "Vaporización", "Masaje facial relajante", "Aceites y bálsamos"] }],
        },
        {
          numero: 20,
          titulo: "Ceja masculina y facial básico",
          secciones: [{ nombre: "Contenido", items: ["Perfilado de ceja masculina", "Limpieza facial masculina", "Facial básico para barbería"] }],
        },
        {
          numero: 21,
          titulo: "Introducción a grecas",
          secciones: [{ nombre: "Contenido", items: ["Introducción a grecas", "Manejo de trimmer para diseño"] }],
        },
        {
          numero: 22,
          titulo: "Líneas básicas y diseños geométricos",
          secciones: [{ nombre: "Contenido", items: ["Líneas básicas", "Diseños geométricos"] }],
        },
        {
          numero: 23,
          titulo: "Grecas avanzadas y diseños personalizados",
          secciones: [{ nombre: "Contenido", items: ["Grecas avanzadas", "Diseños personalizados"] }],
        },
        {
          numero: 24,
          titulo: "Evaluación final integral",
          secciones: [{ nombre: "Evaluación final completa", items: ["Corte", "Desvanecido", "Barba", "Diseño", "Presentación profesional"] }],
        },
      ],
    },

    Pestañas: {
      curso: "Diseño de Ceja y Lashista Profesional",
      duracion: "5 meses",
      totalClases: 20,
      descripcion:
        "Diseñado para desarrollar habilidades profesionales en diseño de cejas, Lash Lifting, extensiones de " +
        "pestañas, técnicas, mapeos, efectos, mantenimiento y atención integral a la clienta.",
      objetivoFinal:
        "Que al terminar los cinco meses, la alumna no solamente sepa colocar pestañas, sino que tenga criterio " +
        "profesional para analizar a cada clienta, elegir el diseño adecuado, ejecutar diferentes técnicas y " +
        "ofrecer un servicio completo de diseño de cejas, Lash Lifting y extensiones de pestañas.",
      clases: [
        {
          numero: 1,
          titulo: "Anatomía y fundamentos del diseño de cejas",
          secciones: [
            {
              nombre: "Teoría",
              items: [
                "Anatomía básica de la ceja y la piel",
                "Partes de la ceja: inicio, arco y cola",
                "Tipos de rostro",
                "Morfología y proporciones faciales",
                "Simetría y asimetría facial",
                "Visagismo aplicado al diseño de cejas",
                "Tipos de cejas",
                "Herramientas y materiales",
                "Higiene y bioseguridad",
                "Preparación de la piel",
                "Introducción al diseño y mapeo",
              ],
            },
            { nombre: "Práctica", items: ["Trazado y ejercicios de diseño", "Identificación de proporciones", "Práctica de mapeo"] },
          ],
        },
        {
          numero: 2,
          titulo: "Diseño, colorimetría y coloración de cejas",
          secciones: [
            {
              nombre: "Teoría",
              items: [
                "Repaso del mapeo",
                "Corrección de asimetrías",
                "Diseño de cejas según el rostro",
                "Introducción a la colorimetría aplicada a cejas",
                "Teoría del color",
                "Selección del tono adecuado",
                "Cómo elegir el color según cabello, piel y ceja natural",
                "Preparación del producto",
                "Tiempo de exposición",
                "Corrección de color",
                "Cuidados posteriores",
              ],
            },
            { nombre: "Práctica", items: ["Diseño y mapeo", "Perfilado", "Aplicación de tinte/coloración", "Diseño + coloración de cejas"] },
          ],
        },
        {
          numero: 3,
          titulo: "Diseño y perfeccionamiento con modelo real",
          secciones: [
            {
              nombre: "Práctica con modelo",
              items: [
                "Diagnóstico de la ceja",
                "Análisis del rostro",
                "Mapeo profesional",
                "Corrección de asimetrías",
                "Diseño personalizado",
                "Perfilado y limpieza",
                "Recorte",
                "Perfeccionamiento del acabado",
                "Fotografías del trabajo",
                "Corrección de errores y retroalimentación",
              ],
            },
          ],
        },
        {
          numero: 4,
          titulo: "Cejas con tinte + perfeccionamiento",
          secciones: [
            {
              nombre: "Teoría",
              items: [
                "Tipos de tintes para cejas",
                "Diferencias entre coloración y pigmentación",
                "Selección del tono",
                "Preparación del producto",
                "Aplicación correcta",
                "Tiempos de exposición",
                "Precauciones",
                "Corrección de color",
                "Cuidados posteriores",
              ],
            },
            {
              nombre: "Práctica con modelo",
              items: ["Diseño", "Mapeo", "Aplicación de tinte", "Perfilado", "Perfeccionamiento", "Acabado profesional"],
            },
          ],
        },
        {
          numero: 5,
          titulo: "Práctica de diseño de ceja en modelo",
          secciones: [{ nombre: "", items: ["Instrucciones por la maestra"] }],
        },
        {
          numero: 6,
          titulo: "Introducción al Lash Lifting, práctica con modelo y tinte de pestañas",
          secciones: [
            {
              nombre: "Teoría",
              items: [
                "Anatomía básica de las pestañas",
                "Ciclo de crecimiento",
                "Tipos de pestañas",
                "Introducción al Lash Lifting",
                "Diferencia entre lifting y rizado de pestañas",
                "Herramientas y productos",
                "Tipos y selección de moldes",
                "Preparación de la pestaña",
                "Tiempos de exposición",
                "Contraindicaciones",
                "Higiene y bioseguridad",
                "Cuidados posteriores",
              ],
            },
            {
              nombre: "Tinte de pestañas",
              items: ["Función del tinte", "Selección y preparación", "Aplicación segura", "Tiempo de exposición", "Retiro correcto", "Cuidados posteriores"],
            },
            {
              nombre: "Práctica con modelo real",
              items: [
                "Diagnóstico de pestañas",
                "Selección del molde",
                "Preparación",
                "Aplicación paso a paso",
                "Dirección de las pestañas",
                "Control de tiempos",
                "Aplicación de tinte",
                "Hidratación/nutrición",
                "Cuidados posteriores",
                "Práctica completa con modelo real",
              ],
            },
          ],
        },
        {
          numero: 7,
          titulo: "Lash Lifting + diseño de cejas",
          secciones: [
            {
              nombre: "Servicio integral",
              items: [
                "Diagnóstico de cejas y pestañas",
                "Diseño y mapeo de cejas",
                "Perfilado",
                "Coloración/tinte",
                "Lash Lifting",
                "Tinte de pestañas",
                "Armonización de ambos servicios",
                "Preparación y organización del área de trabajo",
                "Práctica completa con modelo",
              ],
            },
          ],
        },
        {
          numero: 8,
          titulo: "Evaluación de diseño de cejas + Lash Lifting",
          secciones: [
            {
              nombre: "Evaluación teórica",
              items: ["Anatomía", "Visagismo", "Mapeo", "Colorimetría", "Tinte", "Anatomía de pestañas", "Lash Lifting", "Contraindicaciones", "Cuidados posteriores"],
            },
            {
              nombre: "Evaluación práctica",
              items: ["Diseño y mapeo de cejas", "Perfilado", "Coloración/tinte", "Lash Lifting", "Tinte de pestañas", "Corrección de errores", "Retroalimentación individual"],
            },
          ],
        },
        {
          numero: 9,
          titulo: "Anatomía y fundamentos de extensiones",
          secciones: [
            {
              nombre: "Contenido",
              items: [
                "Anatomía del ojo y pestaña natural",
                "Ciclo de crecimiento",
                "Fases de crecimiento",
                "Tipos y características de pestaña",
                "Tipos de extensiones",
                "Curvaturas",
                "Longitudes",
                "Diámetros",
                "Adhesivos",
                "Tiempo de secado",
                "Humedad y temperatura",
                "Aislamiento",
                "Seguridad y bioseguridad",
                "Contraindicaciones",
                "Cuidados posteriores",
              ],
            },
          ],
        },
        {
          numero: 10,
          titulo: "Técnica clásica 1x1 + técnica híbrida",
          secciones: [
            {
              nombre: "Contenido",
              items: [
                "Principios de la técnica clásica",
                "Aislamiento correcto",
                "Selección de extensión",
                "Aplicación 1x1",
                "Dirección",
                "Manejo del adhesivo",
                "Distancia de seguridad",
                "Retención",
                "Introducción a técnica híbrida",
                "Combinación de clásica + volumen",
                "Práctica en maniquí",
              ],
            },
          ],
        },
        {
          numero: 11,
          titulo: "Volumen y Mega Volumen",
          secciones: [
            {
              nombre: "Contenido",
              items: [
                "Diferencias entre clásica, híbrida, volumen y mega volumen",
                "Selección de fibras",
                "Peso adecuado",
                "Formación de abanicos",
                "Abanicos manuales",
                "Bases",
                "Simetría",
                "Control del peso sobre la pestaña natural",
                "Manejo del adhesivo",
                "Práctica en maniquí",
              ],
            },
          ],
        },
        {
          numero: 12,
          titulo: "Diseños y mapeos",
          secciones: [
            {
              nombre: "Contenido",
              items: [
                "Principios del mapping",
                "Diseño según forma del ojo",
                "Eye Mapping",
                "Efecto ojo de gato",
                "Efecto ardilla",
                "Efecto muñeca",
                "Efecto natural",
                "Efecto abierto",
                "Selección de longitudes",
                "Selección de curvaturas",
                "Corrección visual de ojos",
                "Diseño personalizado",
                "Práctica de diferentes mapeos",
              ],
            },
          ],
        },
        {
          numero: 13,
          titulo: "Efectos modernos de pestañas",
          secciones: [
            {
              nombre: "Contenido",
              items: [
                "Efecto Anime",
                "Efecto Wispy",
                "Efecto Sirena",
                "Efecto Wet Look / Mojado",
                "Efecto Rímel",
                "Efectos texturizados",
                "Combinación de longitudes",
                "Selección de curvaturas",
                "Mapping + efecto",
                "Práctica en maniquí",
              ],
            },
          ],
        },
        {
          numero: 14,
          titulo: "Perfeccionamiento de aplicación",
          secciones: [
            {
              nombre: "Contenido",
              items: [
                "Aislamiento avanzado",
                "Dirección de las extensiones",
                "Control del adhesivo",
                "Bases limpias",
                "Simetría",
                "Distancias",
                "Retención",
                "Corrección de errores",
                "Aplicación completa en maniquí",
                "Mapping + técnica + efecto",
                "Evaluación práctica",
              ],
            },
          ],
        },
        {
          numero: 15,
          titulo: "Primera aplicación con modelo real",
          secciones: [
            {
              nombre: "Contenido",
              items: [
                "Diagnóstico de pestaña natural",
                "Selección de técnica",
                "Selección del diseño",
                "Selección del efecto",
                "Mapping personalizado",
                "Preparación",
                "Aplicación completa",
                "Corrección durante el procedimiento",
                "Acabado profesional",
                "Fotografías del trabajo",
                "Cuidados posteriores",
                "Retroalimentación de la maestra",
              ],
            },
          ],
        },
        {
          numero: 16,
          titulo: "Aplicación avanzada con modelo real",
          secciones: [
            {
              nombre: "Contenido",
              items: [
                "Diagnóstico",
                "Mapping",
                "Selección de técnica",
                "Clásica, híbrida o volumen",
                "Selección de efecto",
                "Aplicación completa",
                "Corrección de dirección",
                "Simetría",
                "Acabado profesional",
              ],
            },
          ],
        },
        {
          numero: 17,
          titulo: "Diseño personalizado con modelo real",
          secciones: [
            {
              nombre: "Contenido",
              items: [
                "Forma del ojo",
                "Pestaña natural",
                "Objetivo de la clienta",
                "Técnica",
                "Curvatura",
                "Longitud",
                "Grosor",
                "Mapping",
                "Efecto",
                "Armonización del diseño",
                "Práctica completa con modelo real",
              ],
            },
          ],
        },
        {
          numero: 18,
          titulo: "Mantenimiento, relleno y retiro",
          secciones: [
            {
              nombre: "Contenido",
              items: [
                "Ciclo de crecimiento y mantenimiento",
                "Cuándo realizar un retoque",
                "Preparación para mantenimiento",
                "Relleno de extensiones",
                "Corrección de crecimiento",
                "Retiro parcial",
                "Retiro completo",
                "Uso correcto del removedor",
                "Cuidados de la pestaña natural",
                "Mala retención: causas y soluciones",
                "Errores frecuentes",
                "Cuidados posteriores",
                "Práctica de mantenimiento y retiro",
              ],
            },
          ],
        },
        {
          numero: 19,
          titulo: "Servicio integral con modelo real",
          secciones: [
            {
              nombre: "Contenido",
              items: [
                "Recepción",
                "Diagnóstico",
                "Ficha de cliente",
                "Análisis",
                "Elección de técnica",
                "Mapping",
                "Diseño",
                "Aplicación",
                "Acabado",
                "Fotografía",
                "Recomendaciones",
                "Organización del área",
                "Higiene",
                "Manejo del tiempo",
                "Atención profesional",
                "Corrección de detalles",
              ],
            },
          ],
        },
        {
          numero: 20,
          titulo: "Examen final y evaluación profesional",
          secciones: [
            {
              nombre: "Evaluación teórica",
              items: [
                "Anatomía",
                "Ciclo de crecimiento",
                "Visagismo",
                "Mapping",
                "Colorimetría",
                "Diseño de cejas",
                "Tintes",
                "Lash Lifting",
                "Extensiones 1x1",
                "Técnica híbrida",
                "Volumen",
                "Mega volumen",
                "Diseños",
                "Efectos",
                "Bioseguridad",
                "Contraindicaciones",
                "Mantenimiento",
                "Retiro",
                "Cuidados posteriores",
              ],
            },
            {
              nombre: "Evaluación práctica con modelo real",
              items: [
                "Diagnóstico",
                "Diseño",
                "Mapping",
                "Selección de técnica",
                "Selección de longitudes y curvaturas",
                "Aplicación",
                "Aislamiento",
                "Manejo del adhesivo",
                "Efecto/diseño",
                "Simetría",
                "Acabado",
                "Higiene",
                "Atención profesional",
              ],
            },
          ],
        },
      ],
    },

    Uñas: {
      curso: "Máster de Uñas",
      duracion: "5 meses",
      totalClases: 20,
      descripcion:
        "Diseñado para formar profesionales en la aplicación de uñas: gelish, nail art, pedicure estético, " +
        "acrílico, sistemas de construcción, escultura y diseños decorativos, con higiene, bioseguridad y " +
        "atención al cliente profesional.",
      objetivoFinal:
        "Que al terminar los cinco meses, la alumna domine la aplicación profesional de gelish, pedicure estético, " +
        "acrílico, extensiones y escultura de uñas; ejecute estructuras, relieves y diseños decorativos con " +
        "precisión y criterio artístico; brinde atención profesional al cliente con higiene y bioseguridad; y " +
        "cuente con las bases de emprendimiento para ofrecer sus servicios de manera independiente.",
      clases: [
        {
          numero: 1,
          titulo: "Introducción a la profesión y preparación de la uña natural",
          secciones: [
            {
              nombre: "Introducción al curso",
              items: [
                "Presentación del programa, objetivos y materiales de trabajo",
                "Conocimiento de las herramientas y productos básicos",
                "Importancia de la higiene, la responsabilidad y la práctica constante",
              ],
            },
            {
              nombre: "Higiene y bioseguridad",
              items: [
                "Higiene personal y de la estación de trabajo",
                "Limpieza, desinfección y manejo adecuado de herramientas",
                "Prevención de contaminación y contacto del producto con la piel",
                "Identificación de alteraciones en las uñas y contraindicaciones básicas",
              ],
            },
            {
              nombre: "Anatomía y preparación de la uña natural",
              items: ["Partes principales de la uña", "Preparación correcta de la superficie", "Limpieza de cutícula y laterales", "Limado y pulido cuando sea necesario", "Introducción a la nivelación básica"],
            },
            {
              nombre: "Introducción al gelish",
              items: [
                "Conocimiento de base, color y top coat",
                "Aplicación de capas delgadas y uniformes",
                "Sellado del borde libre",
                "Curado de acuerdo con las indicaciones del fabricante",
                "Prevención de errores comunes durante la aplicación",
              ],
            },
            {
              nombre: "Práctica dirigida",
              items: [
                "Aplicación básica de gelish en las propias manos de cada alumna",
                "Si hay dos alumnas, práctica entre ellas; si no, cada alumna trabaja en sus propias manos",
                "Corrección de errores bajo supervisión de la maestra",
                "Revisión de limpieza, uniformidad y acabado",
              ],
            },
          ],
        },
        {
          numero: 2,
          titulo: "Gelish profesional, nail art básico y primera práctica en modelo real",
          secciones: [
            {
              nombre: "Perfeccionamiento de la aplicación de gelish",
              items: ["Preparación correcta de la uña natural", "Aplicación uniforme de base, color y top coat", "Control de la cantidad de producto", "Sellado del borde libre", "Prevención de levantamientos, burbujas y contacto con la piel"],
            },
            {
              nombre: "Nail art básico",
              items: ["Aplicación de glitter y efectos decorativos sencillos", "Líneas finas y trazos básicos a mano alzada", "Flores sencillas", "Francesa básica", "Combinación de colores y diseños"],
            },
            {
              nombre: "Primera práctica en modelo real",
              items: [
                "Preparación de la estación de trabajo",
                "Recepción y valoración básica de la modelo",
                "Preparación de la uña natural y limpieza de cutícula",
                "Aplicación completa de gelish",
                "Elaboración de un diseño sencillo",
                "Revisión del acabado y corrección de errores",
              ],
            },
            {
              nombre: "Profesionalismo y atención al cliente",
              items: [
                "Recepción y bienvenida a la clienta",
                "Presentación personal e higiene profesional",
                "Organización de la estación de trabajo",
                "Consulta de preferencias y necesidades",
                "Comunicación respetuosa durante el servicio",
                "Manejo de expectativas y explicación del procedimiento",
                "Recomendaciones de cuidado y mantenimiento",
                "Limpieza y desinfección del área al finalizar",
                "Fotografía del resultado con autorización de la clienta",
              ],
            },
          ],
        },
        {
          numero: 3,
          titulo: "Perfeccionamiento de gelish y diseños creativos",
          secciones: [
            {
              nombre: "Técnicas de aplicación",
              items: ["Perfeccionamiento de la preparación de la uña", "Control de producto y aplicación cerca de la cutícula sin tocar la piel", "Uniformidad, sellado y acabado", "Identificación y corrección de errores frecuentes"],
            },
            {
              nombre: "Diseños y efectos decorativos",
              items: ["Degradados de color", "Baby Color y transiciones de tonos", "Combinación de colores, texturas y efectos", "Mano alzada intermedia", "Diseños de temporada y tendencias", "Técnicas decorativas para diferentes estilos"],
            },
            {
              nombre: "Catálogo y muestrarios",
              items: ["Elaboración de muestrarios de diseños", "Organización de paletas de colores", "Clasificación de diseños por estilo y dificultad"],
            },
            {
              nombre: "Práctica en modelo real",
              items: ["Aplicación completa de gelish", "Elaboración de diseños decorativos", "Revisión de limpieza, simetría y acabado", "Fotografía del trabajo terminado"],
            },
          ],
        },
        {
          numero: 4,
          titulo: "Retroalimentación, perfeccionamiento y evaluación de gelish",
          secciones: [
            {
              nombre: "Repaso general",
              items: ["Preparación de la uña natural, limpieza de cutícula, limado y nivelación básica", "Aplicación de base, color y top coat; sellado y curado", "Diseños básicos e intermedios", "Prevención de errores y desprendimientos"],
            },
            {
              nombre: "Evaluación práctica en modelo real",
              items: ["Preparación de la estación", "Recepción y valoración de la modelo", "Preparación de las uñas", "Aplicación completa de gelish y elaboración de un diseño", "Revisión de limpieza, uniformidad, sellado y acabado"],
            },
            {
              nombre: "Retroalimentación individual",
              items: ["Identificación de fortalezas y errores", "Corrección técnica bajo supervisión", "Recomendaciones de mejora", "Evaluación del resultado final"],
            },
          ],
        },
        {
          numero: 5,
          titulo: "Fundamentos del pedicure, anatomía del pie y primera práctica con modelo",
          secciones: [
            {
              nombre: "Fundamentos del pedicure",
              items: ["Objetivos y beneficios estéticos del pedicure", "Importancia de la higiene, la comodidad y la presentación de los pies", "Diferencias entre pedicure estético y servicios especializados de salud podal", "Introducción al pedicure spa y sus beneficios cosméticos", "Límites del servicio estético"],
            },
            {
              nombre: "Anatomía del pie",
              items: ["Partes principales del pie: tarso, metatarso y falanges", "Anatomía básica de los dedos y las uñas de los pies", "Función del pie en el equilibrio y la marcha", "Piel, talón, planta, dorso y zonas de presión", "Características generales de las uñas saludables"],
            },
            {
              nombre: "Identificación de alteraciones y contraindicaciones",
              items: ["Uñas encarnadas o con cambios importantes de color", "Sospecha de hongos, callosidades, durezas y grietas", "Heridas, inflamación o signos de infección", "Cuándo suspender el servicio y recomendar valoración médica", "Higiene y bioseguridad durante el pedicure"],
            },
            {
              nombre: "Primera práctica con modelo real",
              items: [
                "Preparación de la estación de trabajo",
                "Recepción y observación inicial de los pies",
                "Identificación de condiciones visibles y posibles contraindicaciones",
                "Preparación básica de las uñas de los pies",
                "Demostración de la maestra y aplicación sencilla de gelish en pies, si el tiempo lo permite",
                "Revisión del acabado y corrección bajo supervisión",
              ],
            },
          ],
        },
        {
          numero: 6,
          titulo: "Herramientas, procedimiento y técnicas de pedicure",
          secciones: [
            {
              nombre: "Herramientas, materiales y equipos",
              items: ["Instrumentos manuales para pedicure", "Productos de limpieza, preparación e hidratación", "Materiales de protección e higiene", "Equipos eléctricos, cuando corresponda, y uso seguro", "Limpieza, desinfección y manejo adecuado de los instrumentos"],
            },
            {
              nombre: "Procedimiento profesional paso a paso",
              items: ["Recepción y valoración de la clienta", "Preparación e higiene de los pies", "Corte adecuado de las uñas", "Limado y definición de la forma", "Trabajo cuidadoso de cutícula, sin cortes agresivos", "Atención cosmética de durezas superficiales, dentro de las competencias del servicio", "Hidratación y cuidados finales"],
            },
            {
              nombre: "Aplicación de gelish en pies",
              items: ["Preparación de la superficie de la uña", "Aplicación de base, color y top coat", "Control de producto y prevención del contacto con la piel", "Sellado del borde libre y curado adecuado", "Elaboración de un diseño sencillo", "Corrección de errores y revisión del acabado"],
            },
            {
              nombre: "Práctica supervisada",
              items: ["Ejecución de la secuencia indicada por la maestra", "Aplicación de gelish con diseño", "Revisión de higiene, técnica y presentación final"],
            },
          ],
        },
        {
          numero: 7,
          titulo: "Práctica de pedicure estético y aplicación de gelish",
          secciones: [
            {
              nombre: "Repaso del procedimiento",
              items: ["Preparación de estación y materiales", "Valoración inicial de los pies", "Higiene y preparación de uñas", "Corte, limado y cuidado estético de cutícula", "Hidratación y acabado del servicio"],
            },
            {
              nombre: "Pedicure estético",
              items: ["Ejecución de la secuencia completa del pedicure", "Atención cosmética de la piel, respetando los límites del servicio", "Uso adecuado de productos", "Cuidados y recomendaciones para la clienta"],
            },
            {
              nombre: "Aplicación de gelish",
              items: ["Preparación de las uñas de los pies", "Aplicación de base, color y top coat", "Elaboración de un diseño sencillo", "Sellado, curado y revisión del acabado"],
            },
            {
              nombre: "Práctica integral en modelo real",
              items: ["Realización del pedicure estético", "Aplicación de gelish", "Revisión de la técnica, higiene y presentación", "Corrección individual por parte de la maestra"],
            },
          ],
        },
        {
          numero: 8,
          titulo: "Práctica integral y evaluación final de pedicure",
          secciones: [
            {
              nombre: "Repaso general",
              items: ["Anatomía básica del pie, herramientas y materiales", "Bioseguridad y contraindicaciones", "Secuencia correcta del pedicure", "Preparación de uñas y aplicación de gelish", "Cuidados posteriores y recomendaciones"],
            },
            {
              nombre: "Evaluación práctica en modelo real",
              items: [
                "Preparación y organización de la estación de trabajo",
                "Recepción y valoración inicial de la clienta",
                "Identificación de posibles contraindicaciones",
                "Ejecución completa del pedicure estético",
                "Aplicación de las técnicas indicadas por la maestra",
                "Aplicación de gelish y diseño sencillo",
                "Revisión de higiene, técnica y acabado final",
              ],
            },
            {
              nombre: "Evaluación y retroalimentación",
              items: ["Evaluación de conocimientos y secuencia de trabajo", "Identificación de errores y áreas de mejora", "Corrección individual", "Recomendaciones para continuar perfeccionando la técnica"],
            },
          ],
        },
        {
          numero: 9,
          titulo: "Introducción al acrílico y estructuras básicas",
          secciones: [
            {
              nombre: "Conocimiento del sistema acrílico",
              items: ["Diferencia entre monómero y polímero", "Materiales y herramientas necesarias", "Ventilación y medidas de seguridad", "Preparación de la estación de trabajo"],
            },
            {
              nombre: "Manejo del producto",
              items: ["Proporción de líquido y polvo", "Formación de la perla y consistencias", "Control del pincel y distribución del producto", "Identificación de errores frecuentes"],
            },
            {
              nombre: "Introducción a tips y estructuras",
              items: ["Tipos de tips, selección, adaptación y fijación", "Diferencias entre extensión con tip y con molde", "Estructura, simetría y proporciones"],
            },
            {
              nombre: "Formas básicas",
              items: ["Cuadrada, almendra, ovalada, stiletto y bailarina o coffin"],
            },
            {
              nombre: "Práctica en mano de práctica",
              items: ["Colocación y adaptación de tips", "Formación de las cinco estructuras", "Limado y definición de laterales", "Revisión de simetría y corrección de errores"],
            },
          ],
        },
        {
          numero: 10,
          titulo: "Acrílico básico y diseños de temporada",
          secciones: [
            {
              nombre: "Aplicación básica de acrílico",
              items: ["Preparación de la superficie", "Control de la perla, distribución y grosor del producto", "Construcción de estructura", "Limado y perfeccionamiento", "Identificación de errores comunes"],
            },
            {
              nombre: "Diseños de temporada",
              items: ["Diseños inspirados en San Valentín, primavera y graduación", "Combinaciones decorativas según la temporada", "Selección de colores y elementos"],
            },
            {
              nombre: "Catálogo de diseños",
              items: ["Elaboración de muestrarios", "Organización de paletas de colores", "Clasificación por estilo y dificultad", "Presentación visual de los trabajos"],
            },
            {
              nombre: "Práctica dirigida",
              items: ["Aplicación de acrílico en tips o mano de práctica", "Elaboración de un muestrario de diseños", "Evaluación de creatividad, limpieza y acabado"],
            },
          ],
        },
        {
          numero: 11,
          titulo: "Efectos decorativos, relieves e introducción al 3D",
          secciones: [
            {
              nombre: "Efectos decorativos",
              items: ["Baby Boomer y encapsulado básico", "Efecto aurora y efecto espejo", "Efecto azúcar", "Aplicación de glitter y pigmentos", "Combinación de técnicas decorativas"],
            },
            {
              nombre: "Relieves y texturas",
              items: ["Introducción a la técnica 3D", "Relieves básicos, gotas y texturas", "Control del volumen y distribución del producto", "Selección de materiales y herramientas"],
            },
            {
              nombre: "Práctica en tips o mano de práctica",
              items: ["Elaboración de diferentes efectos", "Aplicación de relieves sencillos", "Combinación de dos o más técnicas", "Corrección de errores y revisión del acabado"],
            },
          ],
        },
        {
          numero: 12,
          titulo: "Aplicación integral de acrílico, velocidad y evaluación",
          secciones: [
            {
              nombre: "Repaso de la técnica",
              items: ["Preparación de la uña y formación de perlas", "Construcción de estructuras, grosor y distribución del producto", "Limado, perfeccionamiento y diseños creativos"],
            },
            {
              nombre: "Aplicación completa en mano de práctica",
              items: ["Preparación de la superficie", "Aplicación integral del acrílico", "Construcción de estructura y forma", "Limado y perfeccionamiento", "Elaboración de un diseño decorativo", "Revisión de simetría, resistencia y acabado"],
            },
            {
              nombre: "Control de tiempo y calidad",
              items: ["Organización de materiales y secuencia de trabajo", "Distribución eficiente del tiempo", "Identificación de errores y corrección"],
            },
            {
              nombre: "Evaluación",
              items: ["Evaluación de estructura y diseño", "Revisión de técnica, limpieza y acabado", "Retroalimentación individual", "Preparación para comenzar el trabajo con modelos reales"],
            },
          ],
        },
        {
          numero: 13,
          titulo: "Acrílico profesional en modelo real",
          secciones: [
            {
              nombre: "Preparación del servicio",
              items: ["Recepción y consulta de preferencias", "Valoración de las uñas y revisión de contraindicaciones", "Explicación del procedimiento y tiempo aproximado", "Preparación de la estación de trabajo y materiales"],
            },
            {
              nombre: "Aplicación completa de acrílico",
              items: ["Preparación de la uña natural", "Aplicación del producto sobre la uña natural y construcción de extensión cuando corresponda", "Control de la perla y distribución del acrílico", "Construcción de estructura, ápice y laterales", "Control del grosor y simetría"],
            },
            {
              nombre: "Perfeccionamiento desde la primera práctica con modelo",
              items: ["Corrección de errores durante la aplicación", "Revisión del limado y la estructura", "Corrección de grosor, ápice y simetría", "Identificación de posibles levantamientos y errores de retención", "Perfeccionamiento bajo supervisión directa de la maestra"],
            },
            {
              nombre: "Diseño y acabado",
              items: ["Elaboración de un diseño a mano alzada", "Sellado y acabado final", "Recomendaciones de cuidado para la clienta", "Fotografía del trabajo con autorización", "Limpieza y desinfección de la estación"],
            },
          ],
        },
        {
          numero: 14,
          titulo: "Sistemas de construcción: tips, molde y polygel",
          secciones: [
            {
              nombre: "Construcción con tips",
              items: ["Selección y adaptación", "Fijación correcta", "Construcción de estructura", "Limado y perfeccionamiento"],
            },
            {
              nombre: "Construcción con molde",
              items: ["Tipos de moldes", "Colocación y alineación", "Extensión y construcción de la estructura", "Control de simetría y laterales"],
            },
            {
              nombre: "Introducción al polygel",
              items: ["Conocimiento de materiales", "Preparación de la uña", "Manejo y distribución del producto", "Curado según las indicaciones del fabricante", "Limado y acabado"],
            },
            {
              nombre: "Práctica comparativa",
              items: ["Práctica de sistemas con tips y molde", "Introducción práctica al polygel", "Comparación de procedimientos y resultados", "Revisión de estructura y corrección de errores"],
            },
          ],
        },
        {
          numero: 15,
          titulo: "Escultura profesional y construcción con molde",
          secciones: [
            {
              nombre: "Preparación y colocación del molde",
              items: ["Selección del molde adecuado", "Ajuste y alineación", "Extensión correcta", "Control del eje y laterales"],
            },
            {
              nombre: "Construcción de estructuras",
              items: ["Punto de tensión y distribución del producto", "Construcción de formas cuadrada y almendra", "Simetría y proporción", "Corrección de asimetrías"],
            },
            {
              nombre: "Sistemas de escultura",
              items: ["Aplicación de acrílico escultural", "Construcción con polygel, según el sistema trabajado", "Selección del sistema según el diseño y las necesidades"],
            },
            {
              nombre: "Práctica supervisada",
              items: ["Construcción de extensiones", "Revisión de estructura y grosor", "Limado y perfeccionamiento", "Corrección individual según el avance de cada alumna"],
            },
          ],
        },
        {
          numero: 16,
          titulo: "Retención, mantenimiento y perfeccionamiento profesional",
          secciones: [
            {
              nombre: "Identificación de problemas",
              items: ["Levantamientos y desprendimientos", "Fracturas y quiebres", "Errores de preparación y aplicación", "Factores que afectan la retención"],
            },
            {
              nombre: "Retiro y mantenimiento",
              items: ["Retiro seguro según el sistema utilizado", "Procedimiento de relleno y mantenimiento", "Reequilibrio de la estructura", "Sellado y cuidado de la zona de cutícula", "Identificación de cuándo retirar el producto y realizar una nueva aplicación"],
            },
            {
              nombre: "Velocidad y organización",
              items: ["Organización de herramientas y materiales", "Optimización de tiempos y secuencia de trabajo", "Control de calidad sin comprometer la seguridad"],
            },
            {
              nombre: "Práctica correctiva",
              items: ["Corrección de errores en aplicaciones", "Ejercicios de mantenimiento", "Revisión de estructura y acabado", "Retroalimentación individual"],
            },
          ],
        },
        {
          numero: 17,
          titulo: "Aplicaciones integrales y combinación de sistemas",
          secciones: [
            {
              nombre: "Selección del sistema",
              items: ["Diferencias entre aplicación de acrílico, extensión con soft gel y escultura con molde", "Selección del sistema de acuerdo con el resultado deseado", "Preparación de materiales y herramientas"],
            },
            {
              nombre: "Aplicación integral",
              items: ["Preparación de la uña natural", "Construcción de la extensión", "Control de estructura, simetría y grosor", "Limado y acabado"],
            },
            {
              nombre: "Combinación de técnicas decorativas",
              items: ["Encapsulados y efectos decorativos", "Diseños a mano alzada", "Combinación de colores, texturas y relieves"],
            },
            {
              nombre: "Práctica integral",
              items: ["Aplicación completa del sistema seleccionado", "Elaboración de un diseño", "Revisión de estructura y acabado", "Corrección de errores bajo supervisión de la maestra"],
            },
          ],
        },
        {
          numero: 18,
          titulo: "Diseños avanzados y técnica libre",
          secciones: [
            {
              nombre: "Técnicas decorativas avanzadas",
              items: ["Tendencias actuales en diseño de uñas", "Combinación de efectos y encapsulados", "Relieves y texturas", "Composiciones decorativas y diseño personalizado"],
            },
            {
              nombre: "Planeación del diseño",
              items: ["Selección de propuesta creativa", "Planeación de colores y materiales", "Selección de herramientas", "Organización de la secuencia de trabajo"],
            },
            {
              nombre: "Práctica de diseño libre",
              items: ["Elaboración de un diseño original", "Aplicación de la estructura y decoración", "Práctica en mano de práctica o modelo real, según el avance", "Control del tiempo, creatividad, técnica y acabado"],
            },
            {
              nombre: "Presentación del trabajo",
              items: ["Revisión de detalles y corrección de imperfecciones", "Fotografía del diseño terminado", "Integración al catálogo de trabajos de la alumna"],
            },
          ],
        },
        {
          numero: 19,
          titulo: "Práctica integral en modelo real y preparación para emprender",
          secciones: [
            {
              nombre: "Servicio completo en modelo real",
              items: [
                "Recepción y consulta de preferencias",
                "Valoración inicial y selección de técnica",
                "Preparación de la estación",
                "Preparación de la uña natural",
                "Aplicación completa del sistema seleccionado",
                "Construcción, limado, perfeccionamiento y decoración",
                "Revisión de calidad y acabado",
              ],
            },
            {
              nombre: "Atención profesional",
              items: ["Comunicación y manejo de expectativas", "Recomendaciones de cuidado y mantenimiento", "Orientación sobre tiempos de retoque", "Organización de citas", "Fotografía del trabajo con autorización"],
            },
            {
              nombre: "Emprendimiento básico",
              items: ["Cálculo del costo de materiales", "Consideración del tiempo de trabajo y la ganancia", "Fijación de precios de los servicios", "Control básico de inventario", "Elaboración de catálogo fotográfico", "Presentación de trabajos en redes sociales y WhatsApp"],
            },
            {
              nombre: "Preparación para el examen final",
              items: ["Repaso de procedimientos", "Identificación de errores frecuentes", "Organización de materiales", "Resolución de dudas técnicas"],
            },
          ],
        },
        {
          numero: 20,
          titulo: "Repaso general, examen práctico final y cierre del curso",
          secciones: [
            {
              nombre: "Repaso general",
              items: ["Higiene y bioseguridad", "Preparación de la uña natural", "Gelish y diseños", "Pedicure estético", "Acrílico, tips, molde y soft gel", "Escultura y polygel", "Estructura, limado, mantenimiento y retención", "Atención al cliente y cuidados posteriores"],
            },
            {
              nombre: "Examen práctico final en modelo real",
              items: [
                "Preparación y organización de la estación",
                "Recepción y valoración de la modelo",
                "Preparación de la uña natural",
                "Selección del sistema de aplicación",
                "Construcción de la estructura",
                "Limado y perfeccionamiento",
                "Elaboración de un diseño",
                "Sellado y acabado final",
                "Aplicación de normas de higiene y bioseguridad",
                "Atención profesional y fotografía del resultado, con autorización",
              ],
            },
            {
              nombre: "Evaluación teórica",
              items: ["Conocimiento de materiales y herramientas", "Procedimientos de aplicación", "Bioseguridad y contraindicaciones", "Identificación de errores", "Cuidados y mantenimiento"],
            },
            {
              nombre: "Retroalimentación y cierre",
              items: ["Evaluación individual de resultados", "Identificación de fortalezas y áreas de mejora", "Recomendaciones para continuar practicando", "Orientación básica para iniciar o fortalecer su negocio"],
            },
          ],
        },
      ],
    },

    // Aún no se ha proporcionado el temario oficial de Maquillaje (30/oct/2026).
    // Se deja null a propósito: el portal debe mostrar un estado "próximamente",
    // nunca inventar contenido que Dirección no ha dado.
    Maquillaje: null,
  };

  return {
    INSTITUTO_LEMA,
    INSTITUTO_MISION,
    ACTIVIDADES,
    TEMARIOS,
  };
})();
