const fetchData = async filters => {
  const url = new URL(import.meta.env.VITE_API_URL);
  const filterDos = { ...filters };
  Object.keys(filterDos).forEach(key => {
    url.searchParams.append(key, filterDos[key]);
  });

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();

  return data;
};

export default fetchData;
