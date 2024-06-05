export const fetchData = {
  get: async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "https://student-list-c0ck.onrender.com",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

  post: async (url, newData) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': "https://student-list-c0ck.onrender.com",
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error posting data:", errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  },

  put: async (url, editData) => {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': "https://student-list-c0ck.onrender.com",
        },
        body: JSON.stringify(editData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating data:", errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  },

  delete: async (url) => {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Access-Control-Allow-Origin': "https://student-list-c0ck.onrender.com",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true; // Indicating successful deletion
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  },
};
