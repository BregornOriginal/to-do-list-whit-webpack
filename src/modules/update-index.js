export const updateIndex = (list) => {
  let counter = 1;
  list.forEach((task) => {
    task.index = counter;
    counter += 1;
  });
};

export const updateElementId = () => {
  const liList = document.querySelectorAll('.task-container');
  let counter = 1;
  liList.forEach((element) => {
    element.id = counter;
    counter += 1;
  });
};
