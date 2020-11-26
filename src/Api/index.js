import axios from 'axios';

// const url = 'http://localhost:3000';

const url = 'http://test.clevertec.ru';

export default class Api {
  static async fetchFormMeta() {
    const res = await axios.get(`${url}/tt/meta`);
    return res.data;
  }

  static async setFormData(data) {
    const res = await axios.post(`${url}/tt/data`, {
      data,
    });
    return res.data;
  }
}
