import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
  Chip,
  Button,
} from "@mui/material";

const priorityColors = {
  High: "error",
  Medium: "warning",
  Low: "success",
};

const HabitDetail = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/todos/${id}`)
      .then((response) => setTodo(response.data))
      .catch((error) => console.error("Error fetching todo:", error));
  }, [id]);

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
          <Typography variant="h4" gutterBottom>
            {todo.title}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            {todo.description}
          </Typography>
          <Box display="flex" gap={1} flexWrap="wrap" marginBottom={2}>
            <Chip label={`Durum: ${todo.status}`} color="primary" />
            <Chip
              label={`Öncelik: ${todo.priority}`}
              color={priorityColors[todo.priority] || "default"}
            />
            {todo.dueDate && (
              <Chip
                label={`Bitiş: ${new Date(todo.dueDate).toLocaleDateString()}`}
                color="secondary"
              />
            )}
          </Box>

          {/* Düzenleme Butonu */}
          <Button
            component={Link}
            to={`/edit/${todo.id}`}
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "10px" }}
          >
            Düzenle
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default HabitDetail;
