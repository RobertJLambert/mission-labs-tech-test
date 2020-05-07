import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component 
{
	constructor(props) 
	{
		super(props)

		this.state = 
		{
			pager: {}, 
			pageOfItems: [], 
			filter : "", 

		}
	}

	componentDidMount() 
	{
		this.loadPage()
		console.log('componentDidMount()')
	}

	componentDidUpdate() 
	{
		this.loadPage()
		console.log('componentDidUpdate()')
	}

	/**
	 * Get a page of items from the api
	*/
	loadPage() 
	{
		const params = new URLSearchParams(location.search)
		const page = parseInt(params.get('page')) || 1
		const filter = String(params.get('filter')) || "all"


		
		console.log('loadPage()')
		console.log(this.state.pager)

		if (page !== this.state.pager.currentPage || filter !== this.state.pager.filter) 
		{
			fetch(`/api/items?page=${page}&filter=${filter}`, { method: 'GET' })
				.then(response => response.json())
				.then(({pager, pageOfItems, filter}) => {
					this.setState({ pager, pageOfItems, filter });
				})

				console.log('fetch(`/api/items?page=')
			}
	}
	
	/**
	 * @param {array} make - Make of shoe
	 * @param {number} i - Item id
	 * @return {string} randomItem - A random item
	 */
	randomiser (make, i)
	{
		var randomItem = make[Math.floor(Math.random()*make.length)]
    return randomItem
	}

	render() 
	{
		const { pager, pageOfItems, filter } = this.state

		return (
			<div id="items" className="card text-center m-3">
				
				{/* 
				 * Filter items by status nav
				*/}
				<nav id="sorts" className="text-right">
					<ul className="legend">
						<li>
							<Link to={{ search: `?page=1&filter=all` }}>
								<span className="status all"></span> View All 
							</Link>
						</li>
						<li>
							<Link to={{ search: `?page=1&filter=ready` }}>
								<span className="status ready"></span> Ready to try 
							</Link>
						</li>
						<li>
							<Link to={{ search: `?page=1&filter=on-the-way`}}>
								<span className="status on-the-way"></span> On the way
							</Link>
						</li>
						<li>
							<Link to={{ search: `?page=1&filter=queued`}}>
								<span className="status queued"></span> In the queue
							</Link>
						</li>
						<li>
							<Link to={{ search: `?page=1&filter=out-of-stock`}}>
								<span className="status out-of-stock"></span> Out of stock
							</Link>
						</li>
					</ul>
				</nav>

				{/* 
				 * Items (i.e. shoesz :) 
				*/}
				<div className="card-body"> 
					{pageOfItems.map(item =>
					<article key={item.id} id={item.id} className="row">
						<div className="inner">
							<div className={`status ${item.status}`} title={`${item.status}`}>
							</div>
							<div className="col img col-2 align-self-center">
								{/* Should be an array of image options */}
								<img src={`./public/images/${item.id}.jpg`}></img>
								{/* <img src="https://source.unsplash.com/100x100/?trainer"></img> */}
							</div>
							<div className="col title align-self-center">
								{item.brand}<br/>
								{item.name}<br/>
								{item.make}<br/>
								{/* {this.randomiser(item.make, item.id)} */}
							</div> 
							<div className="col align-self-center">
								Category : <br/>
								<b>{item.category}</b>
							</div> 
							<div className="col align-self-center">
								Size : <br/>
								<b>{item.size}</b>
							</div>
							<div className="col align-self-center">
								Colour : <br/>
								<b>{item.colour}</b>
							</div>
							<div className="col initials align-self-center">
								<div className="col box align-self-center justify-content-center">
									<b>{item.initials }</b>
								</div>
							</div>
						</div> 
					</article>
					)}
				</div>

				
				{/* 
				 * Pagination 
				*/}
				<nav>

					{/* 
					 * Current page (with next page link) and amount of pages with last page link nav
				 	 */}
					<ul className="pagination right">
							<li className={`page-item prev-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
									<Link to={{ search: `?page=${pager.currentPage - 1}&filter=${filter}` }} className="page-link">
										 Home
									</Link>
							</li>
							<li className={`page-item next-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
									<Link to={{ search: `?page=${pager.currentPage + 1}&filter=${filter}` }} className="page-link">
										{pager.currentPage}
									</Link>
							</li>
							<li className={`page-item last-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
									<Link to={{ search: `?page=${pager.totalPages}&filter=${filter}` }} className="page-link">
										{pager.totalPages}
									</Link>
							</li>
					</ul>

					{/* 
					 * Dotted page number nav
					 */}
					{pager.pages && pager.pages.length && 
							<ul className="pagination">
									{pager.pages.map(page =>
											<li key={page} className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`}>
													<Link to={{ search: `?page=${page}&filter=${filter}` }} className="page-link nav-dots">{}</Link>
											</li>
									)}
							</ul>
					}
		
				</nav>
			</div>
      )
    }
}


export { HomePage };