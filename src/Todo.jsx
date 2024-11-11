import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Login from './Login'
import { useNavigate } from "react-router-dom";


function Todo() {

    const navigate = useNavigate();

    const [tasks, setTasks] = useState([])

    const [taskInput, setTaskInput] = useState("")

    const [editId, setEditId] = useState("")

    const [editValue, setEditValue] = useState("")

    const getTasks = () => {
        let token = localStorage.getItem("token")
        axios.get("http://localhost:3000/task?token="+token)
            .then(res => {
                console.log(res)
                setTasks(res.data)
            })
    }

    useEffect(() => {
        let token = localStorage.getItem("token")
        if (!token){
            navigate("login")
        }
        getTasks()
    }, [])

    const addTask = () => {
        let token = localStorage.getItem("token")
        let data = {                      //posting data into database
            "task": taskInput,
            "isCompleted": false,
            "user": token
        }
        axios.post("http://localhost:3000/task", data)
            .then(res => {
                alert("Added Successfully")
                getTasks()
            })
            .catch(err => {
                alert("Something went wrong on posting")
            })
    }

    const inputChanged = (event) => {
        setTaskInput(event.target.value)
    }

    const deleteTask = (id) => {
        axios.delete("http://localhost:3000/" + id)
            .then(res => {
                alert("Task deleted")
                getTasks()
            })
            .catch(err => {
                console.log(err)
                alert("Something went wrong when deleting")
            })
    }

    const editTask = (task) => {
        setEditId(task._id)
        setEditValue(task.task)
    }

    const updateTask = () => {
        axios.put("http://localhost:3000/" + editId, { task: editValue })
            .then(res => {
                alert("Updated")
                setEditId("")
                setEditValue("")
                getTasks()
            })
    }

    const logoutClicked = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <>
            <hr />
            <button onClick={logoutClicked}>Logout</button>
            <h1>Todo App</h1>
            <input type="text" onChange={inputChanged} />
            <button onClick={addTask}>Add task</button>

            <ul>
                {tasks.map((task, index) => {
                    return (
                        <>
                            {editId == task._id
                                ? <>
                                    <input type='text' value={editValue} onChange={(event) => setEditValue(event.target.value)} /><button onClick={updateTask}>Save</button>
                                </>
                                : <li key={index}>{task.task}<button onClick={() => deleteTask(task._id)}>delete</button><button onClick={() => editTask(task)}>Edit</button></li>
                            }

                        </>
                    )
                })}
            </ul>
        </>
    )
}

export default Todo