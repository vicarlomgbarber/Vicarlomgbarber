# VICARLO MG BARBER — Instalación independiente (plan de pruebas)

## Decisión del propietario, 14-11-2026
NO utilizar Supabase. NO contratar servicios nuevos antes de informar y recibir autorización expresa del propietario. Prioridad: independencia, portabilidad y costes previsibles. Se mantiene Booksy y la web pública hasta completar y probar la transición.

## Arquitectura propuesta
- Sitio público actual en GitHub Pages, conservando el dominio, SEO, fotografías y páginas existentes.
- Reservas en el propio dominio, por ejemplo `/reservas.html`, con API HTTPS en `api.vicarlomgbarber.com` (servidor independiente).
- Backend autocontrolado, código abierto, y base de datos PostgreSQL o SQLite mantenida en el servidor con copias de seguridad automáticas cifradas.
- Panel privado `/admin.html` con autenticación robusta, roles y auditoría de acciones.
- Edición desde el panel de barberos (Víctor, Jonny y otros), horarios, servicios, precios, pausas, comisiones, fotos, promociones, contenidos y citas.
- Reservas automáticas con validación transaccional de horarios, control de concurrencia, límites de peticiones, prevención de spam y cancelaciones.
- El precio y porcentaje aplicados deben guardarse en la reserva histórica.
- Exportaciones (CSV/JSON), restauración probada y documentación de migración a cualquier servidor compatible.
- WhatsApp Business Platform es un servicio EXTERNO opcional que exige aceptación de Meta, cumplimiento de políticas y tarifas por mensaje; sin habilitar, el sistema debe confirmar la cita EN LA WEB y opcionalmente por email si se configura.

## Costes y riesgos
El código y base de datos pueden ser propios sin licencia mensual. Reservas 24/7 requieren máquina conectada permanentemente: un servidor privado con coste de hospedaje, o un ordenador propio siempre encendido (riesgo alto de caída). Antes de contratar, verificar precio total con IVA, IPv4, copias, tráfico, soporte y renovaciones. Evitar autoscaling y complementos no autorizados; no prometer coste cero ni ausencia total de costes.

## Criterios antes de publicar
1. Protección de datos RGPD/LOPDGDD y política de retención documentadas.
2. Permisos: clientes nunca consultan datos privados; solamente personal autorizado puede ver o modificar citas.
3. Reservas concurrentes no pueden duplicar una franja para el mismo barbero.
4. Horarios válidos, zona horaria Europe/Madrid y cambios de horario verano/invierno correctamente tratados.
5. Pruebas de copia y restauración; alertas ante caída del servidor y procedimiento manual de continuidad.
6. Pruebas en móvil y navegador, confirmaciones, cambios y cancelaciones.
7. Transición ordenada de Booksy, Google Maps y reservas existentes, sin cerrar Booksy antes de asegurar operación.
8. Contrato/plan de hosting opcional solo tras aprobación y presupuesto total.

## Estado
- GitHub conectado; `main` sin cambios de instalación.
- Esta rama sirve de entorno de trabajo aislado.
- No se ha creado base de datos en Supabase.
- Backend independiente aún pendiente de implementar, configurar y probar.
