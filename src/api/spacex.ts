const API_BASE = 'https://api.spacexdata.com/v4'; 

export const fetchLaunches = async () => {
  const res = await fetch(`${API_BASE}/launches`);
  if (!res.ok) {
    throw new Error('Failed to fetch launches');
  }
  return res.json();  // Returns an array of launches
};

export const fetchLaunch = async (id: string) => {
  const res = await fetch(`${API_BASE}/launches/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch launch details');
  }
  return res.json();  // Returns  single launch details object
};
