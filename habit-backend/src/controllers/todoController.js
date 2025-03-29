const prisma = require("../prismaClient");

// Tüm todos'ları listeleme
exports.getTodos = async (req, res) => {
  try {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Bir hata oluştu" });
  }
};

// Yeni todo ekleme
exports.createTodo = async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;
  console.log("todocontroller:", dueDate);
  try {
    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
        status: status || "Pending",
        priority: priority || "Medium",
        dueDate: dueDate || null,
      },
    });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Bir hata oluştu" });
  }
};

// Todo detaylarını görüntüleme
exports.getTodoById = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await prisma.todo.findUnique({
      where: { id: parseInt(id) },
    });
    if (!todo) return res.status(404).json({ error: "Todo bulunamadı" });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Bir hata oluştu" });
  }
};

// Todo güncelleme
exports.updateTodo = async (req, res) => {
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
        dueDate,
      },
    });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Bir hata oluştu" });
  }
};

// Todo silme
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.todo.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Bir hata oluştu" });
  }
};
