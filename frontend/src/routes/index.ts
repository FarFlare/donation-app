import MainPage from '../pages/main-page/index';
import DonateViaLink from '../pages/donate-via-link/index';
import DonateToCeleb from '../pages/donate-celeb';

export const routes = [
  {
    path: '/donate/:link',
    component: DonateViaLink,
  },
  {
    path: '/celeb',
    component: DonateToCeleb,
  },
  {
    path: '/',
    component: MainPage,
  },
  
]