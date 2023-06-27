if(args[0].tag === "OnUse"){
    let objUpdate = new Object();
    const val = actor.system.resources.secondary.value ?? 0
    
    objUpdate['system.resources.secondary.value'] = val + 1;
    
    actor.update(objUpdate);
}