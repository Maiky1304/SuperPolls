const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

module.exports = {
    async: true,
    name: 'raw',
        async execute(client, event) {
            // `event.t` is the raw event name
        if (!events.hasOwnProperty(event.t)) return;

        const { d: data } = event;
        const user = client.users.fetch(data.user_id);
        const channel = client.channels.fetch(data.channel_id) || await user.createDM();

        // if the message is already in the cache, don't re-emit the event
        channel.then(async t => {
            if (t.messages.cache.has(data.message_id)) return;

            // if you're on the master/v12 branch, use `channel.messages.fetch()`
            const message = await t.messages.fetch(data.message_id);

            // custom emojis reactions are keyed in a `name:ID` format, while unicode emojis are keyed by names
            // if you're on the master/v12 branch, custom emojis reactions are keyed by their ID
            const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
            const reaction = message.reactions.resolve(emojiKey);

            client.emit(events[event.t], reaction, user);
        });
    }
};