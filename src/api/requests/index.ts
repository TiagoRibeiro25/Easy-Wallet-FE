import api from '../axios.config';
import user from './user';

async function ping(): Promise<'pong' | 'error'> {
  try {
    const response = await api.get('');
    return response.data.success ? 'pong' : 'error';
  } catch (error) {
    return 'error';
  }
}

export default {
  ping,
  user,
};
