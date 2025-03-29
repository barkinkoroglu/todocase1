const express = require("express");
const cors = require("cors");
const prisma = require("./prisma"); // Prisma client'ı kullanacağız
const authRoutes = require("./auth/auth.routes");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors()); // CORS'u açıyoruz
app.use(express.json()); // JSON verilerini alabilmek için

// Todo CRUD API Endpoints

// 1. Todo Oluşturma (Create)
app.post("/api/todos", async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;
  try {
    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null, // Date objesine çeviriyoruz
      },
    });
    res.json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
});

// 2. Todo Listeleme (Read)
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
});

// 3. Todo Güncelleme (Update)
app.put("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority, dueDate } = req.body;
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null, // Tarihi ISO-8601 formatına çevir
      },
    });
    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
});

// 4. Todo Silme (Delete)
app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await prisma.todo.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
});

app.get("/api/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });

    if (!todo) {
      return res.status(404).json({ error: "Todo bulunamadı" });
    }

    res.json(todo);
  } catch (error) {
    console.error("Error fetching todo:", error);
    res.status(500).json({ error: "Bir hata oluştu" });
  }
});

// Auth route'larını ekleyelim
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
