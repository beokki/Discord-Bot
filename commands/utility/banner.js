const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banner')
        .setDescription('"BANNER"')
        .addUserOption(option => option.setName('user').setDescription("USER")),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;

        const fullUser = await interaction.client.users.fetch(user.id, { force: true });
        const bannerURL = fullUser.bannerURL({ dynamic: true, size: 1024 });

        const bannerEmbed = new EmbedBuilder()
            .setColor(0x81A5F9)
            .setTitle(`${user.username}'s Banner`);

            if (bannerURL) {
                bannerEmbed.setImage(bannerURL);
            } else {
                bannerEmbed.setDescription('No banner set.');
            }

        await interaction.reply({ embeds: [bannerEmbed] });
    },
};
