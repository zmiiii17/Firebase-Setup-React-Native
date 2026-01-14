import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

export default function TodoItem({ item }: any) {
  const toggleDone = async () => {
    if (!auth.currentUser) return;

    await updateDoc(
      doc(db, "users", auth.currentUser.uid, "todos", item.id),
      { isDone: !item.isDone }
    );
  };

  const removeTodo = async () => {
    if (!auth.currentUser) return;

    await deleteDoc(
      doc(db, "users", auth.currentUser.uid, "todos", item.id)
    );
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={toggleDone}>
        <Text style={[styles.text, item.isDone && styles.done]}>
          {item.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={removeTodo}>
        <Text style={styles.delete}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
  done: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },
  delete: {
    fontSize: 18,
  },
});
