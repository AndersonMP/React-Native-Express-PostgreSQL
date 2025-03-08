// 1. Importar expres despúes de instalar su dependecia
const express = require('express');
// 2. Setear express
const app = express();
// 3. Declarar Puerto que usaremos
const port = 3000;
// 4. Importar body-parsers después de instalar su dependencia
const bodyParser = require('body-parser');
// 5. Setear body-parser en el middleware para leer el body de una solicitud HTTP
app.use(bodyParser.json());
//6. Usar PostgreSQL
const sql = require('../data/datasource/Postgres')

// Entidad
let laptops = [
    {
        id: 1,
        marca: "Dell",
        procesador: "Intel Core i5",
        memoria: "8 GB",
        disco: "256 GB SSD"
    },
    {
        id: 2,
        marca: "Asus",
        procesador: "Intel Core i9",
        memoria: "32 GB",
        disco: "1 TB"
    },
    {
        id: 3,
        marca: "Acer",
        procesador: "AMD Ryzen 5",
        memoria: "12 GB",
        disco: "512 GB SSD"
    },
    {
        id: 4,
        marca: "MSI",
        procesador: "Intel Core i7",
        memoria: "16 GB",
        disco: "2 TB"
    },
    {
        id: 5,
        marca: "Lenovo",
        procesador: "AMD Ryzen 9",
        memoria: "32 GB",
        disco: "2 TB SSD"
    }
];

// Middleware
app.use("/laptops", (req, res, next) => {
    console.log("Ingresa a middleware");
    console.log("Headers: ", req.headers);
    console.log("Body: ", req.body);
    next();
});

// ==================== CRUD PARA BACKEND (POSTGRESQL) ====================

// Obtener todas las laptops desde PostgreSQL
app.get("/api/laptops", async (req, res) => {
    try {
        const result = await sql.query("SELECT * FROM laptop");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener una laptop por ID desde PostgreSQL
app.get("/api/laptops/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await sql.query("SELECT * FROM laptop WHERE id = $1", [id]);
        if (result.rows.length) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: "Laptop no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear una nueva laptop en PostgreSQL
app.post("/api/laptops", async (req, res) => {
    const { marca, procesador, memoria, disco } = req.body;
    console.log(req.body);
    try {
        const result = await sql.query(
            "INSERT INTO laptop (marca, procesador, memoria, disco) VALUES ($1, $2, $3, $4) RETURNING *",
            [marca, procesador, memoria, disco]
        );
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
        
    }
});

// Actualizar una laptop en PostgreSQL
app.put("/api/laptops/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { marca, procesador, memoria, disco } = req.body;
    try {
        const result = await sql.query(
            "UPDATE laptop SET marca = $1, procesador = $2, memoria = $3, disco = $4 WHERE id = $5 RETURNING *",
            [marca, procesador, memoria, disco, id]
        );
        if (result.rows.length) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: "Laptop no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una laptop en PostgreSQL
app.delete("/api/laptops/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await sql.query("DELETE FROM laptop WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length) {
            res.json({ message: "Laptop eliminada correctamente" });
        } else {
            res.status(404).json({ message: "Laptop no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== CRUD PARA FRONTEND (MODO MEMORIA) ====================

// GET
// Obtener todos los laptops
app.get("/laptops", (req, res) => {
    res.json(laptops);
});

//GET
// Obtener un laptop por ID
app.get("/laptops/:idParam", (req, res) => {
    const id = parseInt(req.params.idParam); // Obtner el de params y parsearlo a int
    //Con find buscamos si el elemento existe devuelve true o false
    const laptop = laptops.find(l => l.id === id); // Luego devuelve un elemento del array si existe, sino undefined

    // Status visible desde POSTMAN 
    // Si existe respondemos con el objeto encontrado en formato JSON
    if (laptop) {
        res.json(laptop);
    } else {
        res.status(404).send({ message: "Laptop no encontrada" }); // Si no existe respondemos con status 404 not found y un message
    }
});

// POST
// Crear un nuevo laptop
app.post("/laptops", (req, res) => {
    const newLaptop = req.body; // Recuperamos lo que se encuentra en el body de la petició POST
    // Asignaremos un id basado en el último elemento de la lista
    // 1. Verifica si el array tiene elementos
    // 2. Si el array no está vació obtiene el último elemento del array
    // 3. Se obtiene el último id de ese elemento y se suma 1 
    // 4. si no existe elementos entonces el id será 1
    newLaptop.id = laptops.length ? laptops[laptops.length - 1].id + 1 : 1;
    // Dinámicamente guardamos ese elemento en el array con su nuevo id
    laptops.push(newLaptop);
    // Respondemos con un código de estado 201 (Created) y enviamos el objeto newLaptop al cliente en formato JSON.
    res.status(201).json(newLaptop);
});

// PUT
// Actualizar un laptop por ID
app.put("/laptops/:idParam", (req, res) => {
    const id = parseInt(req.params.idParam); // Recuperamos el id de params y lo parseamos a int
    // Buscamos el índice del elemento en el array cuyo id coincide con el valor dado
    // Si se encuentra, devuelve el índice; si no, devuelve -1
    const index = laptops.findIndex(l => l.id === id);

    // Si se encontró entonces continuamos
    if (index !== -1) {
        // Actualizamos el elemento en la posición index del array laptops
        // 1. Mantenemos las propiedades originales del objeto actual (laptops[index])
        // 2. Sobrescribimos esas propiedades con los datos enviados en req.body
        // 3. Garantizamos que el id no cambie al asignarlo explícitamente
        laptops[index] = { ...laptops[index], ...req.body, id };
        // Respondemos al cliente devolviendo el elemento modificado
        res.json(laptops[index]);
    } else {
        // Status visible desde POSTMAN
        // Caso contrario respondemos con status 404 Not Found y un mensaje
        res.status(404).send({ message: "Laptop no encontrada" });
    }
});

// DELETE
// Eliminar un laptop por ID
app.delete("/laptops/:idParam", (req, res) => {
    const id = parseInt(req.params.idParam); // Recuperamos el id de params y lo parseamos a int
    // Buscamos el índice del elemento en el array cuyo id coincide con el valor dado
    // Si se encuentra, devuelve el índice; si no, devuelve -1
    const index = laptops.findIndex(l => l.id === id);

    // Si se encontró un elemento continuamos
    if (index !== -1) {
        // Eliminamos un elemento del array laptops usando splice
        // 1. El primer argumento (index) indica la posición del elemento a eliminar
        // 2. El segundo argumento (1) especifica que se eliminará un solo elemento
        // 3. Modifica el array original eliminando el elemento en la posición dada
        laptops.splice(index, 1);
        res.status(200).json({
            message: `Laptop eliminada correctamente.`
        });
    } else {
        // Status visible desde POSTMAN
        // Caso contrario respondemos con status 404 Not Found y un mensaje
        res.status(404).send({ message: "Laptop no encontrada" });
    }
});

// Listener
app.listen(port, () => {
    console.log(`Servicio iniciado en el puerto ${port}`);
});
