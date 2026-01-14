import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import TodoItem from "../components/TodoItem";
import { auth, db } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export default function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<any[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // tunggu auth siap
    const unsubAuth = onAuthStateChanged(auth, u => {
      setUser(u);
      if (!u) return;

      const ref = collection(db, "users", u.uid, "todos");

      const unsubTodo = onSnapshot(ref, snap => {
        setTodos(
          snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });

      return () => unsubTodo();
    });

    return () => unsubAuth();
  }, []);

  const addTodo = async () => {
    if (!task.trim() || !user) return;

    await addDoc(
      collection(db, "users", user.uid, "todos"),
      {
        title: task,
        isDone: false,
        createdAt: new Date(),
      }
    );

    setTask("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TaskifyApp</Text>
      <Text style={styles.sub}>Today’s Tasks</Text>

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TodoItem item={item} />}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.inputBar}>
        <TextInput
          placeholder="Add new task..."
          value={task}
          onChangeText={setTask}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTodo}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// === UI TIDAK DIUBAH ===
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
  },
  sub: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 20,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
  },
  addBtn: {
    backgroundColor: "#4F46E5",
    marginLeft: 10,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  addText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});
