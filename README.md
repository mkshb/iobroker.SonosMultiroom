# iobroker.SonosMultiroom
iobroker JavaScript zur Steuerung von Multiroom-Steuerung von Sonos Playern

# Beschreibung
Sonos Multiroom Lautsprecher lassen sich zu Gruppen zusammenfügen um latenzfrei dieselben Inhalte abzuspielen.  
Anwednungsbeispiel: Beim Betreten des Badezimmers automatisiert (Bewegungsmelder + Smartcontrol oder Szenen Adapter) das Licht eingeschaltet und der SONOS Player mit der Lieblingsplaylist gestartet. Zeitgleich betritt jemand die Küche in der dasselbe passiert.  
Allerdings wird auf dem SONOS Player in der Küche nicht dieselbe Playlist noch einmal gestartet, sondern der dortige SONOS in mit dem im Badezimmer zu einer Gruppe zusammengefügt.  
Wird im Badezimmer keine Bewegung mehr erkannt schalten sich Licht und SONOS automatisch aus. Das Skript erkennt dies und isoliert den SONOS Player im Badezimmer aus der Gruppe. Der Player in der Küche läuft jedoch weiter.  

# Voraussetzungen
* Laufende und konfigurierte Sonos HTTP API (thanks to jishi https://github.com/jishi/node-sonos-http-api)
* Astro Variable für die Tageszeit (Morgens, Mittags, Abends)
* ioBroker JavaScript Adapter + Instanz
* Eigene Datenpunkte (siehe unten)

# Features
* Dynamisches Gruppieren/Isolieren von SONOS Playern
* Konfiguration von Lautstärke, Bass und Shuffle nach Tageszeit
* Globale Einstellung des zu spielenden Inhalts

# Geplante Erweiterungen
* Nachtschaltung
* Sonerbahandlung bei Nacht und Abwesenheit
* Automatisches Anlegen von Datenpunkten

# Datenpunkte
Für jeden Sonos Player ist die Anlage eines Datenpunktes erforderlich. Dies kann an beliebiger Stelle erfolgen. Wichtig ist, dass der Name des Raumes mit dem Namen des SONOS Players in der SONOS App übereinstimmt.
Beispiel Bad: 
* 0_userdata.0.Sonos
* 0_userdata.0.Sonos.Bad
* 0_userdata.0.Sonos.Bad.state

Weiterhin wird ein Datenpunkt angelegt in dem die exakte Bezeichnung des SONOS Favoriten hinterlegt wird der gestartet wird, wenn kein Player läuft.

* 0_userdata.0.Sonos.DefaultPlaylist 

