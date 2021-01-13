import React, {useState} from "react"
import styled from "styled-components"
import {Box, Checkbox, FormLabel, Paper} from "@material-ui/core"
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import {TodoItem} from "./Todo"

type Props = {
    todoItem: TodoItem
    reloadTodos: () => void
}

export const TodoDetail: React.FC<Props> = ({
                                          todoItem,
                                          reloadTodos
                                      }) => {
    const [task, setTask] = useState(todoItem)
    const updateIsDone = async () => {
        console.log(task)
        await fetch(`http://localhost:8080/todoItems/${task.id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...task, isDone: !task.isDone})
        });
        setTask({...task, isDone: !task.isDone})
        console.log(task)
        console.log("set task is done.")
    };

    const deleteTask = async () => {
        await fetch(`http://localhost:8080/todoItems/${task.id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        });
        reloadTodos()
    };

    return (<TodoWrapper>
        <FormLabel>Finished
        <Checkbox className="isDoneCheckbox" checked={task.isDone}
               onChange={() => updateIsDone()}/>
        </FormLabel>
        <TaskBox component="span">{task.task}</TaskBox>
        <IconButton className="todoDeleteButton" aria-label="delete" onClick={() => deleteTask()}>
            <DeleteIcon/>
        </IconButton>
    </TodoWrapper>);
}

const TodoWrapper = styled(Paper)`
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: #282c34;
`

const TaskBox = styled(Box)`
    width: 50vw;
`


