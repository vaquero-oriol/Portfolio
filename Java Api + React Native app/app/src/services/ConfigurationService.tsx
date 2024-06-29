import { User } from '../models/User';

export const ProfileRepository = async (user: User) => {
  try {
    const response = await fetch(`http://10.202.13.78:8080/profile/1`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      alert(await response.text());
    }
  } catch (error) {
    console.log('Error al obtener los datos:', error);
  }
};
