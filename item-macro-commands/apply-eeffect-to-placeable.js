if (!game.modules.get("advanced-macros")?.active) { ui.notifications.error("Advanced Macros is not enabled"); return }

if(args[0].tag === "OnUse"){ AAhelpers.applyTemplate(args); }