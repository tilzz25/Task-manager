export const fetchTasksFromAPI = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
  const data = await response.json();
  return data.map((d) => ({ id: d.id.toString(), description: d.title, completed: d.completed }));
};
