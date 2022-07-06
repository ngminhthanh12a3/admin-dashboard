import { API_SIGNIN_URL } from '@/constants';
import { API_Inits, requestToAPI } from '@/handlers';

export const login = async ({ username, password, type }) => {
  // console.log()
  return requestToAPI(API_SIGNIN_URL, API_Inits({ body: { username, password, type } }));
};
