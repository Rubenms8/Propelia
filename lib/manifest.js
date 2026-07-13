/* =============================================================
   Agency Propelia — brand data (single global namespace)
   Edita aquí los textos, servicios, proyectos y testimonios.
   ============================================================= */
(function () {
  "use strict";

  window.__BRAND__ = {
    name: "Agency Propelia",

    contact: {
      whatsapp: "https://wa.me/34644603547",
      whatsappHuman: "+34 644 60 35 47",
      email: "agencypropelia@gmail.com",
      instagram: "https://instagram.com/agencypropelia",
      instagramHuman: "@agencypropelia",
      tiktok: "https://www.tiktok.com/@agencypropelia_",
      tiktokHuman: "@agencypropelia_"
    },

    /* Disciplinas para el marquee superior */
    marquee: [
      "Desarrollo web", "Rediseño", "Rendimiento", "SEO técnico",
      "Diseño UX/UI", "Conversión", "Mantenimiento", "Identidad digital"
    ],

    /* Servicios */
    services: [
      {
        id: "desarrollo",
        num: "01",
        title: "Desarrollo web a medida",
        desc: "Webs rápidas, seguras y pensadas para vender. Cada pixel decidido, nada dejado al azar.",
        points: ["Código propio, sin plantillas", "Optimizada para móvil primero", "Lista para escalar contigo"]
      },
      {
        id: "rediseno",
        num: "02",
        title: "Rediseño de tu web actual",
        desc: "Si tu web ya no representa lo que eres, la transformamos en una que genera confianza al primer clic.",
        points: ["Auditoría honesta de lo que falla", "Migración sin perder posiciones", "Salto visual inmediato"]
      },
      {
        id: "rendimiento",
        num: "03",
        title: "Optimización de rendimiento",
        desc: "Cada segundo de carga te cuesta clientes. Afinamos tu web hasta que vuele.",
        points: ["Core Web Vitals en verde", "Imágenes y código optimizados", "Mejor posicionamiento en Google"]
      },
      {
        id: "mantenimiento",
        num: "04",
        title: "Mantenimiento y evolución",
        desc: "No te dejamos solo tras el lanzamiento. Tu web crece, se actualiza y se mantiene impecable.",
        points: ["Actualizaciones y copias de seguridad", "Soporte cercano y directo", "Mejoras continuas"]
      },
      {
        id: "seo",
        num: "05",
        title: "Presencia digital y SEO",
        desc: "Que te encuentren quienes ya te están buscando. Estructura, contenido y velocidad al servicio de tu negocio.",
        points: ["Arquitectura pensada para Google", "SEO técnico desde el primer día", "Base sólida para crecer"]
      },
      {
        id: "conversion",
        num: "06",
        title: "Diseño orientado a conversión",
        desc: "Bonito no basta. Diseñamos cada sección para acercar al visitante a contactar contigo.",
        points: ["Jerarquía que guía la mirada", "Llamadas a la acción estratégicas", "Menos fricción, más clientes"]
      }
    ],

    /* Proceso de trabajo */
    process: [
      {
        num: "01",
        title: "Escuchamos tu negocio",
        desc: "Antes de diseñar nada, entendemos a quién vendes, qué te diferencia y qué quieres conseguir."
      },
      {
        num: "02",
        title: "Diseñamos la estrategia",
        desc: "Definimos estructura, mensaje y estética. Tú validas la dirección antes de escribir una sola línea de código."
      },
      {
        num: "03",
        title: "Construimos con precisión",
        desc: "Desarrollamos tu web con código propio, rápida y cuidada al detalle. Revisamos contigo en cada hito."
      },
      {
        num: "04",
        title: "Lanzamos y hacemos crecer",
        desc: "Publicamos, medimos y optimizamos. Tu web no es un punto final, es una herramienta que evoluciona."
      }
    ],

    /* Beneficios / stats */
    stats: [
      { value: 3, suffix: "s", label: "es lo que tarda un visitante en juzgar tu negocio" },
      { value: 75, suffix: "%", label: "de la credibilidad de una empresa nace de su web" },
      { value: 100, suffix: "%", label: "código propio, cero plantillas genéricas" }
    ],

    /* Casos / proyectos — estructura lista para reemplazar con reales */
    projects: [
      {
        tag: "Sitio corporativo",
        title: "Presencia que transmite solidez",
        desc: "Una web que convierte la primera impresión en confianza y la confianza en contacto.",
        metric: "Diseño a medida"
      },
      {
        tag: "E-commerce",
        title: "Tienda pensada para vender",
        desc: "Fichas claras, checkout sin fricción y una experiencia móvil impecable.",
        metric: "Optimizada para conversión"
      },
      {
        tag: "Landing de captación",
        title: "Una página, un objetivo",
        desc: "Cada elemento empuja al visitante hacia una única acción: contactar.",
        metric: "Enfoque en resultados"
      }
    ],

    /* Testimonios — estructura preparada para opiniones reales */
    testimonials: [
      {
        quote: "Nuestra web pasó de ser un folleto olvidado a nuestra mejor herramienta de ventas.",
        author: "Cliente Propelia",
        role: "Espacio reservado para tu testimonio real"
      },
      {
        quote: "Entendieron nuestro negocio antes de hablar de diseño. Eso marcó la diferencia.",
        author: "Cliente Propelia",
        role: "Espacio reservado para tu testimonio real"
      },
      {
        quote: "Trato cercano, resultados serios. Por fin una web de la que estamos orgullosos.",
        author: "Cliente Propelia",
        role: "Espacio reservado para tu testimonio real"
      }
    ],

    /* FAQ */
    faqs: [
      {
        q: "¿Cuánto cuesta una página web con vosotros?",
        a: "Depende de lo que tu negocio necesite. No trabajamos con precios de plantilla porque no hacemos plantillas. Cuéntanos tu proyecto por WhatsApp y te damos un presupuesto claro y sin compromiso."
      },
      {
        q: "¿En cuánto tiempo estará lista mi web?",
        a: "La mayoría de proyectos se entregan entre 2 y 5 semanas, según el alcance. Desde la primera conversación te damos un calendario realista y lo cumplimos."
      },
      {
        q: "¿Sois una agencia nueva? ¿Puedo fiarme?",
        a: "La marca Propelia es joven, pero el equipo no. Detrás hay desarrolladores con años de experiencia en proyectos para empresas de distintos sectores. Decidimos unir esa experiencia bajo una marca propia para ayudar a pymes como la tuya."
      },
      {
        q: "¿Qué pasa después de lanzar la web?",
        a: "No desaparecemos. Ofrecemos mantenimiento, mejoras y soporte cercano para que tu web siga rápida, segura y actualizada con el tiempo."
      },
      {
        q: "Ya tengo una web, ¿la podéis mejorar?",
        a: "Sí. Auditamos lo que tienes, te decimos con honestidad qué falla y la transformamos —normalmente sin perder tu posicionamiento actual, sino mejorándolo."
      },
      {
        q: "¿Trabajáis con negocios pequeños?",
        a: "Es exactamente para quien trabajamos. Ponemos experiencia de proyectos de alto nivel al servicio de pequeñas y medianas empresas para que compitan con una imagen de primer nivel."
      }
    ]
  };
})();
