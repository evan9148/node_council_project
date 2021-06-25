var express = require('express');
const cron = require('node-cron');
var app = express();
var mysql = require('mysql');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

var port = 3000


var knex = require('knex')({
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'Navgurukul123#@!',
      database: 'council_details'
    },
  
});


knex.schema.hasTable("council").then((value) => {
    if (!value){
        return knex.schema.createTable("council" , (table) => {
            table.increments("id").primary(),
            table.string("student_name"),
            table.string("council_post"),
            table.integer("council_start_date")
        }) 
    }
});



// cron.schedule('0 0 1 */3 *', function() {
//     console.log('running a task every 3rd month');
// })


app.post("/create" , (req,res) => {
    knex("council")
        .insert({
            student_name : req.body.student_name,
            council_post : req.body.council_post,
            council_start_date : req.body.council_start_date
        })
        .then(() => {
            // knex.select("*").from("council").then((data)=>{
            //     console.log(data)
            //     res.send(data)
            // })
            console.log("your data have created....!  ")
            res.send("your data have created....!   ")
        }).catch(()=>{
            console.log("ERROR-----------------")
        })
})
  

app.get("/whole_data" , (req,res) => {
    knex()
        .select("*")
        .from("council")
        .then(() => {
            knex.select("*").from("council").then((data) => {
                console.log(data)
                res.send(data)
            })
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
})


app.get("/whole_data/:id", (req,res) => {
    console.log(req.params.id)
    knex()
        .select("*")
        .from("council")
        .where("id",req.params.id)
        .then(() => {
            knex.select("*").from("council").where("id",req.params.id).then((data) => {
                console.log(data)
                res.send(data)
            })
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
})



app.get("/student_name/:student_name", (req,res) => {
    console.log(req.body.student_name)
    knex()
        .select("*")
        .from("council")
        .where("student_name",req.params.student_name)
        .then(() => {
            knex.select("*").from("council").where("student_name",req.params.student_name).then((data) => {
                console.log(data)
                res.send(data)
            })
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
})


app.get("/council_post/:council_post" , (req,res) => {
    console.log(req.params.council_post)
    knex()
        .select("*")
        .from("council")
        .where("council_post",req.params.council_post)
        .then(() => {
            const council_post = req.params.council_post
            console.log(council_post)
            knex.select("*").from("council").where("council_post", council_post).then((data) => {
                console.log(data)
                res.send(data)
            })
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
})


app.get("/starting_date/:council_start_date", (req,res) => {
    console.log(req.body.student_name)
    knex()
        .select("*")
        .from("council")
        .where("council_start_date",req.params.council_start_date)
        .then(() => {
            knex.select("*").from("council").where("council_start_date",req.params.council_start_date).then((data) => {
                console.log(data)
                res.send(data)
            })
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
})


app.put("/update/:id", (req,res) => {
    knex.update({
        "student_name" : req.body.student_name,
        "council_post" : req.body.council_post,
        "council_start_date" : req.body.council_start_date
    })
        .table("council").where("id", req.params.id)
        .then(() => {
            console.log("updated successfully....  ")
            res.send("updated successfully!..   ")
        })
        .catch((reject) => {
            console.log(reject)
            res.send(reject)
        })
})



app.delete("/delete/:id", (req,res) => {
    knex("council")
        where({"id" : req.params.id}).del()
        .then(() => {
            console.log("your data have deleted...  ")
            res.send("your data have deleted!...   ")
        })
        .catch((failed) => {
            console.log(failed)
            res.send(failed)
        })
})


app.listen(port, () =>  {
    console.log(`Express server is listening on port ${port}`);
});