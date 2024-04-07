const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('"BAN"')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('"USER"')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('"REASON"')
                .setRequired(false)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply({ content: '"UNAUTHORIZED"', ephemeral: true });
        }

        const userToBan = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        const memberToBan = await interaction.guild.members.fetch(userToBan.id).catch(console.error);

        if (!memberToBan.bannable) {
            return interaction.reply({ content: '"UNBANNABLE"', ephemeral: true });
        }

        memberToBan.ban({ reason: reason })
            .then(() => interaction.reply({ content: `${userToBan.username} has been banned for: ${reason}` }))
            .catch(error => {
                console.error(error);
                interaction.reply({ content: '"ERROR"', ephemeral: true });
            });
    },
};
