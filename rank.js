const { User, MessageAttachment } = require('discord.js');
const Levels = require('discord-xp')
const { Canvacord, Rank } = require('canvacord')

module.exports = {
    name: `rank`,
    description: `Get the rank of a user`,
    options: [
        {
            name: 'user',
            description: 'User you want to get a rank for',
            type: 'USER',
            required: true,
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
     async execute(interaction) {
        const target = interaction.options.getUser('user')
        const user = await Levels.fetch(target.id, interaction.guild.id, true)
        if(!user) {
            return interaction.reply({content: 'User has no XP', ephemeral: true})
        }

        await interaction.deferReply()

        const rank = new Rank()
        .setAvatar(target.displayAvatarURL({format: 'png'}))
        .setCurrentXP(user.xp)
        .setCustomStatusColor('BLUE')
        .setProgressBar('GREEN')
        .setProgressBarTrack('BLURPLE')
        .setLevel(user.level)
        .setStatus("online", true, 4)
        .setDiscriminator(target.discriminator)
        .setUsername(target.username)
        .setRequiredXP(Levels.xpFor(user.level + 1))
        .setRank(user.position)

        rank.build({fontX: 'arial'})
            .then(data => {
        const attachment = new MessageAttachment(data, "RankCard.png");
        interaction.editReply({ files: [attachment]})
        })
    },
}
