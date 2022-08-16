import { Box, Typography, Link, Button } from "@mui/material"
import { FaUser } from 'react-icons/fa'
import { useAuth } from "../hooks/useAuth"

export const Navbar = (props: any) => {
	const { user, logout } = useAuth()

	return (
		<Box
			sx={{
				width: '100vw',
				height: '95px',
				boxShadow: '5px 5px 5px 1px rgba(0, 0, 0, 0.2)',
				marginBottom: '100px'
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'end',
					height: '60%'
				}}
			>
				<Link 
					href='/home' 
					sx={{ 
						textDecoration: 'none', 
						color: 'black', 
						'&:hover': { 
							color: 'black' 
						},
						display: 'flex',
						justifyContent: 'center',
						alignItems: "center",
						gap: '10px'
					}}
				>
					<FaUser style={{ transform: 'scale(1.7)', marginRight: '10px' }} />
					<Box>
						<Typography sx={{ fontWeight: 'bold' }}>Lista de usuários</Typography>
					</Box>
				</Link>
			</Box>
			{user && (
				<Box 
					sx={{
						marginRight: '10px',
					}}
				>
					<Typography textAlign='end'>
						Logado como {user?.name} | 
							<Button 
								variant='text'
								sx={{
									marginLeft: '5px',
									marginBottom: '3px'
								}}
								onClick={logout}
							>
								Deslogar
							</Button>
					</Typography>
				</Box>
			)}
		</Box>
	)
}