# json2swift

A tool to generate Swift code from JSON.

### Use case

You have a server API which returns JSON, but you don't want to write all of that boring boilerplate Swift code yourself just to read responses from the API. The idea is that you save a response from your server API, and feed it to a tool in this repo. The output is:

* One or more Swift structs that model the data contained by the response
* A test builder class for easy creation of structs, default values from the JSON file

Soon to be added:

* Included serialization
* Simple tests that verify serialization

### Running this tool locally

* Make sure you have NodeJS installed
* Clone the repository
* npm install
* cd example
* ../cli.js SimpleData.json

### Running tests locally

* Make sure you have NodeJS installed
* Clone the repository
* npm install
* ./test.sh

#### Disclaimer

Not tested on any other platform than OS X 10.11.x. :-)
