(async () => {
    let newObject= await canvas.scene.createEmbeddedDocuments('Tile', [{
        img: 'Objects/AOE_ASSETS_7ice/XIVBattleMarkerGifs/Stack_Marker_3.webm',
        x: token.center.x-150,
        y: token.center.y-150,
        width: 300,
        height: 300,
        overhead: true,
        "occlusion.mode" : CONST.TILE_OCCLUSION_MODES.NONE
    }]);

    tokenAttacher.attachElementsToToken(newObject, token, false);
})()