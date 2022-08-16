import { useState } from "react";
import { 
	Box, 
	Button, 
	Card, 
	InputAdornment, 
	TextField, 
	Typography 
} from '@mui/material';
import { Navbar } from "../components/Navbar";
import { AuthUser } from "../context/AuthContext";
import { AiFillGithub } from 'react-icons/ai'
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Login = (props: any) => {
	const { login, isAuthenticated } = useAuth()
	const [loginData, setLoginData] = useState<AuthUser>({ name: '' })
	const navigate = useNavigate()

	if (isAuthenticated) navigate('/home')

	return (
		<Box
			sx={{
				width: '100vw',
				minHeight: '100vh'
			}}
		>
			<Navbar />

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
				<Card
					sx={{
						minWidth: '300px',
						minHeight: '100px',
						padding: '15px',
					}}
				>
					<Typography sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '15px' }}>Login</Typography>
					<Box>
						<TextField
							fullWidth
							sx={{ outlineColor: 'black' }}
							label='Github'
							placeholder='Insira seu username do github...'
							value={loginData.name}
							onChange={(e) => setLoginData(prev => ({ ...prev, name: e.target.value }))}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<AiFillGithub />
									</InputAdornment>
								),
							}}
						/>
						<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
							<Button 
								variant='contained'
								onClick={() => login(loginData)}
							>
								Login
							</Button>
						</Box>
					</Box>
				</Card>
			</Box>
		</Box>
	);
};