# iobroker.SonosMultiroom
iobroker JavaScript zur Steuerung von Multiroom-Steuerung von Sonos Playern

# Voraussetzungen
* Laufende und konfigurierte Sonos HTTP API (thanks to jishi https://github.com/jishi/node-sonos-http-api)
* Astro Variable für die Tageszeit (Morgens, Mittags, Abends)
* ioBroker JavaScript Adapter + Instanz
* Eigene Datenpunkte (siehe Skript)

# Features
* Dynamisches Gruppieren/Isolieren von SONOS Playern
* Konfiguration von Lautstärke, Bass und Shuffle nach Tageszeit
* Globale Einstellung des zu spielenden Inhalts

# Geplante Erweiterungen
* Nachtschaltung
* Sonerbahandlung bei Nacht und Abwesenheit

# Beschreibung
Sonos Multiroom Lautsprecher lassen sich zu Gruppen zusammenfügen um latenzfrei dieselben Inhalte abzuspielen.  
Anwednungsbeispiel: Beim Betreten des Badezimmers automatisiert (Bewegungsmelder + Smartcontrol oder Szenen Adapter) das Licht eingeschaltet und der SONOS Player mit der Lieblingsplaylist gestartet. Zeitgleich betritt jemand die Küche in der dasselbe passiert.  
Allerdings wird auf dem SONOS Player in der Küche nicht dieselbe Playlist noch einmal gestartet, sondern der dortige SONOS in mit dem im Badezimmer zu einer Gruppe zusammengefügt.  
Wird im Badezimmer keine Bewegung mehr erkannt schalten sich Licht und SONOS automatisch aus. Das Skript erkennt dies und isoliert den SONOS Player im Badezimmer aus der Gruppe. Der Player in der Küche läuft jedoch weiter.  
