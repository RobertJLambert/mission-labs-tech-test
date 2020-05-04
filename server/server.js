const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const paginate = require('jw-paginate')
const mongoose = require('mongoose')
const User = require('./users')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

//* Always keep your consts at the top
const port = 4000
const pageSize = 3
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
            "initials":"GMGC",
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
            "size":"UK 3",
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
            "size":"UK 3",
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
    ]

   
    // get page from query params or default to first page
    const page = parseInt(req.query.page) || 1;

    // get pager object for specified pages
    const pager = paginate(items.length, page, pageSize);

    // get page of items from items array
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // return pager object and current page of items
    return res.json({ pager, pageOfItems });
})

function randomiser (make, i)
{
    var randomItem = make[Math.floor(Math.random()*make.length)]
    return randomItem
}

// start server
app.listen(port, () => console.log('Server listening on port ' + port))
