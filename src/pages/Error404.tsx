import { useState, useEffect } from "react";
import { Post, } from "../@types/types";
import { 
	Alert, 
	Avatar, 
	Box, 
	Card, 
	Checkbox, 
	CircularProgress, 
	Link, 
	MenuItem, 
	Pagination, 
	Paper, 
	Stack, 
	TextField, 
	Typography 
} from '@mui/material';
import { Navbar } from "../components/Navbar";

export const Error404 = (props: any) => {
	const queryData = () => {

	}

	useEffect(() => {
		queryData()
	}, []);

	return (
		<Box
			sx={{
				width: '100vw',
				minHeight: '100vh'
			}}
		>
			<Box
				sx={{
					width: '100vw',
					height: '100%',
					display: "flex",
					justifyContent: 'center',
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				
				<Box>
					<Typography>Error 404</Typography>
				</Box>
			</Box>
		</Box>
	);
};