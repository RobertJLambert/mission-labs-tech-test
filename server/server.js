const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
// const paginate = require('./rl-paginate.js')
// const paginate = require('jw-paginate')
const mongoose = require('mongoose')
const User = require('./users')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
const Window = require('window');

const window = new Window();

const div = window.document.createElement('div');
// HTMLDivElement

div instanceof window.HTMLElement
//* Always keep your consts at the top
const port = 4000
const pageSize = 4
const numberOfItems = 24

mongoose.connect('mongodb://localhost/mission-labs', { 
	useNewUrlParser: true, useUnifiedTopology: true 
})

const db = mongoose.connection

db.once('open', async () => 
{
	if (await User.countDocuments().exec() > 0) 
		return

	Promise.all([
		User.create({ name: 'User 1' }),
		User.create({ name: 'User 2' }),
		User.create({ name: 'User 3' }),
		User.create({ name: 'User 4' }),
		User.create({ name: 'User 5' }),
		User.create({ name: 'User 6' }),
		User.create({ name: 'User 7' }),
		User.create({ name: 'User 8' }),
		User.create({ name: 'User 9' }),
		User.create({ name: 'User 10' }),
		User.create({ name: 'User 11' }),
		User.create({ name: 'User 12' })
	]).then(() => console.log('Added Users'))
})

app.get('/api/itemsz',  (req, res) => {
    const customers = [
        {id: 1, make: 'John', lastName: 'Doe'},
        {id: 2, firstName: 'Brad', lastName: 'Traversy'},
        {id: 3, firstName: 'Mary', lastName: 'Swanson'},
    ];

    res.json(customers);
})

app.get('/api/customers', (req, res) => {
    const customers = [
        {id: 1, make: 'John', lastName: 'Doe'},
        {id: 2, firstName: 'Brad', lastName: 'Traversy'},
        {id: 3, firstName: 'Mary', lastName: 'Swanson'},
    ];

    res.json(customers);
});

app.get('/api/items', (req, res, next) => 
{
    //* example array of 150 items to be paged
    // const items = [...Array(numberOfItems).keys()].map(i => (
    // { 
    //     id : (i + 1), 
    //     name : 'Item ' + this.id,
    //     make : ["Nikess", "Adidas", "Jaguar", "Best trainers in the fworld", "Doggs"],
    //     category : 'Men|Women',
    //     size : '9',
    //     colour : ["Black", "White", "Orange"],
    //     status : 'ready|on-the-way|queue',  //should be relationalble either to another table of status' or states
    // }))
    const items = [
        {
            "id":1,
            "brand":"Nike Air",
            "name": "VapourMax ",
            "make":"FlyIt",
            "category":"Men",
            "size":"UK 9",
            "colour":"Black",
            "status":"ready",
            "initials":"JH",
        },
        {
            "id":2,
            "brand":"Adidas",
            "name": "Originalz ",
            "make":"OZOWEEGO",
            "category":"Women",
            "size":"UK 4",
            "colour":"Red/Org",
            "status":"on-the-way",
            "initials":"DJ",
        },
        {
            "id":3,
            "brand":"Nikeeesss",
            "name": "Max 95 ",
            "make":"",
            "category":"Men",
            "size":"UK 11",
            "colour":"Pink",
            "status":"queued",
            "initials":"GMC",
        },
        {
            "id":4,
            "brand":"Doggs ",
            "name": "Subspace",
            "make":"Originalz",
            "category":"Junior",
            "size":"UK 3",
            "colour":"Blue",
            "status":"out-of-stock",
            "initials":"RL",
        },
        {
            "id":5,
            "brand":"Adidas",
            "name": "Originalz ",
            "make":"OZOWEEGO",
            "category":"Women",
            "size":"UK 4",
            "colour":"Red/Org",
            "status":"ready",
            "initials":"RL",
        },
        {
            "id":6,
            "brand":"Nikeeesss",
            "name": "Max 95 ",
            "make":"",
            "category":"Men",
            "size":"UK 11",
            "colour":"Pink",
            "status":"ready",
            "initials":"JH",
        },
        {
            "id":7,
            "brand":"Doggs ",
            "name": "Subspace",
            "make":"Originalz",
            "category":"Junior",
            "size":"UK 30 (Bigfoot)",
            "colour":"Blue",
            "status":"on-the-way",
            "initials":"WTH",
        },
        {
            "id":8,
            "brand":"Nike Air",
            "name": "VapourMax ",
            "make":"FlyIt",
            "category":"Men",
            "size":"UK 9",
            "colour":"Black",
            "status":"ready",
            "initials":"HEY",
        },
        {
            "id":9,
            "brand":"Adidas",
            "name": "Originalz ",
            "make":"OZOWEEGO",
            "category":"Women",
            "size":"UK 4",
            "colour":"Red/Org",
            "status":"out-of-stock",
            "initials":"RLY",
        },
        {
            "id":10,
            "brand":"Doggs ",
            "name": "Subspace",
            "make":"Originalz",
            "category":"Junior",
            "size":"UK 3",
            "colour":"Blue",
            "status":"queued",
            "initials":"MUF",
        },
        {
            "id":11,
            "brand":"Nikeeesss",
            "name": "Max 95 ",
            "make":"",
            "category":"Men",
            "size":"UK 11",
            "colour":"Pink",
            "status":"on-the-way",
            "initials":"END",
        },
        {
            "id":12,
            "brand":"Doggs ",
            "name": "Subspace",
            "make":"Originalz",
            "category":"Junior",
            "size":"UK 3",
            "colour":"Blue",
            "status":"out-of-stock",
            "initials":"RL",
        },
        {
            "id":13,
            "brand":"Adidas",
            "name": "Originalz ",
            "make":"OZOWEEGO",
            "category":"Women",
            "size":"UK 4",
            "colour":"Red/Org",
            "status":"ready",
            "initials":"RL",
        },
        {
            "id":14,
            "brand":"Nikeeesss",
            "name": "Max 95 ",
            "make":"",
            "category":"Men",
            "size":"UK 11",
            "colour":"Pink",
            "status":"ready",
            "initials":"JH",
        },
        {
            "id":15,
            "brand":"Doggs ",
            "name": "Subspace",
            "make":"Originalz",
            "category":"Junior",
            "size":"UK 3",
            "colour":"Blue",
            "status":"on-the-way",
            "initials":"WTH",
        },
        {
            "id":16,
            "brand":"Nike Air",
            "name": "VapourMax ",
            "make":"FlyIt",
            "category":"Men",
            "size":"UK 9",
            "colour":"Black",
            "status":"ready",
            "initials":"HEY",
        },
        {
            "id":17,
            "brand":"Adidas",
            "name": "Originalz ",
            "make":"OZOWEEGO",
            "category":"Women",
            "size":"UK 4",
            "colour":"Red/Org",
            "status":"out-of-stock",
            "initials":"RLY",
        },
        {
            "id":18,
            "brand":"Doggs ",
            "name": "Subspace",
            "make":"Originalz",
            "category":"Junior",
            "size":"UK 3",
            "colour":"Blue",
            "status":"queued",
            "initials":"MUF",
        },
        {
            "id":19,
            "brand":"Nikeeesss",
            "name": "Max 95 ",
            "make":"",
            "category":"Men",
            "size":"UK 11",
            "colour":"Pink",
            "status":"on-the-way",
            "initials":"END",
        },
    ]

   
    //* get page from query params or default to first page
    const page = parseInt(req.query.page) || 1

    const filter = req.query.filter || "ready"
    
    //* get pager object for specified pages 
    if (filter == "all") {
    // pager = paginate(items.filter(item => item.status == filter).length, 
    //                         page, 
    //                         pageSize, 
    //                         10, 
        itemsz = items
    //                         filter);
    } else {
    //  pager = paginate(items.length, 
    //                         page, 
    //                         pageSize, 
    //                         10, 
        itemsz = items.filter(item => item.status == filter)
    //                         filter);
    }
    const pager = paginate(itemsz.length, 
                            page, 
                            pageSize, 
                            10, 
                            filter);

    //* get page of items from items array
     
    if (filter == "all") {
    // pager = paginate(items.filter(item => item.status == filter).length, 
    //                         page, 
    //                         pageSize, 
    //                         10, 
        itemszp = items
    //                         filter);
    } else {
    //  pager = paginate(items.length, 
    //                         page, 
    //                         pageSize, 
    //                         10, 
        itemszp = items.filter(item => item.status == filter)
    //                         filter);
    }
    const pageOfItems = itemszp
                            .slice(pager.startIndex, pager.endIndex + 1)

    // const p = items.filter(item => item.status == filter)

    // console.log(( pageOfItems ))
    console.log('filter : ' + filter )
    
    //* return pager object and current page of items
    return res.json({ pager, pageOfItems, filter })
})


function paginate( totalItems, currentPage, pageSize, maxPages,  filter ) 
{
  // calculate total pages
  let totalPages = Math.ceil(totalItems / pageSize);

    console.log('paginate() filter : ' + filter )
  // ensure current page isn't out of range
  if (currentPage < 1) { 
      currentPage = 1; 
  } else if (currentPage > totalPages) { 
      currentPage = totalPages; 
  }

  var startPage = 1
  var endPage = 10;
  if (totalPages <= maxPages) {
    // total pages less than max so show all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // total pages more than max so calculate start and end pages
    let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1;
      endPage = maxPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      // current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  // calculate start and end item indexes
  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  // create an array of pages to ng-repeat in the pager control

console.log('startPage ' + startPage + ', endPage ' + endPage);
  let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
    //   let pages = Array.from(Array((1 + 1) - 1).keys()).map(i => startPage + i);
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const params = new URLSearchParams(location.search)
    // const page = parseInt(params.get('page')) || 1
    // const filter = urlParams.get('filter')

  // return object with all pager properties required by the view
  return {
    filter: filter, 
    totalItems: totalItems,
    currentPage: currentPage,
    pageSize: pageSize,
    totalPages: totalPages,
    startPage: startPage,
    endPage: endPage,
    startIndex: startIndex,
    endIndex: endIndex,
    pages: pages,
  };
}


function randomiser (make, i)
{
    var randomItem = make[Math.floor(Math.random()*make.length)]
    return randomItem
}

// start server
app.listen(port, () => console.log('Server listening on port ' + port))
