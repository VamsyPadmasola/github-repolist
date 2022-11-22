import './App.css';
import React, { useEffect, useState } from 'react';
import { Loader } from './components/Loader';
import { UserDetails } from './components/UserDetails';
import { RepoCard } from './components/RepoCard';
import { NotFound } from './components/NotFound';
import { BsSearch } from 'react-icons/bs'
import ReactPaginate from "react-paginate"

function App() {

	const [userName, setUserName] = useState("")
	const [userDetails, setUserDetails] = useState([])
	const [itemCount, setItemCount] = useState(0);
	const [items, setItems] = useState([])
	const [showLoader, setShowLoader] = useState(false)
	const [notFound, setNotFound] = useState(false)

	const handleChange = ({ target }) => {
		const { name, value } = target;

		if (name === 'user')
			setUserName(value)
	};

	const setDetails = (data) => {
		const { message } = data
		if (message) {
			setDetails("")
			setItems([])
			console.log(message)
			setShowLoader(false)
			return setNotFound(true)
		}
		setNotFound(false)
		setUserDetails(data)
		setItemCount(data.public_repos)
	}

	const setRepos = async (data) => {
		const { message } = data
		if (message) {
			setItems([])
			console.log(message)
			setShowLoader(false)
			return setNotFound(true)
		}
		setNotFound(false)
		setItems(data)
		console.log(items)
		setShowLoader(false)
	}


	const handleSubmit = async (e) => {
		e.preventDefault();
		setShowLoader(true)
		setUserName(e.target[0].value)
		const { res } = await getUserDetails()
		await setDetails(res)

		const { data } = await fetchRepos(1)
		await setRepos(data)

		// if (items.length === 0)
		// 	return setNotFound(true)
		// else
		// 	return setNotFound(false)
	}

	const getUserDetails = async () => {
		try {
			const result = await fetch(`https://api.github.com/users/${userName}`, {
				headers: {
					'Authorization': 'token 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',
				}
			})
			const data = await result.json()
			return { res: data }
		} catch (error) {
			console.log("11")
			return { err: error.message || error };
		}
	}

	const fetchRepos = async (pageNo) => {
		try {
			const results = await fetch(`https://api.github.com/users/${userName}/repos?page=${pageNo}&
			per_page=10&sort=updated`, {
				headers: {
					'Authorization': 'token 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',
				}
			})
			const data = await results.json()
			return { data: data }
		} catch (error) {
			return { error: error.message || error };
		}

	}


	const handlePageClick = async (page) => {
		setShowLoader(true)
		// setShowLoader(true)
		const res = await fetchRepos(page.selected + 1)
		console.log(res)
		const { data } = res
		await setRepos(data)
	}

	useEffect(() => {
	}, [])

	return (

		<div className=''>
			<div className='flex '>
				<div className='w-full bg-[#3e89cc] p-3 flex items-center justify-between'>
					<span className='text-white text-2xl font-bold'>Github Repository Listing</span>
					<form onSubmit={handleSubmit} className="">
						<div className='flex items-center justify-center border-2 border-[#FFFFFF] p-1 rounded-full '>
							<input className='w-96 p-1 outline-none bg-transparent text-white placeholder-white'
								type={"text"}
								name={"user"}
								value={userName}
								onChange={handleChange}
								placeholder={"Enter username to search..."}
								autoComplete={"off"}
							/>
							<BsSearch size={25} color={"#ffffff"} className="mr-3" />

						</div>
					</form>
				</div>
			</div>
			{

				<div className='mx-auto h-[90vh] overflow-auto'>
					{
						(userDetails.length !== 0) &&
						<UserDetails {...userDetails} />
					}

					{
						(items.length !== 0) &&
						<div className='p-4 ml-20 mr-20'>
							<div className='grid grid-cols-2 gap-x-16 gap-y-4 overflow-auto'>
								{
									items.map((item) => (
										<RepoCard key={item.id} {...item} />
									))
								}
							</div>
						</div>

					}
					{
						(itemCount > 0) &&
						<ReactPaginate
							previousLabel={"<<"}
							nextLabel={">>"}
							breakLabel={"..."}
							pageCount={itemCount / 10}
							marginPagesDisplayed={2}
							pageRangeDisplayed={3}
							onPageChange={handlePageClick}
							containerClassName={"pagination justify-content-center"}
							pageClassName={"page-item"}
							pageLinkClassName={"page-link"}
							previousLinkClassName={"page-link"}
							previousClassName={"page-item"}
							nextLinkClassName={"page-link"}
							nextClassName={"page-item"}
							breakClassName={"page-item"}
							breakLinkClassName={"page-link"}
							activeClassName={"active"}
						/>
					}

				</div>
			}
			{
				notFound &&
				<>
					<NotFound />
				</>
			}
			{
				showLoader &&
				<Loader />
			}
		</div >
	)

}

export default App;
