import axios from "axios";

const API_URL = "http://localhost:4000/api/todos";

// 1. Todo Ekleme (Create)
export const addTodo = async (todo) => {
  try {
    console.log("Sending request with data:", todo); // Check if request is sent
    const response = await axios.post(API_URL, todo);
    console.log("apiden gelen:", response.data); // Should log the response data
    return response.data;
  } catch (error) {
    console.error("Error adding todo", error);
  }
};

// 2. Todo Listeleme (Read)
export const getTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos", error);
  }
};

// 3. Todo Güncelleme (Update)
export const updateTodo = async (id, updatedTodo) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
    return response.data;
  } catch (error) {
    console.error("Error updating todo", error);
  }
};

// 4. Todo Silme (Delete)
export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting todo", error);
  }
};
