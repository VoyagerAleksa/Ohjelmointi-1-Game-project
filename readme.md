# Lentopeli - Kadonneen Matkatavaran Metsästys

Hot/cold-tyylinen lentopeli Euroopan lentokentillä! Etsi kadonnutta perintölaukkua vihjeiden avulla.

## Asennus

### 1. Lataa SQL-skriptit GitHubista
**database/** -kansiossa: `lp.sql` + `Database_creation.sql`

### 2. Tietokanta (MariaDB/MySQL)
```bash
mysql -u käyttäjä -p
CREATE DATABASE projectbase;
USE projectbase;
SOURCE lp.sql;
SOURCE Database_creation.sql;
```

### 3. Assets (png,txt files)
Lataakaa omaa koneen kaikki files assets kansiosta

### 4. Muokakaa path kaikki files demogame'ssa
     4.1 134 rivi. Oma koneestä löytävä path compas.png
     4.2 316 rivi. Path welcome_screen.txt
     4.3 322 rivi Path meme.txt

