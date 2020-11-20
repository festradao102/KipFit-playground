import {MenuItem} from './menu.model';

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
        label: 'Crear un plan',
        link: 'add-plan'
      },
    ]
  },
  {
    label: 'Rutinas',
    icon: 'folder',
    subItems: [
      {
        label: 'Ver rutinas',
        link: '/routines'
      },
      {
        label: 'Crear una rutina',
        link: '/add-routine'
      },
    ]
  },
  {
    label: 'Ejercicios',
    icon: 'zap',
    subItems: [
      {
        label: 'Ver ejercicios',
        link: '/exercises',
      },
      {
        label: 'Ver ejercicios por tipo',
        link: '/exercises-types',
      },
      {
        label: 'Crear un ejercicio',
        link: '/add-exercise',
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
    label: 'Facturación',
    icon: 'dollar-sign',
    subItems: [
      {
        label: 'Ver reporte de pagos',
        link: '/',
      },
      {
        label: 'Pagar suscripción',
        link: '/',
      },
    ]
  },
  {
    label: 'Configuración',
    icon: 'settings',
    link: '/',
  },
];
