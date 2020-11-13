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
        label: 'Crear un plan',
      //  link: '/advanced-form-elements/ngx-dropzone-wrapper'
        link: 'add-plan'
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
