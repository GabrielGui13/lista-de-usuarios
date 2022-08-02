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
import { useParams, useSearchParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export const Posts = (props: any) => {
	const params = useParams()
	const [searchParams, setSearchParams] = useSearchParams()

	const id = params.id
	const name = searchParams.get('name')

	const [posts, setPosts] = useState<Post[]>([]);
	const [count, setCount] = useState(0);
	const [limit, setLimit] = useState(3);
  const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [error, setError] = useState('');

	const queryData = () => {
		fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
			.then((response) => response.json())
			.then((json) => {
				console.log(json)
				setCount(json.length)
				setPosts(json.slice((page - 1) * limit, ((page - 1) * limit) + limit));
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
					height: '100%',
					display: "flex",
					justifyContent: 'center',
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				
				<Box>
					<Typography variant="h3" sx={{ marginBottom: '20px', textAlign: 'center' }}>{`Posts de ${name}`}</Typography>
					<Box className="card">
						{loading && error.trim() === '' && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}><CircularProgress /></Box>}

						{!loading && error.trim() !== '' && <Alert severity="error">{error}</Alert>}
						
						{!loading && error.trim() === '' && (<Box>
							<Link href={`/tasks/${id}?name=${name}`} sx={{ textAlign: 'center', display: 'block', marginBottom: '30px' }}>Tarefas</Link>
						
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

							<Stack sx={{ maxWidth: '800px', gap: '15px' }}>
								{posts.map(post => (
									<Card
										sx={{
											padding: '15px'
										}}
									>
										<Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
											<Avatar {...stringAvatar(name || '')} />
											<Typography sx={{ fontWeight: 'bold', marginLeft: '15px' }}>{post.title}</Typography>
										</Box>
										<Box>
											<Typography sx={{ marginLeft: '15px', marginTop: '15px' }}>{post.body}</Typography>
										</Box>
									</Card>
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