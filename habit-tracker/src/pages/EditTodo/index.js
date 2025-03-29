import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
} from "@mui/material";

const statuses = ["Pending", "InProgress", "Complete"];

const EditTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/todos/${id}`)
      .then((response) => {
        setTodo(response.data);
        setFormData({
          title: response.data.title,
          description: response.data.description,
          status: response.data.status,
          priority: response.data.priority || "", // Varsayılan boş değer
          dueDate: response.data.dueDate
            ? new Date(response.data.dueDate).toISOString().split("T")[0]
            : "", // Tarih formatı düzeltmesi
        });
      })
      .catch((error) => console.error("Error fetching todo:", error));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:4000/api/todos/${id}`, formData)
      .then(() => navigate(`/habit/${id}`))
      .catch((error) => console.error("Error updating todo:", error));
  };

  if (!todo)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Card elevation={3} style={{ padding: "20px", borderRadius: "12px" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Todo'yu Düzenle
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Başlık"
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Açıklama"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              required
              multiline
              rows={3}
            />
            <TextField
              select
              fullWidth
              label="Durum"
              name="status"
              value={formData.status}
              onChange={handleChange}
              margin="normal"
              required
            >
              {statuses.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "15px" }}
            >
              Kaydet
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EditTodo;
