Discord = require('discord.js')
module.exports = client => {
    const channelId = client.channels.cache.get('793428940467339274')

    client.on('guildMemberAdd', member => {
        console.log(member)

        const embed = new Discord.MessageEmbed()
.setDescription(`Welcome <@${member.id}> to Anime World Please Go to <#793423073550401577> And to <#793429222718177301>!`)
.setImage('https://cdn.discordapp.com/attachments/787329536919994369/794644993817051146/dbkt4a0-6b86cc48-45f2-41f3-82cf-c98df7bbf390.jpg')
.setColor("#42f5e9")       
        const channel = member.guild.channels.cache.get('793428940467339274')
        channel.send(embed)
    })
}