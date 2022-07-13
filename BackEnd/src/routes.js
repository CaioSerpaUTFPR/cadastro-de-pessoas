// const app = requerie('./index');

// app.get('/',async (req,res)=>{
//     try{   
//         let data;
//         data = await db.query(`
//                                 SELECT 
//                                     * 
//                                 FROM
//                                     person
//                                     LEFT JOIN person_tel on person_tel.fk_person = person.pk_person`);
//         console.log(data);
//         return res.json(data.rows);
//     }
//     catch(e){
//         res.status(500).json(e.message);
//     }
// })

// app.get('/:id',async (req,res)=>{
//     try{
//         let data;
//         data = await db.query("SELECT * FROM person WHERE pk_person = $1",[req.params.id]);
//         console.log(data);
//         return res.json(data.rows);
//     }
//     catch(e){
//         res.status(500).json(e.message);
//     }
// })

// // app.get('/:id',async (req,res)=>{
// //     try{
// //         const db = new Client(db_config);
// //         await db.connect();
// //         let data;
// //         data = await db.query("SELECT * FROM person_tel WHERE fk_peron = $1",[req.params.id]);
// //         console.log(data);
// //         return res.json(data.rows);
// //     }
// //     catch(e){
// //         res.status(500).json(e.message);
// //     }
// // })

// app.post('/', async (req,res)=>{
//     try{
//         const {person_name, encrypt_pass, person_login, person_type, cpf_cnpj, rg_stateinsc} = req.body;
//         let data;
//         data = await db.query('INSERT INTO person(person_name, encrypt_pass, person_login, person_type, cpf_cnpj, rg_stateinsc) VALUES ($1, $2, $3, $4, $5, $6);',[person_name, encrypt_pass, person_login, person_type, cpf_cnpj, rg_stateinsc])
//         console.log(data);
//         return res.json(data.rows);
//     }
//     catch(e){
//         res.status(500).json(e.message);
//     }
// })

// app.put('/:id', async (req,res)=>{
//     try{
//         const id = req.params.id;
//         const {person_name, encrypt_pass, person_login, person_type, cpf_cnpj, rg_stateinsc} = req.body;
//         let data;
//         data = await db.query('UPDATE person SET person_name = $1, encrypt_pass = $2, person_login = $3, person_type = $4, cpf_cnpj = $5, rg_stateinsc = $6 WHERE pk_person = $7;',[person_name, encrypt_pass, person_login, person_type, cpf_cnpj, rg_stateinsc, id])
//         console.log(data);
//         return res.json(data.rows);
//     }
//     catch(e){
//         res.status(500).json(e.message);
//     }
// })

// app.delete('/:id',async (req,res)=>{
//     try{
//         let data;
//         data = await db.query("DELETE FROM person WHERE pk_person = $1",[req.params.id]);
//         console.log(data);
//         return res.json(data.rows);
//     }
//     catch(e){
//         res.status(500).json(e.message);
//     }
// })
