import axios from 'axios';

let cancel;

const { CancelToken } = axios;

const url = 'http://localhost:3000';

export default class Api {
  static async getFormMeta() {
    const res = await axios.get(`${url}/tt/meta`, {
      cancelToken: new CancelToken((c) => {
        cancel = c;
        return {
          data: 'get form meta has cancel',
        };
      }),
    });
    return res.data;
  }

  static async cancelLoad() {
    await cancel();
  }

  static async setFormData(data) {
    const res = await axios.post(`${url}/tt/data`, {
      data,
    }, {
      cancelToken: new CancelToken((c) => {
        cancel = c;
        return {
          data: 'post form data has cancel',
        };
      }),
    });
    return res.data;
  }
}
