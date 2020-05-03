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
            pageOfItems: []
        };
    }

	componentDidMount() 
	{
		this.loadPage()
	}

	componentDidUpdate() 
	{
		this.loadPage()
    }

	loadPage() 
	{
        // get page of items from api
        const params = new URLSearchParams(location.search)
        const page = parseInt(params.get('page')) || 1
		if (page !== this.state.pager.currentPage) 
		{
            fetch(`/api/items?page=${page}`, { method: 'GET' })
                .then(response => response.json())
                .then(({pager, pageOfItems}) => {
                    this.setState({ pager, pageOfItems });
                })
        }
	}
	
	/**
	 * @param {Array} make - Make of shoe
	 * @param {Integer} i - Item id
	 * @return {String} randomItem - A random item
	 */
	randomiser (make, i)
	{
		var randomItem = make[Math.floor(Math.random()*make.length)]
        return randomItem
	}

    render() {
        const { pager, pageOfItems } = this.state;
        return (
            <div id="items" className="card text-center m-3">
                <div className="card-body"> 
					{pageOfItems.map(item =>
					<div key={item.id} id={item.id} className="row">
							<div className="inner">
							<div className="status">
									
							</div>
							<div className="col">
								<img src="https://source.unsplash.com/100x60/?trainer"></img>
							</div>
							<div className="col">
								{this.randomiser(item.make, item.id)}
								<br/>
							</div> 
							<div className="col">
								{item.category}
							</div> 
							<div className="col">
								{item.size}
							</div>
							<div className="col">
								{this.randomiser(item.colour, item.id)}
							</div>
						</div> 
					</div>
                    )}
                </div>

                <div className="card-footer pb-0 pt-3">
                    <ul className="pagination right">
                        <li className={`page-item next-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                            <Link to={{ search: `?page=${pager.currentPage + 1}` }} className="page-link">{pager.currentPage + " "}</Link>
                        </li>
                        <li className={`page-item last-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                            <Link to={{ search: `?page=${pager.totalPages}` }} className="page-link">{pager.totalPages}</Link>
                        </li>
                    </ul>
                    {pager.pages && pager.pages.length &&
                        <ul className="pagination">
                            {pager.pages.map(page =>
                                <li key={page} className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`}>
                                    <Link to={{ search: `?page=${page}` }} className="page-link nav-dots">{}</Link>
                                </li>
                            )}
                        </ul>
                    }           
                </div>
            </div>
        );
    }
}

export { HomePage };