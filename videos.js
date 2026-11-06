
(async () => {
  const main = document.querySelector('main');
  if (!main) return;

  let videos;
  try {
    const respuesta = await fetch('/videos.json', {
      cache: 'no-store'
    });
    if (!respuesta.ok) return;
    videos = await respuesta.json();
  } catch (error) {
    console.warn('No se pudieron cargar los videos', error);
    return;
  }

  if (!Array.isArray(videos) || videos.length === 0) return;

  const estilo = document.createElement('style');
  estilo.textContent = `
    .vicarlo-videos-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 22px;
    }
    .vicarlo-video-card {
      overflow: hidden;
      border: 1px solid var(--line, #2a2a2a);
      border-radius: 22px;
      background: var(--panel, #151515);
    }
    .vicarlo-video-media {
      aspect-ratio: 9 / 16;
      max-height: 570px;
      background: #080808;
    }
    .vicarlo-video-media iframe,
    .vicarlo-video-media video {
      display: block;
      width: 100%;
      height: 100%;
      border: 0;
      object-fit: contain;
    }
    .vicarlo-video-info { padding: 20px; }
    .vicarlo-video-info h3 {
      font-size: 19px;
      margin: 0 0 10px;
      line-height: 1.35;
    }
    .vicarlo-video-info p {
      color: var(--muted, #b6b0a5);
      white-space: pre-line;
      font-size: 14px;
    }
    .vicarlo-video-link {
      cursor: pointer;
      background: transparent;
      color: var(--gold2, #f0d28d);
      border: 1px solid var(--gold, #d4af68);
      padding: 10px 15px;
      border-radius: 99px;
      font-weight: 700;
    }
    @media (max-width: 900px) {
      .vicarlo-videos-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    @media (max-width: 600px) {
      .vicarlo-videos-grid {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(estilo);

  const seccion = document.createElement('section');
  seccion.id = 'videos';

  const interior = document.createElement('div');
  interior.className = 'wrap';

  const etiqueta = document.createElement('div');
  etiqueta.className = 'kicker';
  etiqueta.textContent = 'VICARLO MG BARBER';

  const titulo = document.createElement('h2');
  titulo.textContent = 'Nuestros mejores cortes';

  const introduccion = document.createElement('p');
  introduccion.className = 'sub';
  introduccion.textContent =
    'Mira nuestros cortes y conoce la experiencia VICARLO.';

  const cuadricula = document.createElement('div');
  cuadricula.className = 'vicarlo-videos-grid';

  interior.append(etiqueta, titulo, introduccion, cuadricula);
  seccion.appendChild(interior);

  for (const item of videos) {
    if (!item || typeof item !== 'object') continue;

    const enlace = typeof item.instagram === 'string'
      ? item.instagram.match(
          /^https:\/\/(?:www\.)?instagram\.com\/reel\/([\w-]+)\/?/i
        )
      : null;

    const archivo = typeof item.archivo === 'string' &&
      /^\/(?:media|assets)\/[\w./-]+\.(mp4|webm)$/i.test(item.archivo)
      ? item.archivo : null;

    if (!enlace && !archivo) continue;

    const tarjeta = document.createElement('article');
    tarjeta.className = 'vicarlo-video-card';

    const marco = document.createElement('div');
    marco.className = 'vicarlo-video-media';

    if (archivo) {
      const reproductor = document.createElement('video');
      reproductor.src = archivo;
      reproductor.controls = true;
      reproductor.playsInline = true;
      reproductor.preload = 'metadata';
      marco.appendChild(reproductor);
    } else {
      const iframe = document.createElement('iframe');
      iframe.src =
        `https://www.instagram.com/reel/${enlace[1]}/embed/`;
      iframe.title = item.titulo || 'Video de VICARLO';
      iframe.loading = 'lazy';
      iframe.allow = 'encrypted-media; picture-in-picture';
      iframe.setAttribute('allowfullscreen', '');
      marco.appendChild(iframe);
    }

    const info = document.createElement('div');
    info.className = 'vicarlo-video-info';

    const nombre = document.createElement('h3');
    nombre.textContent =
      item.titulo || 'Video de VICARLO MG BARBER';
    info.appendChild(nombre);

    if (
      typeof item.descripcion === 'string' &&
      item.descripcion.trim()
    ) {
      const descripcion = document.createElement('p');
      descripcion.textContent = item.descripcion;
      info.appendChild(descripcion);
    }

    if (enlace) {
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.className = 'vicarlo-video-link';
      boton.textContent = 'Ver en Instagram';

      boton.addEventListener('click', () => {
        window.open(
          `https://www.instagram.com/reel/${enlace[1]}/`,
          '_blank',
          'noopener,noreferrer'
        );
      });

      info.appendChild(boton);
    }

    tarjeta.append(marco, info);
    cuadricula.appendChild(tarjeta);
  }

  if (!cuadricula.children.length) return;

  main.appendChild(seccion);

  const colocar = () => {
    const galeria = document.getElementById('galeria');

    if (
      galeria &&
      galeria.parentElement === main &&
      galeria.nextElementSibling !== seccion
    ) {
      galeria.insertAdjacentElement('afterend', seccion);
    }
  };

  colocar();

  new MutationObserver(colocar).observe(main, {
    childList: true
  });
})();
