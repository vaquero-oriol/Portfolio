export const ProfileService = async () => {
  try {
    const response = await fetch(`http://192.168.5.10:8080/profile/1`, {
      //method: 'GET',
      //headers: {
      //'Content-Type': 'application/json'
      //},
      //  body: JSON.stringify()
    });
    if (response.ok) {
      const jsonData = await response.json();

      return jsonData;
    }
  } catch (error) {
    console.log('Error al obtener los datos:', error);
  }
};
