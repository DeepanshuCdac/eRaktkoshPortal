import { Button, Checkbox } from "antd";
import react, { useState } from "react";

const Todo = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleAddTask = () => {
    //const updatedList = [...list]

    if (!text.trim()) {
      return;
    }
    setList([...list, { text, completed: false }]);
    setText("");
    console.log("List:", list);
  };

  const toggleCompleted = (index) => {
    const updatedList = [...list];
    updatedList[index].completed = !updatedList[index].completed;
    setList(updatedList);
  };

  const handleDeleteEvent = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <>
      <div>
        <input value={text} onChange={handleTextChange} />
        <Button onClick={handleAddTask}>Add Task</Button>

        {list.map((target, index) => (
          <div key={index}>
            <Checkbox
              checked={target.completed}
              onChange={() => toggleCompleted(index)}
            />
            <p>{target.text}</p>
            <Button onClick={() => handleDeleteEvent(index)}>
              Delete this event
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Todo;
