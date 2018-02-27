$(window).on('load', function() {

    var contractAddress  = "0x915b5929f44b97bd99b5166f3747a07ff6e5b168"; // in Ropsten testnet!

    var contractABI = [
        {
            "constant": true,
            "inputs": [],
            "name": "get9090",
            "outputs": [
                {
                    "name": "_p",
                    "type": "uint8"
                },
                {
                    "name": "_dir",
                    "type": "bool"
                },
                {
                    "name": "_e",
                    "type": "uint32"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "get8080",
            "outputs": [
                {
                    "name": "_p",
                    "type": "int8"
                },
                {
                    "name": "_ti",
                    "type": "uint32"
                },
                {
                    "name": "_te",
                    "type": "uint32"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "get7070",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_mc",
                    "type": "uint8"
                }
            ],
            "name": "read7070",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_id",
                    "type": "uint256"
                },
                {
                    "name": "_p",
                    "type": "int8"
                },
                {
                    "name": "_ti",
                    "type": "uint32"
                },
                {
                    "name": "_te",
                    "type": "uint32"
                }
            ],
            "name": "read8080",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_p",
                    "type": "uint8"
                },
                {
                    "name": "_dir",
                    "type": "bool"
                },
                {
                    "name": "_e",
                    "type": "uint32"
                }
            ],
            "name": "read9090",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }
    ]

    var url_string = 'http://www.wikiproofs.org:7070/api/status';
    var url = new URL(url_string);
    
    function createCORSRequest(method, url){
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr){
            // XHR has 'withCredentials' property only if it supports CORS
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined"){ // if IE use XDR
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            xhr = null;
        }
        return xhr;
    }

    var request = createCORSRequest( 'GET', url_string);
    if (!request) {
        alert('CORS not supported');
    } else {
        // Define a callback function
        request.onload = function() {
            var responseText = request.responseText;
            console.log(responseText);
            // process the response.
            alert(responseText);
        };

        request.onerror = function() {
            console.log('There was an error!');
          };

        // Send request
        request.send();
    }


    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 != 'undefined') {
        // Use Mist/MetaMask's provider
        $('#content').text('I have web3!!!');
        window.web3 = new Web3(web3.currentProvider);
    } else {
        var errorMsg = 'I don\'t has web3 :( Please open in Google Chrome Browser and install the Metamask extension.';
        $('#content').text(errorMsg);
        console.log(errorMsg);
        return;
    }

    var contractInstance = web3.eth.contract(contractABI).at(contractAddress);
    $('#content').text('You are communication with the contract factory at address: ' + contractAddress);

    

    // contractInstance.getContractAddress.call(0,function(error) {
    //     if (error) {
    //         console.log("Factory instantiation failed");
    //     } else {
    //         console.log("Factory instantiation succeeded");
    //     }
    //     $('#content').text('You are communication with the contract factory at address: ' + factoryAddress);
    // });

    
//     $('#contract_creation').on('submit', function(e) {
//         e.preventDefault(); // cancel the actual submit

//         var newCompanyID = parseInt($('#init_input_1').val(), 10); 
//         var adrtemp = document.getElementById("init_input_2");
//         var newAdrList = adrtemp.value.split("\n");
//         var newIPFSAdr = $('#init_input_3').val(); 
//         var newContract;

//         newContract = factoryInstance.createNewSurvey(newCompanyID, newAdrList, newIPFSAdr, function(error, txHash) {
//             if (error) {
//                 var errorMsg = 'error creating new survey (child) contract : ' + error;
//                 $('#event_logging').text(errorMsg);
//                 console.log(errorMsg);
//                 return;
//             }
//             // $('#event_logging').text('submitted new creation of the survey (child) contract to blockchain, transaction hash: ' + txHash + '\nThe survey of your company is at: ' + newContract);
//             $('#event_logging').text('submitted new creation of the survey (child) contract to blockchain, transaction hash: ' + txHash);
      
//         });

//         // $('#event_logging').text('The survey of your company is at: ' + newContract);
//         $('#event_logging').text('Transacting. . .');

//     });

//     $("#enter_Questions_button").on('click', function(){
//         // var contractIndex = 1;
//         var contractIndex = parseInt($('#input_company_id').val(), 10);
//         factoryInstance.getContractAddress(contractIndex, function(error, contractAddress) {
//             if (error) {
//                 console.log("No such contract found");
//                 return;
//             } else {
//                 console.log("Contract found adress: " + contractAddress);
//             }
//             // var newAddr = $('#input_contract_address').val(); 
//             // $('#input_contract_address').val(""); 
//             var one = $("#selection1").val() * 100;
//             var two = $("#selection2").val() * 10;
//             var three = $("#selection3").val();
//             var newHash = (parseInt(one) + parseInt(two) + parseInt(three)).toString();
//             console.log('1: ' + one  + '  2: ' +  two + '  3: ' + three );
//             // create instance of contract object that we use to interface the smart contract
//             var contractInstance = web3.eth.contract(surveyAbi).at(contractAddress);

//             // submit hash to the smart contract
//             contractInstance.submitResults(newHash, function(error, txHash) {
//                 if (error) {
//                     var errorMsg = 'error writing new message to smart contract: ' + error;
//                     console.log(errorMsg);
//                     return;
//                 } else {
//                     console.log('hash stored: ' + newHash);
//                     alert('answers are succesfully stored on the blockchain');
//                 }
//                 //$('#content').text('submitted new message to blockchain, transaction hash: ' + txHash);
//             });
//         });
//     });

    // $("#get_7070").on('click', function(){
    //     // var newAddr = $('#input_contract_address').val(); 
    //     // $('#input_contract_address').val(""); 
    //     // var contractIndex = 1;
    //     var contractIndex = parseInt($('#input_company_id').val(), 10);
    //     factoryInstance.getContractAddress(contractIndex, function(error, contractAddress) {
    //         if (error) {
    //             console.log("No such contract found");
    //             return;
    //         } else {
    //             console.log("Contract found adress: " + contractAddress);
    //         }
    //         var newAddr = $('#input_contract_address').val(); 

    //         // create instance of contract object that we use to interface the smart contract
    //         var contractInstance = web3.eth.contract(surveyAbi).at(contractAddress);

    //         // get hash from the smart contract
    //         contractInstance.hashes(newAddr, function(error, resultString) {
    //             if (error) {
    //                 var errorMsg = 'error writing new message to smart contract: ' + error;
    //                 console.log(errorMsg);
    //                 return;
    //             }else {
    //                 console.log("succesfully retrieved hash: " + resultString);
    //                 alert("selections: " + resultString);
    //             }
    //         });
    //         $('#input_contract_address').val("");  
    //     });
    // });
});

function cb(error, response) {
    // callback as helper function for debugging purposes
    console.log('error: ' + error + ', response: ' + response);
}
