const { CommandInteraction, MessageEmbed } = require('discord.js');
const Levels = require('discord-xp')

module.exports = {
    name: `xp`,
    description: `Add or remove XP from a user`,
    permissions: 'ADMINISTRATOR',
    options: [
        {
            name: 'target',
            description: 'User you wish to add/remove XP from',
            type: 'USER',
            required: true
        },
        {
            name: 'choices',
            description: 'Choose to add or remove XP from a user',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'add',
                    value: 'add'
                },
                {
                    name: 'remove',
                    value: 'remove'
                },
                {
                    name: 'leveladd',
                    value: 'leveladd'
                },
                {
                    name: 'levelremove',
                    value: 'levelremove'
                }
            ]
        },
        {
            name: 'amount',
            description: 'Amount of XP you wish to add/remove from a user',
            type: 'NUMBER',
            required: true,
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
     execute(interaction) {
        const { options } = interaction
        const choices = options.getString('options')
        const target = options.getUser('target')
        const amount = options.getNumber('amount')

        switch(choices) {
            case 'add' : {
                Levels.appendXp(target.id, interaction.guildId, amount)
                const embed = new MessageEmbed().setTitle(`Added ${amount} XP to ${target.tag}`).setColor('DARK_BUT_NOT_BLACK')

                interaction.reply({embeds: [embed]})
            }
            break;
            case 'remove' : {
                Levels.subtractXp(target.id, interaction.guild.id, amount)
                const embed = new MessageEmbed().setTitle(`Added ${amount} XP to ${target.tag}`).setColor('DARK_BUT_NOT_BLACK')

                interaction.reply({embeds: [embed]})
            }
            break;
            case 'leveladd' : {
                Levels.appendLevel(target.id, interaction.guild.id, amount)
                const embed = new MessageEmbed().setTitle(`Added ${amount} Levels to ${target.tag}`).setColor('DARK_BUT_NOT_BLACK')

                interaction.reply({embeds: [embed]})
            }
            break;
            case 'levelremove' : {
                Levels.subtractLevel(target.id, interaction.guild.id, amount)
                const embed = new MessageEmbed().setTitle(`Removed ${amount} Levels from ${target.tag}`).setColor('DARK_BUT_NOT_BLACK')

                interaction.reply({embeds: [embed]})
            }
            break;
        }
    },
}
