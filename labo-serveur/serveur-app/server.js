const bodyParser = require('body-parser');
const express = require('express');
const app=express();
app.use(bodyParser.json());

app.listen(3000,()=>{
    console.log('Server listening on port 3000');
});

app.get("/",(req,res)=>{
  console.log(req.header("Institut"));
  res.set("Ville","Montréal");
  res.send("Reponse envoyé au serveur");
})

const produits = [
    {
      id: 1,
      nom: "Chaise ergonomique",
      prix: 199.99,
      description: "Une chaise ergonomique confortable pour le bureau."
    },
    {
      id: 2,
      nom: "Lampe de bureau LED",
      prix: 49.99,
      description: "Une lampe de bureau LED avec luminosité réglable."
    }
  ];

 app.get('/produits',(request,response)=>{
        console.log(request.header("x-request-description"));
        response.set("x-response-description","Affichage des produits");
        response.status(200).send(produits);
 });

 app.get('/produits/:id',(request,response)=>{
        console.log(request.header("x-request-description"));
        const id=request.params.id;
        for(i=0;i<produits.length;i++){
            if(produits[i].id==id)
            {
                response.status(200).send(produits[i]);
            }
        }
        if(id>=produits.length)
        {
          response.status(404).send("Produit non trouvé");
        }

        response.set("x-response-description","Affichage d'un produit");
 });

 app.post('/produits',(request,response)=>{
  console.log(request.header("x-request-description"));
    const id=request.body.id;
    const nom=request.body.nom;
    const prix=request.body.prix;
    const description=request.body.description;
    
    const newProduit =
    { 
        id : id,
        nom : nom,
        prix : prix,
        description: description
    };
    //console.log(body)
    if(id==null || nom==null || prix==null||description==null)
    {
      response.status(400).send("ressource incorrect");
    }
    else
    {
      produits.push(newProduit);
      response.set("x-response-description","Ajout d'un produit");
      response.status(201).send("sent");
    }
   
 });

 app.put('/produits/:id', (request, response) => {
   console.log(request.header("x-request-description"));
    const id  = request.params.id;

    if(request.body.prix==null && request.body.nom==null && request.body.description==null){
      response.status(400).send("Produit non trouvé");
    }
    if(id>=produits.length)
      {
        response.status(404).send("Produit non trouvé")
      }
    for(i=0;i<produits.length;i++){
        if(produits[i].id==id)
        {
          produits[i].prix=request.body.prix || produits[i].prix
          produits[i].nom=request.body.nom || produits[i].nom
          produits[i].description=request.body.description || produits[i].description
        }
    }
    response.set("x-response-description","modification d'un produit");
    response.status(200).send("produit modifié avec succès")
});

app.delete('/produits',(request,response)=>{
  console.log(request.header("x-request-description"));
  produits.length=0
  response.set("x-response-description","suppression des produits");
  response.status(204).send("Produits supprimés")
}) 

app.delete('/produits/:id',(request,response)=>{
  console.log(request.header("x-request-description"));
  const id= request.params.id
  
    for(i=0;i<produits.length;i++)
      {
      if(produits[i].id==id)
      {
        produits.splice(i,1);
      }
    response.set("x-response-description","suppression d'un produit");
    response.status(204).send("Produit supprimé")
  }
  if(id>=produits.length)
  {
    response.status(404).send("Produit non trouvé")
  }
 
})

