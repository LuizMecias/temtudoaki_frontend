import axios from 'axios';

class UsuarioService {
  async cadastrar(data) {
    return axios({
      url: 'http://192.168.0.17:3000/usuario/cadastrar',
      method: 'POST',
      data: data,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

const usuarioService = new UsuarioService();
export default usuarioService;
