const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const paginate = require('jw-paginate')
const port = 4000
const pageSize = 4
const numberOfItems = 24

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


/**
 * @param {Array} make - Make of shoe
 * @param {Integer} i - Item id
 */
app.get('/api/items', (req, res, next) => 
{
    //* example array of 150 items to be paged
    const items = [...Array(numberOfItems).keys()].map(i => (
    { 
        id : (i + 1), 
        name : 'Item ' + this.id,
        make : ["Nikess", "Adidas", "Jaguar", "Best trainers in the fworld", "Doggs"],
        category : 'Men|Women',
        size : '9',
        colour : ["Black", "White", "Orange"],
        status : 'ready|on-the-way|queue',  //should be relationalble either to another table of status' or states
    }))
    // const items = [{ id: 1, name: 'Item 1' }]

    // get page from query params or default to first page
    const page = parseInt(req.query.page) || 1;

    // get pager object for specified pages
    const pager = paginate(items.length, page, pageSize);

    // get page of items from items array
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // return pager object and current page of items
    return res.json({ pager, pageOfItems });
})

// start server
app.listen(port, () => console.log('Server listening on port ' + port))
