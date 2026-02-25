# Lentopeli - Kadonneen Matkatavaran Metsästys

Hot/cold-tyylinen lentopeli Euroopan lentokentillä! Etsi kadonnutta perintölaukkua vihjeiden avulla.

## Asennus

### 1. Tietokanta (MariaDB/MySQL)
```bash
mysql -u käyttäjä -p
CREATE DATABASE projectbase;
USE projectbase;
SOURCE lp.sql
SOURCE Database_creation.sql
