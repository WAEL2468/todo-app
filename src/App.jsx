import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [inputTask, setInputTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!inputTask.trim()) return;

    const newTask = {
      id: Date.now(),
      text: inputTask,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTask]);
    setInputTask("");
  };

  const handleDeleteTask = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const handleToggleComplete = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);

  const handleStartEdit = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
  };

  const handleSaveEdit = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo,
      ),
    );
    setEditId(null);
    setEditText("");
  };

  const completedCount = useMemo(() => {
    return todos.filter((todo) => todo.completed).length;
  }, [todos]);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: "12px" }}>
        {/* عنوان التطبيق */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          My To-Do List
        </Typography>

        {/* إحصائية سريعة */}
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          sx={{ mb: 3 }}
        >
          المهام المكتملة: {completedCount} من {todos.length}
        </Typography>

        {/* نموذج إدخال المهمة الجديدة */}
        <Box
          component="form"
          onSubmit={handleAddTask}
          sx={{ display: "flex", gap: 2, mb: 4 }}
        >
          <TextField
            inputRef={inputRef}
            fullWidth
            label="أدخل مهمة جديدة..."
            variant="outlined"
            value={inputTask}
            onChange={(e) => setInputTask(e.target.value)}
          />
          <Button type="submit" variant="contained" size="large">
            إضافة
          </Button>
        </Box>

        {/* قائمة عرض المهام */}
        <List>
          {todos.length === 0 ? (
            <Typography align="center" color="textSecondary">
              لا توجد مهام حالياً، أضف مهمتك الأولى!
            </Typography>
          ) : (
            todos.map((todo) => (
              <ListItem
                key={todo.id}
                sx={{
                  bgcolor: "#e3f2fd", // خلفية زرقاء فاتحة للمهمة عند نزولها
                  mb: 2,
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.3s ease", // حركة سلسة
                  "&:hover": {
                    transform: "scale(1.02)", // تكبير خفيف ومريح
                    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)", // ظل مرتب
                    bgcolor: "#bbdefb", // أزرق أغمق قليلاً عند الـ Hover
                  },
                }}
              >
                {/* زر تحديد الإنجاز (Checkbox) */}
                <Checkbox
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                  color="success"
                />

                {/* عرض نص المهمة أو حقل التعديل */}
                {editId === todo.id ? (
                  <TextField
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    size="small"
                    sx={{ flexGrow: 1, mx: 2 }}
                  />
                ) : (
                  <ListItemText
                    primary={todo.text}
                    sx={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      color: todo.completed ? "text.disabled" : "text.primary",
                      mx: 2,
                    }}
                  />
                )}

                {/* أزرار التحكم */}
                <Box>
                  {editId === todo.id ? (
                    <IconButton
                      color="primary"
                      onClick={() => handleSaveEdit(todo.id)}
                    >
                      <SaveIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      color="info"
                      onClick={() => handleStartEdit(todo.id, todo.text)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}

                  <IconButton
                    color="error"
                    onClick={() => handleDeleteTask(todo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))
          )}
        </List>
      </Paper>
    </Container>
  );
}

export default App;
