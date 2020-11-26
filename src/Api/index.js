import axios from 'axios';

const url = 'http://localhost:3000';


export default class Api {
  static async fetchFormMeta() {
    const res = await axios.get(`/tt/meta`);
    return res.data;
  }

  static async setFormData(data) {
    const res = await axios.post(`/tt/data`, {
      data,
    });
    return res.data;
  }
}
