const express = require('express')
// const app = express()
var router = express.Router();

router.get('/api/items', (req, res, next) => 
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
        itemsFiltered = items
     else 
        itemsFiltered = items.filter(item => item.status == filter)
    
    const pager = paginate(itemsFiltered.length, 
                            page, 
                            pageSize, 
                            10, 
                            filter);

    //* get page of items from items array
    if (filter == "all") 
    {
        itemszp = items
    } else {
        itemszp = items.filter(item => item.status == filter)
    }
    const pageOfItems = itemszp.slice(pager.startIndex, pager.endIndex + 1)

    //* return pager object and current page of items
    return res.json({ pager, pageOfItems, filter })
})

module.export = router