# iobroker.SonosMultiroom
iobroker JavaScript zur Steuerung von Multiroom-Steuerung von Sonos Playern

# Voraussetzungen
* Laufende und konfigurierte Sonos HTTP API (thanks to jishi https://github.com/jishi/node-sonos-http-api)
* Astro Variable für die Tageszeit (Morgens, Mittags, Abends)
* ioBroker JavaScript Adapter + Instanz

# Beschreibung
Sonos Multiroom Lautsprecher lassen sich zu Gruppen zusammenfügen um latenzfrei dieselben Inhalte abzuspielen. 
Das hier zur Verfügung gestellte Skript prüft beim Starten eines Sonos Players über ioBroker, ob im Netzwerk bereit Inhalte über Sonos aktiv wiedergegeben werden und fügt den zusätzlich gestarteten Player mit dem bereits laufenden zu einer Gruppe zusammen. Läuft kein weiteres Gerät, wird der eingeschaltete Player solo gestartet.
Wird ein gruppierter Player ausgeschaltet, wird dieser aus der Gruppe entfernt. Die anderen Player laufen weiter.
