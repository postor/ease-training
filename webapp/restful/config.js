module.exports = {
  "db": {
    "client": "mysql",
    "connection": {
      "host": process.env.MYSQL_HOST || "localhost",
      "port": "3306",
      "user": "root",
      "password": process.env.MYSQL_ROOT_PASSWORD || "",
      "database": process.env.MYSQL_DATABASE ||"ease_training",
      "charset": "utf8",
      "supportBigNumbers": true,
      "bigNumberStrings": true
    }
  },
  "tables": [
    "dataset",
    "epoch",
    "model",
    "train"
  ]
}
