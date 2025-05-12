// const API_BASE_URL = 'http://localhost:8080/api';
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8080/api';


export const getAllMentors = async () => {
  try {
    const url = `${API_BASE_URL}/mentors`;
    const res = await fetch(url);
    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`Failed to get all mentors: ${res.status} ${res.statusText}${errorBody ? ' - ' + errorBody : ''}`);
    }
    const data = await res.json();
    return data;

  } catch (error) {
    console.error('Error fetching all mentors:', error);
    throw error;
  }
};


export const createMentor = async (mentorData, adminCredentials) => {
  try {
    const url = `${API_BASE_URL}/mentors`;
    const base64Credentials = btoa(`${adminCredentials.username}:${adminCredentials.password}`);

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${base64Credentials}`
      },
      body: JSON.stringify(mentorData),
    });
    let errorBody = null;
    if (!res.ok) {
      errorBody = await res.text();

      throw new Error(`Failed to create mentor: ${res.status} ${res.statusText}${errorBody ? ' - ' + errorBody : ''}`);
    }
    const data = await res.json();
    return data;

  } catch (error) {
    console.error('Error during mentor creation:', error);
    throw error;
  }
};

export const getMentorById = async (id) => {
  try {
    const url = `${API_BASE_URL}/mentors/${id}`;
    const res = await fetch(url);

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`Failed to get mentor ${id}: ${res.status} ${res.statusText}${errorBody ? ' - ' + errorBody : ''}`);
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error(`Error fetching mentor ${id}:`, error);
    throw error;
  }
};


export const getMentorAvailabilityById = async (mentorId) => {
  try {
    const url = `${API_BASE_URL}/mentors/${mentorId}/availability`;
    const res = await fetch(url);
    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`Failed to get availability for mentor ${mentorId}: ${res.status} ${res.statusText}${errorBody ? ' - ' + errorBody : ''}`);
    }
    const data = await res.json();
    return data;

  } catch (error) {
    console.error(`Error fetching availability for mentor ${mentorId}:`, error);
    throw error;
  }
};

