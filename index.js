

const {MongoClient} = require('mongodb');
const { Collection, Aggregate } = require('mongoose');
const TelegramApi= require('node-telegram-bot-api')
const token = "5545828361:AAFr4JxKlUcsObTCe8XAgA9RlmQ9_6EV7EM"
const bot = new TelegramApi(token, {polling:true})
const uri = "mongodb+srv://aitugan:Aitu123@cluster0.8jzul.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri)
var randomPlayer =''
// const adminOptions =  {
//     reply_markup: JSON.stringify({
//         inline_keyboard:[
//             [{text: "Добавить футболиста", callback_data:'1' }],
//             [{text: "Удалить футболиста", callback_data: '2' }],
//             [{text: "Изменить футболиста", callback_data: '3' }]
//         ]
//     })
// }

const start = () =>{
    bot.on('message', async msg=>{
        
        const text = msg.text
        let input = msg.text.split(" ");
        const chatId =msg.chat.id
        const chatUsername =msg.chat.username
        if(text==='/start'){
            await bot.sendSticker(chatId , 'https://chpic.su/_data/stickers/g/Goal24Live/Goal24Live_001.webp')
            await bot.sendMessage(chatId, `Добро пожаловать в игру "WhoAreYa?". Если хотите начать игру напишите команду /game`)
            
            
            try {
                await client.connect();
                await listDatabases(client)
            } catch(e){
                console.error(e)
        
            }finally{
                await client.close() 
            }
        }
        if(text==='/game'){
            await bot.sendMessage(chatId, 'Правила игры: вы должны найти футболиста по имени до того момента как все критерии будут правильнами')
            const random = client.db("whoareya").collection("players").aggregate([{$sample:{size:1}}])
            .sort({last_review: -1})
            .limit(1)
            const result = await random.toArray()
            randomPlayer=result
            console.log(randomPlayer[{fname}])
            
        }
        if(text==='/admin'){
            await bot.sendMessage(chatId, 'Password:')
            checkPassword()
            
        }
        function onlyLetters(str){
            return /^[A-Za-z]*$/.test(str);
        }
        function onlyNumbers(str){
            return /^[0-9]*$/.test(str);
        }
        if(input[0]==='/addplayer' &&  onlyLetters(input[1]) && onlyLetters(input[2]) &&onlyNumbers(input[3])&&onlyLetters(input[4] &&onlyLetters[5])){
            let text =msg.text
            console.log(text)
            if(input.length!=6){
                return
            }
    
            let firstName = input[1]
            let lastName = input[2]
            let age = input[3]
            let team =input[4]
            let national = input[5]
            const data ={
                id:Date.now(),
                fname:firstName,
                lname:lastName,
                age:age,
                team:team,
                national:national
            }
            const result =  client.db("whoareya").collection("players").insertOne(data)
            console.log(result)
        }
        if(input[0]==='/deleteplayer'){
            if(input.length!=3){
                return
            }
            let text=msg.text
            console.log(text)
            const result =client.db("whoareya").collection("players").deleteOne({fname:input[1],lname:input[2]})
        }
        if(input[0]==='/listplayers'){

        }
        if(input[0]==='/updfname'){
            const filter=await client.db("whoareya").collection("players").findOne({fname:input[1],lname:input[2]})
            const updateDocument = {
                $set: {
                   fname: input[3],
                },
             };
            const result = await client.db("whoareya").collection("players").updateOne(filter, updateDocument);
            if(result){
                console.log(result)
            }
            else {console.log("null")}
        }
        if(input[0]==='/updlname'){
            const filter=await client.db("whoareya").collection("players").findOne({fname:input[1],lname:input[2]})
            const updateDocument = {
                $set: {
                   lname: input[3],
                },
             };
            const result = await client.db("whoareya").collection("players").updateOne(filter, updateDocument);
            if(result){
                console.log(result)
            }
            else {console.log("null")}
        }
        if(input[0]==='/updage'){
            const filter=await client.db("whoareya").collection("players").findOne({fname:input[1],lname:input[2]})
            const updateDocument = {
                $set: {
                   age: input[3],
                },
             };
            const result = await client.db("whoareya").collection("players").updateOne(filter, updateDocument);
            if(result){
                console.log(result)
            }
            else {console.log("null")}
        }
        if(input[0]==='/updteam'){
            const filter=await client.db("whoareya").collection("players").findOne({fname:input[1],lname:input[2]})
            const updateDocument = {
                $set: {
                   team: input[3],
                },
             };
            const result = await client.db("whoareya").collection("players").updateOne(filter, updateDocument);
            if(result){
                console.log(result)
            }
            else {console.log("null")}
        }
        if(input[0]==='/updnational'){
            const filter=await client.db("whoareya").collection("players").findOne({fname:input[1],lname:input[2]})
            const updateDocument = {
                $set: {
                    national: input[3],
                },
             };
            const result = await client.db("whoareya").collection("players").updateOne(filter, updateDocument);
            if(result){
                console.log(result)
            }
            else {console.log("null")}
        }
        if(input[0]==='/findteam'){
            const cursor =  client.db("whoareya").collection("players").find({team:input[1]})
            .sort({last_review: -1})
            .limit(Number.MAX_SAFE_INTEGER)
            const result = await cursor.toArray();
            if(result){
                console.log(result)
            }
        }
        
        async function listDatabases(client){
            const databasesList = await client.db().admin().listDatabases()
            databasesList.databases.forEach(db=> {
                bot.sendMessage(chatId,` ${db.name}`)
                
            });
        }

    
    })
    // bot.on('callback_query', msg =>{
    //     const data = msg.data
    //     const chatId =msg.message.chat.id
    //     if(data==='1'){
    //       bot.sendMessage(chatId, 'Чтобы добавить игрока вы должны написать следущее')
    //       createPlayer(msg)
    //     }
    //     if(data==='2'){
    //         bot.sendMessage(chatId, 'Чтообы удалить игрока напишите имя игрока' )
    //     }
    //     if(data==='3'){
    //         bot.sendMessage(chatId, 'Чтобы изменить игрока напишите имя игрока' )
    //     }
    //     console.log(data)
      
    // })
}

const checkPassword = () => {
    bot.on('message', async pas=>{
        const text =pas.text
        const chatId =pas.chat.id
        if(text==='aitu'){
            await bot.sendMessage(chatId, 'Чтобы создать игрока напишите /addplayer Фамилия, Имя, возраст, команду, гражданство на английском')
            
        }
    }
    )
}

// const checkPlayer =() => {
//     bot.on('message', async player=>{
//         const player =player.text
//         const chatID = player.chat.id
//         if(player=)
//     })
// }
start()

