import MainPage from '../pages/main-page/index';
import DonateViaLink from '../pages/donate-via-link/index';

export const routes = [
  {
    path: '/:link',
    component: DonateViaLink,
  },
  {
    path: '/',
    component: MainPage,
  },
  
]