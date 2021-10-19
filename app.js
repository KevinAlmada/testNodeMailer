let nodemailer = require('nodemailer')
let express = require('express')
let app = express()
let path = require('path')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.get("/send-email",(req,res)=>{res.sendFile(path.join(__dirname,"./send.html"))})
app.post("/send-email",(req,res)=>{
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'titus.medhurst@ethereal.email',
            pass: 'q1GNE1ZfH9brHGq8kU'
        }
    });
    var mailOptions = {
        from:req.body.from,
        to:req.body.mail,
        subject:req.body.asunto,
        text:req.body.mensaje + req.body.email
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if (error) {
            res.status(500).send(error.message)
        }else{
            console.log("email enviado")
            res.status(200).json(req.body)
        }
    }) 
})

app.listen(3000,()=>{
    console.log("Servidor en puerto 3000")
})