# json2swift

Tools to generate Swift code from JSON.

### Use case

You have a server API which returns JSON, but you don't want to write all of that boring boilerplate Swift code yourself just to read responses from the API. The idea is that you save a response from your server API, and feed it to a tool in this repo. The output is:

* One or more Swift structs that model the data contained by the response, complete with serialization
* A test builder class for easy creation of structs with specific values in tests

In the future:

* Simple tests that verify serialization

### Running locally

* Make sure you have NodeJS installed
* Clone the repository
* npm install
* ./test.sh

Not tested on any other platform than OS X 10.11.x. :-)
