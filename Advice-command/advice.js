const { SlashCommandBuilder, ChatInputCommandInteraction, CommandInteraction, PermissionFlagsBits } = require('discord.js')
const request = require('superagent')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('advice')
    .setDescription('Get the perfect bit of life advice'),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction) {
        request
            .get('http://api.adviceslip.com/advice')
            .end((err, res) => {
                if (!err && res.status === 200) {
                    try {
                        JSON.parse(res.text)
                    } catch (e) {
                        return message.reply(', an api error occurred.');
                    }
                    const advice = JSON.parse(res.text)
                    interaction.reply(advice.slip.advice)
                } else {
                console.error(`REST call failed: ${err}, status code: ${res.status}`)
                }
            });
    }
}
