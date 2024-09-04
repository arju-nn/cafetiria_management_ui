// src/services/ItemService.js
import { message } from 'antd';
import axios from "axios/axios";

class ItemService {
    static getItems() {
        return axios.get('/api/items');
    }
    
    static async addItem(values) {
    const token = JSON.parse(localStorage.getItem("token"));
    // return axios.post('/api/items', data);
        try {
            let response;
            // if (editData) {
            //   // Update item
            //   response = await axios.put(`/api/items/${editData.id}`, values, {
            //     headers: {
            //       Authorization: `Bearer ${token}`,
            //     },
            //   });
            //   updateItem(response.data);
            //   editSuccessful("Item updated successfully");
            // } else {
              // Create new item
              response = await axios.post('http://localhost:5000/api/items', values, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              return(response.data);
            
            // setVisible(false);
          } catch (err) {
            console.error('err: ', err);
            // errorMsg(err.response?.data?.message || "Something went wrong");
          } 
    }

    static editItem(id, data) {
      console.log('data: ', data);
      console.log('id: ', id);
      const token = JSON.parse(localStorage.getItem("token"));
        return axios.put(`/api/items/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    }
}

export default ItemService;
