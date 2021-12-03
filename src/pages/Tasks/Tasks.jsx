import React, { useState, useEffect } from 'react';
import Task from './Task';
import TaskPopup from './TaskPopup';
import AddTask from './AddTask';
import { Tooltip, IconButton, Snackbar, Zoom, Fab, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditTask from './EditTask';
import Button from '../../components/Button'
import nullTasks from '../../images/nullTasks.svg'
import useDocumentTitle from '../../components/Title';
import { useWebContext } from '../../components/Context/WebContext';

const Tasks = ({ axiosInstance }) => {
    AOS.init();
    useDocumentTitle('Tasks');
    useEffect(() => {
        window.scrollTo(0, 0);
        getTasks();
    }, []);
    const { theme } = useWebContext();
    const [allTasks, setAllTasks] = useState([])
    allTasks.sort((a, b) => {
        let _a = new Date(a.date);
        let _b = new Date(b.date);
        if (_a < _b) return -1;
        else if (_a === _b) return 0;
        else return 1;
    })
    const [popupTaskBox, setPopupTaskBox] = useState(-1);
    const [addTaskBox, setAddTaskBox] = useState(-1);
    const [editTaskBox, setEditTaskBox] = useState(-1);
    const [snackMessage, setSnackMessage] = useState("Action successful");
    async function getTasks() {
        await axiosInstance.get('/api/tasks')
            .then((res) => {
                setAllTasks([...res.data]);
            })
            .catch(err => console.log(err));
    }
    const popupTask = (a) => {
        setPopupTaskBox(a);
    }
    const deleteTask = (id) => {
        axiosInstance.delete(`/tasks/${id}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        getTasks();
        setSnackMessage("Task deleted successfully");
        setOpen(true);
        setPopupTaskBox(-1);
    }
    const addNewTask = () => {
        setAddTaskBox(1);
    }
    const addTask = (a) => {
        let newTask = {
            id: allTasks.length,
            ...a
        }
        const condition = newTask.title === "" && newTask.time === "";
        if (!condition) {
            axiosInstance.post('/tasks', newTask)
                .then(res => console.log(res.data))
                .catch(err => console.log(err));
            setSnackMessage("Task added successfully");
            getTasks();
        }
        else setSnackMessage("Can't add an empty task");
        setOpen(true);
        setAddTaskBox(condition ? 1 : -1);
    }
    const editTask = (a) => {
        let newTask = { ...a };
        axiosInstance.patch(`/tasks/${newTask.id}`, { ...newTask })
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        getTasks();
        setSnackMessage("Changes saved");
        setOpen(true);
        setEditTaskBox(-1);
    }
    const handleDoneChange = (id) => {
        let newTask = allTasks[id];
        axiosInstance.patch(`/tasks/${newTask.id}`, {
            ...newTask,
            done: !newTask.done
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        setSnackMessage(newTask.done ? "Marked as Not Done" : "Marked as Done");
        getTasks();
        setOpen(true);
    }
    const AccordionStyle = { backgroundColor: 'transparent', color: 'inherit' };
    const Theme = useTheme();
    const transitionDuration = {
        enter: Theme.transitions.duration.enteringScreen,
        exit: Theme.transitions.duration.leavingScreen,
    };
    const fabStyle = {
        position: 'absolute',
        bottom: 16,
        right: 16,
    };
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
        <section className="tasks" data-aos="fade-up">
            {allTasks.length !== 0 ? (
                <>
                    <Accordion defaultExpanded={true} sx={AccordionStyle}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <div className="tasks-head">
                                Your Tasks
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="row tasks-row">
                                {
                                    allTasks.map((task, index) =>
                                        !task.done && <Task
                                            key={index}
                                            title={task.title}
                                            description={task.description}
                                            date={task.date}
                                            time={task.time}
                                            done={task.done}
                                            Pop={() => { popupTask(index) }}
                                            onEdit={() => { setEditTaskBox(index) }}
                                            onDelete={() => { deleteTask(task.id) }}
                                            handleDone={() => { handleDoneChange(index) }}
                                        />
                                    )
                                }
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded={false} sx={AccordionStyle}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <div className="tasks-head">
                                Completed Tasks
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="row tasks-row">
                                {
                                    allTasks.map((task, index) =>
                                        task.done && <Task
                                            key={index}
                                            title={task.title}
                                            description={task.description}
                                            date={task.date}
                                            time={task.time}
                                            done={task.done}
                                            Pop={() => { popupTask(index) }}
                                            onDelete={() => { deleteTask(task.id) }}
                                            handleDone={() => { handleDoneChange(index) }}
                                        />
                                    )
                                }
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </>
            ) : (
                <div className="tasks-null">
                    <div className="tasks-null-image" data-aos="zoom-in">
                        <img className="tasks-null-image__img" src={nullTasks} alt="No events" />
                    </div>
                    <div className="tasks-null-content">
                        <div className="tasks-null-content__text">No tasks yet</div>
                        <div className="tasks-null-content__button">
                            <Button
                                variant={theme === "light" ? "outline" : "fill"}
                                imgSrc={nullTasks}
                                text="Add a task"
                                onClick={() => { setAddTaskBox(1) }}
                                color="green"
                            />
                        </div>
                    </div>
                </div>
            )}
            {
                popupTaskBox >= 0 && <TaskPopup
                    task={allTasks[popupTaskBox]}
                    close={() => { setPopupTaskBox(-1) }}
                />
            }
            {
                addTaskBox >= 0 && <AddTask
                    close={() => { setAddTaskBox(-1) }}
                    submit={addTask}
                />
            }
            {
                editTaskBox >= 0 && <EditTask
                    taskToEdit={allTasks[editTaskBox]}
                    close={() => { setEditTaskBox(-1) }}
                    submit={editTask}
                />
            }
            {
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={snackMessage}
                    action={action}
                />
            }
            <div className="task-add-icon">
                <Zoom
                    key="primary"
                    in={2 > 1}
                    timeout={transitionDuration}
                    style={{
                        transitionDelay: `${2 > 1 ? transitionDuration.exit : 0}ms`,
                    }}
                    unmountOnExit
                >
                    <Tooltip title="Add a task">
                        <Fab sx={fabStyle} aria-label="Add" color="primary" onClick={addNewTask} style={{ "position": "fixed" }}>
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </Zoom>
            </div>
        </section>
    )
}

export default Tasks
