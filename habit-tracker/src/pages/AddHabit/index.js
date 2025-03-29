import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
} from "@mui/material";

const statusOptions = ["Pending", "InProgress", "Complete"];
const priorityOptions = ["High", "Medium", "Low"];

const AddHabit = ({ onTodoAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newTodo = {
      title,
      description,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null, // String yerine Date objesi
    };

    try {
      console.log(newTodo);
      await axios.post("http://localhost:4000/api/todos", newTodo);
      if (onTodoAdded) onTodoAdded();
      setTitle("");
      setDescription("");
      setStatus("Pending");
      setPriority("Medium");
      setDueDate("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Yeni Görev Ekle
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Başlık"
          variant="outlined"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Açıklama"
          variant="outlined"
          fullWidth
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />

        {/* Status Dropdown */}
        <TextField
          select
          label="Durum"
          variant="outlined"
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          margin="normal"
        >
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        {/* Priority Dropdown */}
        <TextField
          select
          label="Öncelik"
          variant="outlined"
          fullWidth
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          margin="normal"
        >
          {priorityOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Bitiş Tarihi"
          variant="outlined"
          fullWidth
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Ekle
        </Button>
      </form>
    </Container>
  );
};

export default AddHabit;
