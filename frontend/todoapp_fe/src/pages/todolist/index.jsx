import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { useTodo } from "../../context/todoContext";

const TodoList = () => {
  const {
    todoList,
    fetchTodoById,
    todoListByIdData,
    addTodoTaskMutation,
    editMode,
    setEditMode,
    updateTodoTaskMutation,
    deleteTodoTaskMutation,
  } = useTodo();
  const [task, setTask] = useState(todoListByIdData?.name || "");
  const handleAddTask = () => {
    if (task) {
      const newTaskData = { name: task };
      addTodoTaskMutation.mutate(newTaskData);
      setTask("");
    }
  };

  const handleEditTask = (data) => {
    if (task && data) {
      const newTaskData = { id: data.id, name: task };
      updateTodoTaskMutation.mutate(newTaskData);
      setTask("");
    }
  };
  const handleDeleteTask = (taskId) => {
    console.log({ taskId });
    deleteTodoTaskMutation.mutate(taskId);
  };

  return (
    <Container maxWidth="lg" mt={1}>
      <Box mb={2}>
        <Typography variant="h4" align="center" gutterBottom>
          Todo List
        </Typography>
        <Box display="flex" alignItems="center">
          <TextField
            label="Task"
            variant="outlined"
            fullWidth
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={() =>
              editMode ? handleEditTask(todoListByIdData) : handleAddTask()
            }
            sx={{ ml: 2, px: 4 }}
          >
            {editMode ? "Update" : "Add"}
          </Button>
        </Box>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>SN</TableCell>
            <TableCell>Task</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todoList?.map((task, index) => (
            <TableRow key={index}>
              {/* Task column */}
              <TableCell>{index + 1}</TableCell>
              <TableCell>{task.name}</TableCell>
              {/* Action column */}
              <TableCell>
                <EditIcon
                  style={{ fontSize: "1rem", cursor: "pointer" }}
                  onClick={() => {
                    fetchTodoById(task.id), setTask(task?.name);
                    setEditMode(true);
                  }}
                />
                <DeleteIcon
                  style={{
                    fontSize: "1rem",
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDeleteTask(task.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default TodoList;
