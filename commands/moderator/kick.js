const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('"KICK"')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('"USER"')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('"REASON"')
                .setRequired(false)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return interaction.reply({ content: '"UNAUTHORIZED"', ephemeral: true });
        }

        const userToKick = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        const memberToKick = await interaction.guild.members.fetch(userToKick.id).catch(console.error);

        if (!memberToKick.kickable) {
            return interaction.reply({ content: '"UNKICKABLE"', ephemeral: true });
        }

        memberToKick.kick(reason)
            .then(() => interaction.reply({ content: `${userToKick.username} has been kicked for: ${reason}` }))
            .catch(error => {
                console.error(error);
                interaction.reply({ content: '"ERROR"', ephemeral: true });
            });
    },
};
