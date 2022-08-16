import { Box, Typography, Link } from "@mui/material"
import { FaUser } from 'react-icons/fa'
import { useAuth } from "../hooks/useAuth"

export const Navbar = (props: any) => {
	const { user } = useAuth()

	console.log(user)

	return (
		<Box
			sx={{
				width: '100vw',
				height: '80px',
				boxShadow: '5px 5px 5px 1px rgba(0, 0, 0, 0.2)',
				marginBottom: '100px',
				display: 'flex',
        justifyContent: 'center',
				alignItems: "center",
			}}
		>
			<Link 
				href='/' 
				sx={{ 
					textDecoration: 'none', 
					color: 'black', 
					'&:hover': { 
						color: 'black' 
					},
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: "center",
					gap: '10px'
				}}
			>
				<FaUser style={{ transform: 'scale(1.7)' }} />
				<Box>
					<Typography sx={{ fontWeight: 'bold' }}>Lista de usuários</Typography>
				</Box>
			</Link>
		</Box>
	)
}