import { useState, useEffect } from "react";
import { User } from "./@types/types";
import { 
	Accordion, 
	AccordionDetails, 
	AccordionSummary, 
	Alert, 
	Box, 
	CircularProgress, 
	MenuItem, 
	Pagination, 
	TextField, 
	Typography 
} from '@mui/material';
import { MdOutlineExpandLess } from 'react-icons/md'


const App = (props: any) => {
	const [users, setUsers] = useState<User[]>([]);
	const [count, setCount] = useState(0);
	const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [error, setError] = useState('');

	const queryData = () => {
		fetch("https://jsonplaceholder.typicode.com/users/")
			.then((response) => response.json())
			.then((json) => {
				setCount(json.length)
				setUsers(json.slice((page - 1) * limit, ((page - 1) * limit) + limit));
				setLoading(false);
			})
			.catch(e => {
				setError(e.message)
			})
	}

	useEffect(() => {
		queryData()
	}, [page, limit]);

	return (
		<Box
			sx={{
				width: '100vw',
				display: "flex",
        justifyContent: 'center',
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<Box>
				<Typography variant="h3" sx={{ marginBottom: '20px', textAlign: 'center' }}>Lista de usuários</Typography>
				<Box className="card">
					{loading && error.trim() === '' && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}><CircularProgress /></Box>}

					{!loading && error.trim() !== '' && <Alert severity="error">{error}</Alert>}
					
					{!loading && error.trim() === '' && (<Box>
						<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: '20px'}}>
							<TextField
								select
								value={limit}
								label="Limite"
								onChange={(e) => setLimit(Number(e.target.value))}
							>
								<MenuItem value={1}>1</MenuItem>
								<MenuItem value={2}>2</MenuItem>
								<MenuItem value={3}>3</MenuItem>
								<MenuItem value={4}>4</MenuItem>
								<MenuItem value={5}>5</MenuItem>
								<MenuItem value={6}>6</MenuItem>
								<MenuItem value={7}>7</MenuItem>
								<MenuItem value={8}>8</MenuItem>
								<MenuItem value={9}>9</MenuItem>
								<MenuItem value={10}>10</MenuItem>
							</TextField>
						</Box>
						{users.map(user => (
							<>
								<Accordion key={user.id}>
									<AccordionSummary
										expandIcon={<MdOutlineExpandLess />}
									>
										<Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
											{`${user.name} (${user.username})`}
										</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Box>
											<Typography sx={{ fontWeight: 'bold' }}>Dados do usuário:</Typography>
											<Typography>Nome: {user.name}</Typography>
											<Typography>Apelido: {user.username}</Typography>
											<Typography>Email: {user.email}</Typography>
											<Typography>Site: {user.website}</Typography>
											<Typography>Telefone: {user.phone}</Typography>
										</Box>
										<Box>
											<Typography sx={{ fontWeight: 'bold', marginTop: '10px' }}>Endereço:</Typography>
											<Typography>Cidade: {user.address.city}</Typography>
											<Typography>Rua: {user.address.street}</Typography>
											<Typography>Escritório: {user.address.suite}</Typography>
											<Typography>Código postal: {user.address.zipcode}</Typography>
											<Typography>Geolocalização: {`${user.address.geo.lat} ${user.address.geo.lng}`}</Typography>
										</Box>
										<Box>
											<Typography sx={{ fontWeight: 'bold', marginTop: '10px' }}>Empresa:</Typography>
											<Typography>Razão social: {user.company.name}</Typography>
											<Typography>Ramo: {user.company.bs}</Typography>
											<Typography>Slogan: {user.company.catchPhrase}</Typography>
										</Box>
									</AccordionDetails>
								</Accordion>
							</>
						))}
						<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
							<Pagination 
								count={Math.ceil(count / limit)}
								onChange={(e, value) => setPage(value)}
								page={page}
							/>
						</Box>
					</Box>)}
				</Box>
			</Box>
		</Box>
	);
};

export default App;