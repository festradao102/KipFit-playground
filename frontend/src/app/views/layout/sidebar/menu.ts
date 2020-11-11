import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Usuarios',
    icon: 'users',
    subItems: [
      {
        label: 'Ver usuarios',
        link: '/users',
      },
      {
        label: 'Crear un usuario',
        link: '/add-user/-1',
      }
    ]
  },
  {
    label: 'Suscriptores',
    icon: 'users',
    subItems: [
      {
        label: 'Ver suscriptores',
        link: '/subscribers',
      },
      {
        label: 'Crear un suscriptor',
        link: '/add-subscriber',
      }
    ]
  },
  {
    label: 'Planes',
    icon: 'file-text',
    subItems: [
      {
        label: 'Ver planes',
        link: '/'
      },
      {
        label: 'Crear un plan',
        link: '/'
      },
    ]
  },
  {
    label: 'Ejercicios',
    icon: 'zap',
    subItems: [
      {
        label: 'Ver ejercicios',
        link: '/',
      },
      {
        label: 'Crear un ejercicio',
        link: '/',
      },
    ]
  },
  {
    label: 'Clases',
    icon: 'layout',
    subItems: [
      {
        label: 'Ver clases',
        link: '/',
      },
      {
        label: 'Crear una clase',
        link: '/',
      }
    ]
  },
  {
    label: 'Medidas',
    icon: 'activity',
    subItems: [
      {
        label: 'Registrar medidas',
        link: '/add-measurement',
      }
    ]
  },
  {
    label: 'Facturacion',
    icon: 'dollar-sign',
    subItems: [
      {
        label: 'Ver reporte de pagos',
        link: '/',
      },
      {
        label: 'Pagar suscripcion',
        link: '/',
      },
    ]
  },
  {
    label: 'Configuracion',
    icon: 'settings',
    link: '/',
  },
];
