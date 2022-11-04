## CSV-JSON-converter--HNGi9-task
Used the priciple of Builder design pattern, Single Responsibility, and Object Oriented Programming to build the required json.
A Single Responsibility class was created to help with filesystems, and was imported alongside a hash function into a DeriveMetadata class.
Users are required to provide the full path of the csv document


## /GET /api/file;
A view is rendered to the user to input the full file path to the scv file.
The file path must follow lf convention e.g users/user/csv/team_chisel.csv(Note, no crlf eg users\user etc).

## /POST /api/file
On submiting the filepath through the forM,
the JSON metadata is generated at the the same folder as the scv file.

It is suitably run locally:
## steps:
Make sure node is installed on machine,
clone this repo
install all dependency using npm install,
create a class instance of DeriveMetadata,
and pass the csv filename as argument to the instance
start server by running node index.js
