import Task from "./Task";

const Tasks = ({ tasks, setTasks, filter }) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "open") return !task.completed;
    return true;
  });

  return (
    <>
      {filteredTasks.length === 0 ? (
        <p className="text-center text-white mt-4">
          Nenhuma tarefa encontrada.
        </p>
      ) : (
        filteredTasks.map((t) => (
          <Task key={t._id} task={t} setTasks={setTasks} />
        ))
      )}
    </>
  );
};

export default Tasks;
