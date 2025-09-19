// Sistema de Notificaciones para TurnoRD
class NotificationSystem {
  constructor() {
    this.isEnabled = false;
    this.permission = 'default';
    this.init();
  }

  async init() {
    // Verificar si el navegador soporta notificaciones
    if (!('Notification' in window)) {
      console.warn('Este navegador no soporta notificaciones de escritorio');
      return;
    }

    // Verificar el estado actual de los permisos
    this.permission = Notification.permission;
    
    // Si ya tenemos permiso, habilitar notificaciones
    if (this.permission === 'granted') {
      this.isEnabled = true;
    }

    // Mostrar modal de solicitud de permisos si es necesario
    if (this.permission === 'default') {
      this.showPermissionModal();
    }
  }

  showPermissionModal() {
    // Crear modal para solicitar permisos
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4">
        <div class="flex items-center mb-4">
          <svg class="w-8 h-8 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5-5-5h5v-12"></path>
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Notificaciones</h3>
        </div>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          ¿Deseas recibir notificaciones cuando lleguen nuevos clientes y cuando sea tu turno?
        </p>
        <div class="flex space-x-3">
          <button id="allowNotifications" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Permitir
          </button>
          <button id="denyNotifications" class="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition">
            No, gracias
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Manejar eventos de los botones
    document.getElementById('allowNotifications').addEventListener('click', async () => {
      await this.requestPermission();
      document.body.removeChild(modal);
    });

    document.getElementById('denyNotifications').addEventListener('click', () => {
      this.isEnabled = false;
      localStorage.setItem('notificationsDeclined', 'true');
      document.body.removeChild(modal);
    });
  }

  async requestPermission() {
    try {
      const permission = await Notification.requestPermission();
      this.permission = permission;
      
      if (permission === 'granted') {
        this.isEnabled = true;
        localStorage.setItem('notificationsEnabled', 'true');
        this.showWelcomeNotification();
      } else {
        this.isEnabled = false;
        localStorage.setItem('notificationsDeclined', 'true');
      }
    } catch (error) {
      console.error('Error al solicitar permisos de notificación:', error);
    }
  }

  showWelcomeNotification() {
    this.sendNotification(
      'TurnoRD - Notificaciones Activadas',
      'Recibirás notificaciones sobre nuevos clientes y turnos.',
      '/imegenlogin/favicon-32x32.png'
    );
  }

  sendNotification(title, body, icon = '/imegenlogin/favicon-32x32.png') {
    if (!this.isEnabled || this.permission !== 'granted') {
      return;
    }

    try {
      const notification = new Notification(title, {
        body: body,
        icon: icon,
        badge: icon,
        tag: 'turnord-notification',
        requireInteraction: false,
        silent: false
      });

      // Auto-cerrar después de 5 segundos
      setTimeout(() => {
        notification.close();
      }, 5000);

      // Manejar click en la notificación
      notification.onclick = () => {
        window.focus();
        notification.close();
      };

    } catch (error) {
      console.error('Error al enviar notificación:', error);
    }
  }

  // Notificación cuando llega un nuevo cliente
  notifyNewClient(clientName, service) {
    const title = '🔔 Nuevo Cliente';
    const body = `${clientName} se ha registrado para ${service}`;
    this.sendNotification(title, body);
  }

  // Notificación cuando es el turno del cliente
  notifyClientTurn(clientName, position) {
    const title = '⏰ Es tu turno';
    const body = `${clientName}, es tu turno. Posición: ${position}`;
    this.sendNotification(title, body);
  }

  // Notificación para el barbero cuando llega un cliente
  notifyBarberNewClient(clientName, service, queueLength) {
    const title = '👤 Cliente en espera';
    const body = `${clientName} espera por ${service}. Cola: ${queueLength} personas`;
    this.sendNotification(title, body);
  }

  // Notificación cuando se completa un servicio
  notifyServiceCompleted(clientName, service) {
    const title = '✅ Servicio completado';
    const body = `Servicio de ${service} completado para ${clientName}`;
    this.sendNotification(title, body);
  }

  // Verificar si las notificaciones están habilitadas
  isNotificationEnabled() {
    return this.isEnabled && this.permission === 'granted';
  }

  // Deshabilitar notificaciones
  disable() {
    this.isEnabled = false;
    localStorage.setItem('notificationsEnabled', 'false');
  }

  // Habilitar notificaciones (si ya se tienen permisos)
  enable() {
    if (this.permission === 'granted') {
      this.isEnabled = true;
      localStorage.setItem('notificationsEnabled', 'true');
    }
  }
}

// Instancia global del sistema de notificaciones
window.notificationSystem = new NotificationSystem();

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NotificationSystem;
}