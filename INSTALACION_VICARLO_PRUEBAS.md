# VICARLO MG BARBER — Preparación de instalación (entorno de pruebas)

Esta rama NO es la web de producción. La rama `main` conserva actualmente el sitio publicado en https://www.vicarlomgbarber.com/.

## Alcance previsto
- Mantener identidad visual, fotografías existentes en `/media/`, SEO y dominio personalizado.
- Añadir `/reservas.html` con elección de servicio, Víctor/Jonny, día y hora disponibles y confirmación automática.
- Añadir `/admin.html` para gestionar barberos, servicios, precios, comisiones, horarios, cierres, citas, contenido y fotografías.
- Utilizar una base de datos y autenticación reales; GitHub Pages por sí solo NO puede guardar reservas con seguridad.
- WhatsApp automático con +34 631 523 925: posterior a la aprobación y configuración de WhatsApp Business Platform.
- Mantener Booksy hasta validar la operación completa y trasladar reservas futuras.

## No publicar todavía
- No subir claves secretas a GitHub.
- No conectar directamente la rama de pruebas al dominio público.
- No publicar datos de clientes ni cuentas de administrador.
- No habilitar reservas hasta verificar concurrencia, permisos, privacidad, horarios, CAPTCHA y pruebas end-to-end en una base de datos real.
- No retirar Booksy ni el enlace en Google Maps hasta superar la transición.

## Estado (14-11-2026)
- Acceso de GitHub verificado.
- Rama de pruebas creada para revisión aislada.
- Pendiente: conectar base de datos de prueba y desplegar la aplicación proporcionada; verificar casos de seguridad.
