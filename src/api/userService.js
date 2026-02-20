const BASE_URL = "https://erammakeover-backend-production.up.railway.app/api/users";

export const userService = {
  // GET all users (Bookings)
  getAllUsers: async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch users");
    return await response.json();
  },

  // GET single user
  getUserById: async (userId) => {
    const response = await fetch(`${BASE_URL}/${userId}`);
    return await response.json();
  },

  // POST (Create new booking)
  createUser: async (userData) => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await response.json();
  },

  // PUT (Update status/Approve)
  updateUser: async (userId, updateData) => {
    const response = await fetch(`${BASE_URL}/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });
    return await response.json();
  },

  // DELETE (Decline)
  deleteUser: async (userId) => {
    const response = await fetch(`${BASE_URL}/${userId}`, {
      method: "DELETE",
    });
    return await response.json();
  },
};