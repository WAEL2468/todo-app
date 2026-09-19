# To-Do List App

A clean, responsive to-do list built with **React** and **Material UI (MUI)**. Tasks are saved in the browser, so they are still there after a page refresh.

## Features

- **Add tasks** quickly with the input form (press Enter or click the button)
- **Edit tasks** inline and save the change
- **Delete tasks** with one click
- **Mark tasks as completed** with a checkbox (completed tasks are crossed out)
- **Progress counter** showing completed tasks out of the total
- **Persistent storage** using `localStorage`
- **Auto-focus** on the input field when the app loads
- **Smooth hover animation** on each task card
- **Empty state message** when there are no tasks

## Tech Stack

- [React](https://react.dev/) (Hooks: `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`)
- [Vite](https://vitejs.dev/) for fast development and builds
- [Material UI](https://mui.com/) with Emotion for styling
- [MUI Icons](https://mui.com/material-ui/material-icons/)
- Browser `localStorage` for data persistence

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/WAEL2468/todo-app.git

# 2. Go into the project folder
cd todo-app

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open the local address shown in the terminal (usually `http://localhost:5173`).

### Build for Production

```bash
npm run build
```

The production files will be generated in the `dist` folder. To preview the build locally:

```bash
npm run preview
```

## Project Structure

```
todo-app/
├── public/          # Static assets
├── src/
│   ├── App.jsx      # Main component (all to-do logic and UI)
│   ├── main.jsx     # App entry point
│   └── index.css    # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## How It Works

- Tasks are stored in React state and synced to `localStorage` whenever they change.
- The completed-tasks counter is computed with `useMemo`, so it only recalculates when the task list changes.
- Delete and toggle handlers use `useCallback` with functional state updates to avoid unnecessary re-creation.

## Possible Improvements

- Filter tasks (All / Active / Completed)
- Drag and drop to reorder tasks
- Due dates and priorities
- Dark mode
- Right-to-left (RTL) layout support for Arabic

## License

This project is open source and available for learning and personal use.
