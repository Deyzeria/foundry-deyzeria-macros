const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);

if (args[0] === "on") {
    new Dialog({
        title: 'Choose a damage type',
        content: `
          <form class="flexcol">
            <div class="form-group">
              <select id="element">
                <option value="acid">Acid</option>
                <option value="bludgeoning">Bludgeoning</option>
                <option value="cold">Cold</option>
                <option value="fire">Fire</option>
                <option value="force">Force</option>
                <option value="lightning">Lightning</option>
                <option value="necrotic">Necrotic</option>
                <option value="piercing">Piercing</option>
                <option value="poison">Poison</option>
                <option value="psychic">Psychic</option>
                <option value="radiant">Radiant</option>
                <option value="slashing">Slashing</option>
                <option value="thunder">Thunder</option>

              </select>
            </div>
          </form>
        `,
       buttons: {
            yes: {
                icon: '<i class="fas fa-bolt"></i>',
                label: 'Select',
                callback: async (html) => {
                    let effect = tactor.effects.find(i => i.data.label === "Imperil");
                    let element = html.find('#element').val();
                    let negelement= "-"+element;
                    let changes = effect.data.changes;
                    
                
                  if(tactor.data.data.traits.di.value.includes(element)){
                      changes[0]={
                       key: "data.traits.di.value",
                       mode: 0,
                       priority: 20,
                       value: negelement
                      }
                      changes[1]={
                       key: "data.traits.dr.value",
                       mode: 0,
                       priority: 20,
                       value: element
                       } 
                   }
                   else if (tactor.data.data.traits.dr.value.includes(element)){
                   changes[0]={
                       key: "data.traits.dr.value",
                       mode: 0,
                       priority: 20,
                       value: negelement
                      }
                   }
                    await effect.update({changes});
                },
            },
        }
    }).render(true);

}

if (args[0] === "off") {
    //let flag = DAE.getFlag(tactor, 'enhanceAbility');
    
    //ChatMessage.create({ content: "Enhance Ability has expired" });
}