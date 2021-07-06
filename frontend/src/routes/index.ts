import MainPage from '../pages/main-page/index';
import DonateViaLink from '../pages/donate-via-link/index';
import DonateToCeleb from '../pages/donate-celeb';

export const routes = [
  {
    path: '/donation-app/donate/:link',
    component: DonateViaLink,
  },
  {
    path: '/donation-app/celeb',
    component: DonateToCeleb,
  },
  {
    path: '/donation-app',
    component: MainPage,
  },
  
]