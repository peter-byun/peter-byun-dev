import { NextApiResponse } from 'next';
import { isDev } from '../../utils/environment-checker';

export function allowAllOrigins(res: NextApiResponse) {
  if (isDev()) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
}
