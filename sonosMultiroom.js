//---------------------------------------------------
//---------- gVar Mapping ---------------------------
var sonosAPI            = 'http://10.10.10.2:5005';
var version				= '1.0'
var debug               = true;
var presentState 		= getState("0_userdata.0.GlobalStatus.PresentState").val; 
var sleepState   		= getState("0_userdata.0.GlobalStatus.SleepState").val; 
var timeOfDay    		= getState("javascript.0.Astro.Tageszeit.current").val;
var playlist            = getState("0_userdata.0.Sonos.DefaultPlaylist").val;
var roomConfig          = '[{"TimeOfDay":"Morgendämmerung","config":{"Bad":{"volume":10,"bass":0,"shuffle":"on"},"Kueche":{"volume":8,"bass":0,"shuffle":"on"},"Schlafzimmer":{"volume":10,"bass":0,"shuffle":"on"},"Garten":{"volume":15,"bass":0,"shuffle":"on"},"Wohnzimmer":{"volume":10,"bass":0,"shuffle":"on"}}},{"TimeOfDay":"Sonnenaufgang","config":{"Bad":{"volume":10,"bass":0,"shuffle":"on"},"Kueche":{"volume":8,"bass":0,"shuffle":"on"},"Schlafzimmer":{"volume":10,"bass":0,"shuffle":"on"},"Garten":{"volume":15,"bass":0,"shuffle":"on"},"Wohnzimmer":{"volume":10,"bass":0,"shuffle":"on"}}},{"TimeOfDay":"Morgen","config":{"Bad":{"volume":11,"bass":0,"shuffle":"on"},"Kueche":{"volume":8,"bass":0,"shuffle":"on"},"Schlafzimmer":{"volume":11,"bass":0,"shuffle":"on"},"Garten":{"volume":15,"bass":0,"shuffle":"on"},"Wohnzimmer":{"volume":10,"bass":0,"shuffle":"on"}}},{"TimeOfDay":"Vormittag","config":{"Bad":{"volume":10,"bass":0,"shuffle":"on"},"Kueche":{"volume":8,"bass":0,"shuffle":"on"},"Schlafzimmer":{"volume":10,"bass":0,"shuffle":"on"},"Garten":{"volume":15,"bass":0,"shuffle":"on"},"Wohnzimmer":{"volume":10,"bass":0,"shuffle":"on"}}},{"TimeOfDay":"Mittag","config":{"Bad":{"volume":10,"bass":0,"shuffle":"on"},"Kueche":{"volume":8,"bass":0,"shuffle":"on"},"Schlafzimmer":{"volume":10,"bass":0,"shuffle":"on"},"Garten":{"volume":15,"bass":0,"shuffle":"on"},"Wohnzimmer":{"volume":10,"bass":0,"shuffle":"on"}}},{"TimeOfDay":"Nachmittag","config":{"Bad":{"volume":10,"bass":0,"shuffle":"on"},"Kueche":{"volume":8,"bass":0,"shuffle":"on"},"Schlafzimmer":{"volume":10,"bass":0,"shuffle":"on"},"Garten":{"volume":15,"bass":0,"shuffle":"on"},"Wohnzimmer":{"volume":10,"bass":0,"shuffle":"on"}}},{"TimeOfDay":"Abend","config":{"Bad":{"volume":11,"bass":2,"shuffle":"on"},"Kueche":{"volume":8,"bass":2,"shuffle":"on"},"Schlafzimmer":{"volume":11,"bass":2,"shuffle":"on"},"Garten":{"volume":15,"bass":2,"shuffle":"on"},"Wohnzimmer":{"volume":11,"bass":2,"shuffle":"on"}}},{"TimeOfDay":"Sonnenuntergang","config":{"Bad":{"volume":10,"bass":0,"shuffle":"on"},"Kueche":{"volume":8,"bass":0,"shuffle":"on"},"Schlafzimmer":{"volume":10,"bass":0,"shuffle":"on"},"Garten":{"volume":15,"bass":0,"shuffle":"on"},"Wohnzimmer":{"volume":10,"bass":0,"shuffle":"on"}}},{"TimeOfDay":"Abenddämmerung","config":{"Bad":{"volume":10,"bass":0,"shuffle":"on"},"Kueche":{"volume":8,"bass":0,"shuffle":"on"},"Schlafzimmer":{"volume":10,"bass":0,"shuffle":"on"},"Garten":{"volume":15,"bass":0,"shuffle":"on"},"Wohnzimmer":{"volume":10,"bass":0,"shuffle":"on"}}},{"TimeOfDay":"Nacht","config":{"Bad":{"volume":10,"bass":0,"shuffle":"on"},"Kueche":{"volume":8,"bass":0,"shuffle":"on"},"Schlafzimmer":{"volume":10,"bass":0,"shuffle":"on"},"Garten":{"volume":15,"bass":0,"shuffle":"on"},"Wohnzimmer":{"volume":10,"bass":0,"shuffle":"on"}}}]';
var defaultConfig       = '[{"volume":10,"bass":0,"shuffle":"on"}]';

//Trigger
var x = new RegExp("0_userdata\.0\.Sonos\.*\.state");

////Funktionen
// Debug Funktion
function _debug(logmsg) {
    if(debug) {
        console.log(logmsg);
    }
}

// API Aufrufe
function callAPI(url, debugmsg) {
    try {require("request")(url).on("error", function (e) {console.error(e);}); 
        _debug(debugmsg);
        } catch (e) { console.error(e); }
}

// addPlayerToGroup
function addPlayerToGroup(player, group, config) {
    //Player zur Gruppe hinzufügen
     callAPI(sonosAPI+'/'+group+'/add/'+player, 'Added '+player+' to '+group)
    //Volume setzen
     callAPI(sonosAPI+'/'+player+'/volume/'+config.volume, 'Volume set: '+config.volume)
    //Bass setzen
     callAPI(sonosAPI+'/'+player+'/bass/'+config.bass, 'Bass set: '+config.bass)
    //Shuffle setzen
     callAPI(sonosAPI+'/'+player+'/shuffle/'+config.shuffle, 'Shuffle set: '+config.shuffle)
}

// startPlayerSolo
function startPlayerSolo(player, config, playlist) {
    //Starte Player Solo
     callAPI(sonosAPI+'/'+player+'/favorite/'+playlist, player+' solo gestartet');
    //Volume setzen
     callAPI(sonosAPI+'/'+player+'/volume/'+config.volume, 'Volume set: '+config.volume);
    //Bass setzen
     callAPI(sonosAPI+'/'+player+'/bass/'+config.bass, 'Bass set: '+config.bass);
    //Shuffle setzen
     callAPI(sonosAPI+'/'+player+'/shuffle/'+config.shuffle, 'Shuffle set: '+config.shuffle);
}

///////////
// Trigger
on({id: x, change: "ne"}, function (obj) {
    var triggerObj = obj.id.split(".");
    var triggerPlayer = triggerObj[3];
    _debug(triggerPlayer);
    
    //Wenn Triggervalue = true, dann suche laufenden Player und schließe den triggernden Player der Gruppe an
    if(obj.state.val) {
        
        //Config für Raum und Tageszeit ermitteln    
        var roomConfigJSON = JSON.parse(roomConfig);
        var config = '';
        for(var i = 0; i < roomConfigJSON.length; i++) {
            var configObj = roomConfigJSON[i];
            if(configObj.TimeOfDay == timeOfDay && configObj.config[triggerPlayer]) { config = configObj.config[triggerPlayer]; }
        }

        if (config == '') {
            _debug('Keine Config für '+timeOfDay+' gefunden. Benutze Default.');
            config = defaultConfig;
            _debug(config);
        } else {
            _debug('Konfig für '+timeOfDay+' und '+triggerPlayer+': '+JSON. stringify(config));
        }        
            try {        
                // Alle Player aus der API holen und die Anzahl laufender Player in runningPlayer speichern.
                require("request")(sonosAPI+'/zones', async function (error, response, result) {
                    var jsonObj = JSON.parse(result);
                    var runningPlayer = 0;
                    for (var i=0 ; i < jsonObj.length ; i++)
                    {                        
                        if (jsonObj[i].coordinator.state.playbackState == "PLAYING") {                        
                            runningPlayer = runningPlayer + 1;
                            var playRoom = jsonObj[i].coordinator.roomName;                                                        
                        }                         
                    }                                    
                if (runningPlayer > 0) {
                        //Wenn min. ein Sonos läuft, dann füge den Player zur Gruppe hinzu
                        addPlayerToGroup(triggerPlayer, playRoom, config);                                
                    } else {
                        //Wenn kein Sonos läuft, dann starte den Player solo
                        startPlayerSolo(triggerPlayer, config, playlist)
                    }

                }).on("error", function (e) {console.error(e);});
            } catch (e) { console.error(e); }
    } else {
        //Wenn Triggervalue = false, dann isoliere den Player
        try { require("request")(sonosAPI+'/'+triggerPlayer+'/isolate', async function (error, response, result) { _debug(triggerPlayer+' isolated'); }).on("error", function (e) {console.error(e);}); } catch (e) { console.error(e); }
    }
});