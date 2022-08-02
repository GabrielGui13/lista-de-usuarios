import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from './pages/Home'
import { Posts } from "./pages/Posts";
import { Tasks } from "./pages/Tasks";

const App = (props: any) => {

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/tasks/:id" element={<Tasks />} />
			<Route path="/posts/:id" element={<Posts />} />
		</Routes>
	);
};

export default App;