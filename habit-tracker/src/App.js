import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Button, Box, Typography } from "@mui/material";
import Home from "./pages/Home";
import HabitDetail from "./pages/HabitDetail/index";
import AddHabit from "./pages/AddHabit";
import EditTodo from "./pages/EditTodo";

function App() {
  return (
    <Router>
      <Container
        maxWidth="md"
        style={{
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {/* Navigation */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight="bold">
            Todo Uygulaması
          </Typography>
          <Box>
            <Button
              component={Link}
              to="/"
              variant="outlined"
              color="primary"
              style={{ marginRight: 10 }}
            >
              Ana Sayfa
            </Button>
            <Button
              component={Link}
              to="/add"
              variant="contained"
              color="primary"
            >
              Yeni Todo Ekle
            </Button>
          </Box>
        </Box>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/habit/:id" element={<HabitDetail />} />
          <Route path="/add" element={<AddHabit />} />
          <Route path="/edit/:id" element={<EditTodo />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
