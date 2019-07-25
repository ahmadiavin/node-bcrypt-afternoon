const express = require("express");
const massive = require("massive");
const session = require("express-session");
require("dotenv").config();
const { SESSION_SECRET, CONNECTION_STRING } = process.env;
const authCtrl = require('./controllers/authController')
const treasureCtrl = require('./controllers/treasureController')
const auth = require('./middleware/authMiddleware')



const app = express();
app.use(express.json());
massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db connected')
})


app.use(
    session({
        resave:true,
        saveUninitialized: false,
        secret: SESSION_SECRET
    })
)


app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)
//users only
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure)
app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure)
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureCtrl.getAllTreasure)







app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on ${process.env.SERVER_PORT}`);
});
