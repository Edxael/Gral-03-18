# DATA AND INFO 

I might be able to mimic the XML api using the following API-MOCKIN service:
https://www.mockable.io/a/#/


### Location of pages with current data:
https://www.w3schools.com/xml/ajax_xmlhttprequest_send.asp
https://www.w3schools.com/xml/ajax_xmlhttprequest_create.asp
https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/XMLHttpRequest
https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest



### Axios
https://www.npmjs.com/package/axios


### XML-CALLS WITH POSTMAN
https://developer.intacct.com/web-services/your-first-api-calls/


### V Source:
AJAX JavaScript XHR and Fetch



============================================================

### Another option:
https://www.youtube.com/watch?v=EAwSvbfFpIg
https://www.youtube.com/watch?v=lk4-UYD3KC4



============================================================


# OTHER PLACE WHERE WE CAN CREATE A FAKE API
https://testapi.io/#whatisit


////////////////////////////////////////////////////////////////////////////////////////////////


CODE I USED 1ST ON MOCKABLE.IO

const MyURL = "http://demo9622188.mockable.io/test"



const CallAPI = () => {
    console.log("Calling the API... 07")

    const xhttp = new XMLHttpRequest()

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText)
        }
    }

    xhttp.open("GET", MyURL, true)
    xhttp.send() 
}



////////////////////////////////////////////////////////////////////////////////////////////////



<?php
$continent = $_REQUEST["continent"];
$countries = array(
 "africa" => array("Angola", "Cameroon", "Egypt", "Kenya", "Uganda"),
 "asia" => array("China", "India", "Iran", "Malaysia", "Singapore"),
 "europe" => array("France", "Germany", "Italy", "Spain", "United Kingdom"),
 "n-america" => array("Canada", "Cuba", "Jamaica", "Panama", "United States"),
 "s-america" => array("Argentina", "Brazil", "Colombia", "Peru", "Uruguay"),
 "australia" => array("Australia", "Fiji", "Kiribati", "New Zealand")
 );
if(isset($continent))
{
 if(isset($countries[$continent]))
 {
 for($i = 0;$i<count($countries[$continent]); $i++)
 {
 echo "<option value='" . $countries[$continent][$i] ."'>" . $countries[$continent][$i] . "</option>";
 }
 }
}
?>



----------------------------------------------------

<?xml version="1.0"?>
<soap:Envelope
xmlns:soap="http://www.w3.org/2001/12/soap-envelope"
soap:encodingStyle="http://www.w3.org/2001/12/soap-encoding">

<soap:Body xmlns:m="http://www.example.org/stock">

  <m:GetStockPriceResponse>
    <m:Price>34.5</m:Price>
  </m:GetStockPriceResponse>
</soap:Body>

</soap:Envelope> 



--------------------------------------------------------------------------

Sofar on the: AJAX in Action: Build AJAX-Based Applications




        const getCountries = (e) => {
            console.log("Runing getCountries")

            this.setState({ scon: this.menu.value })

            setTimeout(() => { 
                console.log(this.state.scon) 

                let xhr = new XMLHttpRequest()

                MyURL = MyURL + "?continent=" + this.state.scon
                console.log( MyURL )

                xhr.open("GET", MyURL , true)
                xhr.send()

                
                xhr.onreadystatechange = function() {
                    if(this.readyState === 4 && this.status === 200){
                        console.log("Paso la prueva");
                        
                        // console.log( xhr.responseText )
                    }
                }

                
            
                MyURL = "http://localhost/ajax/01-countries-data.php"
                this.setState({ scon: '' })
            }, 100)

        }


    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

         <select id="continents" onChange={getCountries} ref = {(input)=> this.menu = input} >
            <option value="africa">Africa</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="n-america">North America</option>
            <option value="s-america">South America</option>
            <option value="australia">Australia</option>
        </select>


------------------------------------------------------------

EXAMPLE OF A POST

        const POST1 = () => {
            console.log("POST: to Mock-API")

            const xhttp = new XMLHttpRequest()
            xhttp.open("POST", MyURL, true)

            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

            xhttp.onreadystatechange = () => {          //Call a function when the state changes.
                if(xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
                    // Request finished. Do processing here.
                    console.log("Succesful Post....")
                }
            }

            xhttp.send('my string ')
        }