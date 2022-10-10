const express =require ('express');
const app =express()
const apiRoutes = require('./routers/app.routers')
const PORT =process.env.PORT || 8080

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

//Routes
app.use('/api', apiRoutes)


app.get('/', (req,res)=>{
    res.send("Inicio")
})

const connectedServer = app.listen(PORT, ()=>{
    console.log("Server is up and runing on port ", PORT);
})

app.get('*', (req,res)=>{
    res.status(404).send("La pagina no existe")
})