const express = require('express'); 
const bodyParser=require('body-parser');
const app = express();


const items = [ { id: 1, name: "item1", quantity: 100, category: "electronics" }, { id: 2, name: "item2", quantity: 50, category: "furniture" }, { id: 3, name: "item3", quantity: 200, category: "clothing" } ];

app.use(bodyParser.json()); 

// Liste tous les éléments
app.get('/items', function(req,res){
    res.send(items)
})

// Ajoute un nouvel élément
app.post('/items', function (req, res) {
    const id=req.body.id;
    const name=req.body.name;
    const quantity=req.body.quantity;
    const category=req.body.category;
    
    const newItem =
    { 
        id : id,
        name : name,
        quantity : quantity,
        category: category
    };
    //console.log(body)
    items.push(newItem);
    res.send("sent");
});


// Mise à jour d’un élément
app.put('/items/:id', function (req, res) {
    const id = req.params.index;
   for (let i = 0; i < items.length; i++) { 
        if (items[i].id == id) { 
            items[i].name =  req.body.name || items[i].name
            items[i].category = req.body.category || items[i].category 
            items[i].quantity = req.body.quantity || items[i].quantity
        } 
    }
    res.send('item modifié')
});

// Suppression d'un élément
app.delete('/items/:id', (req, res) => {
    const id = req.params.id
    for (let i = 0; i < items.length; i++) { 
        if (items[i].id == id) { 
            items.splice(i, 1);
        }    
    }
    res.send('Item supprimé')
});

// Lancement du serveur
app.listen(3000, function() {
    console.log("Serveur démarré sur le port 3000");
});