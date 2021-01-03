const Discord = require('discord.js')
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]})
const config = require('./config.json')
const command = require('./command')
const welcome = require('./welcome')


client.on('messageReactionAdd', async (reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();

    if(user.bot) return;
    if(!reaction.message.guild) return;
    
    //let reactemoji = client.emojis.cache.find(emojis => emojis.name === ':white_check_mark:')
    
    if(reaction.message.channel.id === '793423073550401577') {
        
        
        if(reaction.emoji.name === '✅') {
            
            await reaction.message.guild.members.cache.get(user.id).roles.add("793422276862541824")
        }  
    }
})

client.on("message", async message => {
    if(message.content.startsWith(">setup"))
    {
        const setupembed = new Discord.MessageEmbed()
        setupembed.setTitle("Verify To Gain Access To Rest Of The Server")
        setupembed.setDescription("Type ✅ To Verify")
        setupembed.setColor("#fa3802")

        const setupchannel = message.guild.channels.cache.get("793423073550401577")

        let embedsend = await setupchannel.send(setupembed)
        embedsend.react("✅")
    }


})

client.on('ready', () =>{
    console.log('The Bot Is Ready')

    client.user.setActivity('Hello', { type: 'HEARING' })
        .catch(console.error);

    
    welcome(client)

    command(client, 'ban', message => {
        const { member, mentions } = message
        
        const tag = `<@${member.id}>`

        if(
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('BAN_MEMBERS')
        ) {
            const target = mentions.users.first()
            if (target) {
             const targetMember = message.guild.members.cache.get(target.id) 
             targetMember.ban()
            message.channel.send(`${tag} That user has been banned!`)
            } else {
                message.channel.send(`${tag} Please Specify Someone To Ban. `)
            }

        } else {
            message.channel.send(`${tag} You Do Not Have Permission To Use This Command.`)
        }
        })

        command(client, 'kick', message => {
            const { member, mentions } = message
            
            const tag = `<@${member.id}>`
    
            if(
                member.hasPermission('ADMINISTRATOR') ||
                member.hasPermission('KICK_MEMBERS')
            ) {
                const target = mentions.users.first()
                if (target) {
                 const targetMember = message.guild.members.cache.get(target.id) 
                 targetMember.kick()
                message.channel.send(`${tag} That user has been Kicked!`)
                } else {
                    message.channel.send(`${tag} Please Specify Someone To Kick. `)
                }
    
            } else {
                message.channel.send(`${tag} You Do Not Have Permission To Use This Command.`)
            }
            })
    

    command(client, 'ping', message => {
        message.channel.send('Pong!')
    })
})

command(client, 'servers', (message) => {
    client.guilds.cache.forEach((guild) => {
        message.channel.send(
            `${guild.name} has a total of ${guild.memberCount}`
        )
       })
})



 client.login(config.token)