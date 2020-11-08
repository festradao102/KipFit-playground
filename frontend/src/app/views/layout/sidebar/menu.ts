import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Usuarios',
    icon: 'users',
    subItems: [
      {
        label: 'Ver usuarios',
        link: '/users/list-user',
      },
      {
        label: 'Crear un usuario',
        link: '/users/new-user',
      }
    ]
  },
  {
    label: 'Suscriptores',
    icon: 'users',
    subItems: [
      {
        label: 'Ver suscriptores',
        link: '/advanced-ui/cropper',
      },
      {
        label: 'Crear un suscriptor',
        link: '/advanced-ui/owl-carousel',
      }
    ]
  },
  {
    label: 'Planes',
    icon: 'file-text',
    subItems: [
      {
        label: 'Ver planes',
        link: '/form-elements/basic-elements'
      },
      {
        label: 'Crear un plan',
        link: '/advanced-form-elements/ngx-dropzone-wrapper'
      },
    ]
  },
  {
    label: 'Ejercicios',
    icon: 'zap',
    subItems: [
      {
        label: 'Ver ejercicios',
        link: '/charts-graphs/apexcharts',
      },
      {
        label: 'Crear un ejercicio',
        link: '/charts-graphs/chartjs',
      },
    ]
  },
  {
    label: 'Clases',
    icon: 'layout',
    subItems: [
      {
        label: 'Ver clases',
        link: '/tables/basic-table',
      },
      {
        label: 'Crear una clase',
        link: '/tables/data-table',
      }
    ]
  },
  {
    label: 'Medidas',
    icon: 'activity',
    subItems: [
      {
        label: 'Ver medidas',
        link: '/icons/feather-icons',
      },
      {
        label: 'Registrar medidas',
        link: '/icons/flag-icons',
      }
    ]
  },
  {
    label: 'Facturacion',
    icon: 'dollar-sign',
    subItems: [
      {
        label: 'Ver reporte de pagos',
        link: '/auth/login',
      },
      {
        label: 'Pagar suscripcion',
        link: '/auth/register',
      },
    ]
  },
  {
    label: 'Configuracion',
    icon: 'settings',
    link: '/',
  },
];
