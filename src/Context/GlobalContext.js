import { createContext } from "react";

const GlobalContext = createContext({
	theme: "",
	setTheme: () => {},
	toggleTheme: () => {},
	accentColor: "",
	setAccentColor: () => {},
	handleAccentColor: () => {},
	networkStatus: "offline",
	setNetworkStatus: () => {},
	breakpoint: () => {},
	isLoading: "",
	setIsLoading: () => {},
	snack: {},
	setSnack: () => {},
	openSnackBar: false,
	setOpenSnackBar: () => {},
	isAuthenticated: "",
	setIsAuthenticated: () => {},
	user: undefined,
	setUser: () => {},
	token: undefined,
	setToken: () => {},
	verifyUser: () => {},
	updateUser: () => {},
	openSideBar: "",
	setOpenSideBar: () => {},
	toggleSideBar: () => {},
	sideBarLinks: [],
	setSideBarLinks: () => {},
	axiosInstance: undefined,
	events: [],
	setEvents: () => {},
	getAllEvents: () => {},
	addNewEvent: () => {},
	updateOneEvent: () => {},
	moveEventToTrash: () => {},
	restoreEventFromTrash: () => {},
	deleteEvent: () => {},
	notes: [],
	setNotes: () => {},
	getAllNotes: () => {},
	addNewNote: () => {},
	updateOneNote: () => {},
	archiveNote: () => {},
	unArchiveNote: () => {},
	moveNoteToTrash: () => {},
	restoreNoteFromTrash: () => {},
	deleteNote: () => {},
	tasks: [],
	setTasks: () => {},
	getAllTasks: () => {},
	addNewTask: () => {},
	updateOneTask: () => {},
	markTaskAsDone: () => {},
	markTaskAsNotDone: () => {},
	moveTaskToTrash: () => {},
	restoreTaskFromTrash: () => {},
	deleteTask: () => {},
	getSettings: () => {},
	synchronize: () => {},
});

export default GlobalContext;
