# URL Shortening API
This shortens a link and returns it as a JSON object. Follow the steps below to use the API.
# Pre-Requisites
~ include the below JQUERY library in your header:
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

# To get a shortened URL:
~ Send a post request to con.rf.gd url:'/getlink' having JSON data as follows: <br>
~ {link : theLinkToBeShortened} <br>
~ Example: <br>
            $.ajax({ <br>
                type: "POST", <br>
                url: "con.rf.gd/getlink", <br>
                data: {url: theUrlToBeShortened}, // URL <br>
                dataType: "json", // indicates response is in JSON format <br>
                success: function (response) { <br>
                    // The shortened URL is response.shortenedURL <br>
                } <br>
            }); <br>

# To access the original URL:
~ To use the URL just perform a GET request to con.rf.gd and the original URL will be redirected. <br>
~ Example: <br>
            con.rf.gd/353 => this will get redirected to the original URL <br>