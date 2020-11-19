import axios from 'axios';
import url from './URL';
import setupUser from './setupUser';

const loginUser = async function (email, password) {
  const response = await axios
    .post(`${url}/auth/local`, {
      identifier: email,
      password,
    })
    .catch((error) => console.log(error));

    if (response) {
      setupUser(response)
    }

  return response;
};

export default loginUser;
