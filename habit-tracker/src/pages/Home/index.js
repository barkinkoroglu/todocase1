import React, { useEffect, useState } from "react";
import { getTodos, deleteTodo } from "../../utils/api";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  Chip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimi durumu
  const [sortOrder, setSortOrder] = useState("asc"); // Artan/Azalan sıralama durumu
  const [currentPage, setCurrentPage] = useState(1); // Geçerli sayfa
  const [todosPerPage] = useState(10); // Her sayfada gösterilecek todo sayısı

  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
    };
    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id)); // Local state'i güncelle
  };

  // Arama terimi ile filtreleme
  const filteredTodos = todos.filter((todo) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return (
      todo.title.toLowerCase().includes(lowercasedSearchTerm) ||
      todo.description?.toLowerCase().includes(lowercasedSearchTerm)
    );
  });

  // Durum ve öncelik için renk ve simge ayarları
  const statusStyles = {
    Pending: { color: "gray", backgroundColor: "#f0f0f0" },
    InProgress: { color: "orange", backgroundColor: "#fff3e0" },
    Complete: { color: "green", backgroundColor: "#e8f5e9" },
  };

  const priorityStyles = {
    High: { color: "white", backgroundColor: "red" },
    Medium: { color: "white", backgroundColor: "orange" },
    Low: { color: "white", backgroundColor: "green" },
  };

  // Tarihe göre sıralama fonksiyonu
  const sortTodosByDate = (todos) => {
    return todos.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      if (sortOrder === "asc") {
        return dateA - dateB; // Artan sıralama
      } else {
        return dateB - dateA; // Azalan sıralama
      }
    });
  };

  // Pagination için gösterilecek todo'ları hesaplama
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = sortTodosByDate(filteredTodos).slice(
    indexOfFirstTodo,
    indexOfLastTodo
  );

  //pagination kontrolü
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Açıklamayı kısaltma ve "Devamını Göster" butonu
  const truncateDescription = (description, maxLength = 100) => {
    if (description && description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
  };

  const [expandedTodoId, setExpandedTodoId] = useState(null);

  const handleExpandDescription = (id) => {
    setExpandedTodoId(expandedTodoId === id ? null : id);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Barkın Köroğlu
      </Typography>

      {/* Arama Alanı */}
      <TextField
        label="Ara"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Arama kutusunda değişiklik
        margin="normal"
      />

      {/* Tarih Sıralama Seçeneği */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Tarih Sıralaması</InputLabel>
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          label="Tarih Sıralaması"
        >
          <MenuItem value="asc">Artan (Yeni önce)</MenuItem>
          <MenuItem value="desc">Azalan (Eski önce)</MenuItem>
        </Select>
      </FormControl>

      <List>
        {currentTodos.map((todo) => (
          <ListItem
            key={todo.id}
            style={{
              marginBottom: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start", //butonların düzgün yerleşmesi için alignItems
              border: "2px solid #e6e1e1",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <ListItemText
              primary={
                <Typography
                  style={{
                    fontSize: "1.2rem",
                    marginBottom: "5px",
                  }}
                >
                  {todo.title}
                </Typography>
              }
              secondary={
                <>
                  <Chip
                    label={`Durum: ${todo.status}`}
                    style={{
                      ...statusStyles[todo.status],
                      marginRight: "5px",
                    }}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                  <Chip
                    label={`Öncelik: ${todo.priority}`}
                    style={priorityStyles[todo.priority]}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{
                      marginTop: "5px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {todo.description && (
                      <>
                        <span
                          style={{
                            flex: 1,
                            color: "#555",
                            fontStyle: "italic",
                          }}
                        >
                          {expandedTodoId === todo.id
                            ? todo.description
                            : truncateDescription(todo.description)}
                        </span>
                        {todo.description.length > 100 && (
                          <Button
                            size="small"
                            onClick={() => handleExpandDescription(todo.id)}
                            style={{
                              marginLeft: "10px",
                              textTransform: "none",
                              fontWeight: "bold",
                              color: "#00796b",
                            }}
                          >
                            {expandedTodoId === todo.id
                              ? "Devamını Gizle"
                              : "Devamını Göster"}
                          </Button>
                        )}
                      </>
                    )}
                  </Typography>
                  {todo.dueDate && (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{
                        marginTop: "5px",
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      Bitiş Tarihi:{" "}
                      <span
                        style={{
                          color: "#1976d2",
                          fontWeight: "bold",
                        }}
                      >
                        {new Date(todo.dueDate).toLocaleDateString()}
                      </span>
                    </Typography>
                  )}
                </>
              }
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                variant="outlined"
                color="error"
                onClick={() => handleDelete(todo.id)}
                style={{ marginRight: "10px" }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                variant="outlined"
                color="primary"
                component={Link}
                to={`/habit/${todo.id}`}
              >
                <VisibilityIcon />
              </IconButton>
            </div>
          </ListItem>
        ))}
      </List>

      {/* Pagination */}
      <Pagination
        count={Math.ceil(filteredTodos.length / todosPerPage)} // toplam sayfa sayısı
        page={currentPage}
        onChange={(e, page) => paginate(page)} //paginate fonksiyonu çağrılır
        color="primary"
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />
    </div>
  );
};

export default Home;
