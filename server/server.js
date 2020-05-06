const express = require('express')
const app = express()
const router = express.Router();
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes/api/items.js')
const paginate = require('./rl-paginate.js')
const Window = require('window')
const window = new Window()
const mongoose = require('mongoose')
const User = require('./users')
const Items = require('./items-model')

const port = 4000
const pageSize = 4
const numberOfItems = 24

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())




//* Mongoose talks to Mongo DB
mongoose.connect('mongodb://localhost/mission-labs', 
{ 
	useNewUrlParser: true, 
	useUnifiedTopology: true 
})
.then(() => console.log('Mongoose Connectedd !! '))

const db = mongoose.connection

db.once('open', async () => 
{
	if (await Items.countDocuments().exec() > 0) 
		return

	Promise.all([
		Item.create({ make: 'Item 1' }),
		Item.create({ make: 'Item 2' }),
		Item.create({ make: 'Item 3' }),
		Item.create({ make: 'Item 4' }),
		Item.create({ make: 'Item 5' }),
		Item.create({ make: 'Item 6' }),
		Item.create({ make: 'Item 7' }),
	])
	.then(() => console.log('Added Items'))
})

// db.once('open', async () => 
// {
// 	if (await User.countDocuments().exec() > 0) 
// 		return

// 	Promise.all([
// 		User.create({ name: 'User 1' }),
// 		User.create({ name: 'User 2' }),
// 		User.create({ name: 'User 3' }),
// 		User.create({ name: 'User 4' }),
// 		User.create({ name: 'User 5' }),
// 		User.create({ name: 'User 6' }),
// 		User.create({ name: 'User 7' }),
// 		User.create({ name: 'User 8' }),
// 		User.create({ name: 'User 9' }),
// 		User.create({ name: 'User 10' }),
// 		User.create({ name: 'User 11' }),
// 		User.create({ name: 'User 12' })
// 	])
// 	.then(() => console.log('Added Users'))
// })




// GET home page.
app.get('/', function(req, res) 
{
	res.redirect('/?page=1&filter=all')
})


// var items = require('./routes/api/items')
// app.use('/api/items', items)
app.get('/api/items', (req, res, next) => 
{
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
				"brand":"Super",
				"name": "Trainer ",
				"make":"official",
				"category":"Men",
				"size":"MASSIVE",
				"colour":"Chinese",
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
		if (filter == "all") 
		{
				itemsFiltered = items
		} 
		else 
		{
				itemsFiltered = items.filter(item => item.status == filter)
		}
		
		const pager = paginate(itemsFiltered.length, page, pageSize,	10, filter);

		//* get page of items from items array
		const pageOfItems = itemsFiltered.slice(pager.startIndex, pager.endIndex + 1)

		//* return pager object and current page of items
		return res.json({ pager, pageOfItems, filter })
})


//* Add item API
app.post('/api/items', (req, res) => 
{
	// super(items)
	var brand = req.body.brand

	items.push[brand]
	console.log(items)

	res.send(brand + " ")
})


//* start server
app.listen(port, () => console.log('Server listening on http://localhost:' + port))
console.log('Serving on http://localhost:8080/?page=1&filter=all')
