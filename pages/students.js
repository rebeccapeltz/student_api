import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", school: "" });
  const [error, setError] = useState("");
  const [newStudentId, setNewStudentId] = useState(null); // Track new student

  // Fetch students on mount
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setStudents);
  }, []);

  // Handle form input changes
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.school) {
      setError("Name and school are required.");
      return;
    }
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const newStudent = await res.json();
      debugger;
      setStudents([...students, newStudent]);
      setForm({ name: "", school: "" });
      setNewStudentId(newStudent.id); // Set new student ID
      setTimeout(() => setNewStudentId(null), 1000); // Remove highlight after 1s
    } else {
      const data = await res.json();
      setError(data.error || "Failed to add student.");
    }
  }

  // Handle delete student
  async function handleDelete(id) {
    const res = await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.status === 204) {
      setStudents(students.filter((s) => s.id !== id));
    } else {
      const data = await res.json();
      setError(data.error || "Failed to delete student.");
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Student Registration</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            name="school"
            placeholder="School"
            value={form.school}
            onChange={handleChange}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Add Student
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        <h2>Student List</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>School</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr
                key={s.id}
                className={s.id === newStudentId ? styles.newStudent : ""}
              >
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.school}</td>
                <td>
                  <button onClick={() => handleDelete(s.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
