import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthGuard } from "./guards/AuthGuard";
import { Error404 } from "./pages/Error404";
import { Home } from './pages/Home'
import { Login } from "./pages/Login";
import { Posts } from "./pages/Posts";
import { Tasks } from "./pages/Tasks";

const App = (props: any) => {

	return (
		<Routes>
			<Route path="/home" element={(
				<AuthGuard>
					<Home />
				</AuthGuard>
			)} />
			<Route path="/tasks/:id" element={(
				<AuthGuard>
					<Tasks />
				</AuthGuard>
			)} />
			<Route path="/posts/:id" element={(
				<AuthGuard>
					<Posts />
				</AuthGuard>
			)} />
			<Route path="/" element={<Login />} />
			<Route path="*" element={<Error404 />} />
		</Routes>
	);
};

export default App;