const { CommandInteraction, MessageEmbed } = require('discord.js');
const Levels = require('discord-xp')

module.exports = {
    name: `leaderboard`,
    description: `Get the ranking leaderboard for this guild`,
    /**
     * @param {CommandInteraction} interaction
     */
     async execute(interaction) {
        const lead = await Levels.fetchLeaderboard(interaction.guild.id, 5);
        if (lead.length < 1) return interaction.reply("No leaderboard found");
        const led = await Levels.computeLeaderboard(client, lead, true);
        const lb = led.map(
          (e) =>
            `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${
              e.level
            }\nXP: ${e.xp.toLocaleString()}`
        );

        const embed = new MessageEmbed()
        .setTitle('Leaderboard for this guild')
        .setDescription(`${lb.join("\n")}`)
        .setColor('RANDOM')
        .setAuthor({name: `${guild.name}`, iconURL: 'https://cdn.discordapp.com/emojis/859424401971609600.webp?size=96&quality=lossless'})

        return interaction.reply({embeds: [embed]});
    },
}
