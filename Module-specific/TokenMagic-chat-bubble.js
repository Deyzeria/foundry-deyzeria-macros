let chatBubbleFilterId = "chatBubble";

let polymorphFunc = async function () {
for (const token of canvas.tokens.controlled) {
	let params;
	if (token.TMFXhasFilterId(chatBubbleFilterId)) {
		await TokenMagic.deleteFiltersOnSelected();
	} else {
		params =
		[{
			filterType: "sprite",
			filterId: chatBubbleFilterId,
			imagePath: "Token/talk.png",
			gridPadding: 1,
			scaleX: 0.2,
			scaleY: 0.2,
			colorize: true,
			color: 0xFFFFFF,
			inverse: false,
			top: true,
			animated:
				{
			translationX:
				{
					active: true,
					animType: "cosOscillation",
					val1: -2.0,
					val2: -2.0,
					loopDuration: 999999,
				},
			translationY:
				{
					active: true,
					animType: "sinOscillation",
					val1: 2,
					val2: 2,
					loopDuration: 999999,
					}
					}
		}];
	}
	await TokenMagic.addFiltersOnSelected(params);
}
};



polymorphFunc();