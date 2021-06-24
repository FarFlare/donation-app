import MainPage from '../pages/main-page/index';
import DonateViaLink from '../pages/donate-via-link/index';

export const routes = [
  {
    path: '/donation-app/:link',
    component: DonateViaLink,
  },
  {
    path: '/donation-app',
    component: MainPage,
  },
  
]