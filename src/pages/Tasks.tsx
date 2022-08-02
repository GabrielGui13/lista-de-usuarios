import { useState, useEffect } from "react";
import { Task, User } from "../@types/types";
import { 
	Alert, 
	Box, 
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
import { MdOutlineExpandMore } from 'react-icons/md'
import { useParams, useSearchParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";


export const Tasks = (props: any) => {
	const params = useParams()
	const [searchParams, setSearchParams] = useSearchParams()

	const id = params.id
	const name = searchParams.get('name')

	const [tasks, setTasks] = useState<Task[]>([]);
	const [count, setCount] = useState(0);
	const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [error, setError] = useState('');

	const queryData = () => {
		fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
			.then((response) => response.json())
			.then((json) => {
				setCount(json.length)
				setTasks(json.slice((page - 1) * limit, ((page - 1) * limit) + limit));
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
				minHeight: '100vh'
			}}
		>
			<Navbar />

			<Box
				sx={{
					width: '100vw',
					display: "flex",
					height: '100%',
					justifyContent: 'center',
					alignItems: "center",
					flexDirection: "column",
				}}
			>	
				<Box>
					<Typography variant="h3" sx={{ marginBottom: '20px', textAlign: 'center' }}>{`Tarefas de ${name}`}</Typography>
					<Box className="card">
						{loading && error.trim() === '' && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}><CircularProgress /></Box>}

						{!loading && error.trim() !== '' && <Alert severity="error">{error}</Alert>}
						
						{!loading && error.trim() === '' && (<Box>
							<Link href={`/posts/${id}?name=${name}`} sx={{ textAlign: 'center', display: 'block', marginBottom: '30px' }}>Posts</Link>
							
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

							<Stack sx={{ width: '500px' }}>
								{tasks.map(task => (
									<Paper sx={{
										display: 'flex',
										justifyItems: 'center',
										alignItems: 'center',
										marginTop: '5px'
									}}>
										<Checkbox defaultChecked={task.completed} />
										<Typography>{task.title}</Typography>
									</Paper>
								))}
							</Stack>

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
		</Box>
	);
};