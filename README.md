# URL Shortening API
This shortens a link and returns it as a JSON object. Follow the steps below to use the API.
# Pre-Requisites
~ include the below JQUERY library in your header:
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

# TO GET A SHORTENED API FROM A URL:
~ Send a post request to con.rf.gd url:'/getlink' having JSON data as follows:
~ {link : theLinkToBeShortened}
~ Example:
            $.ajax({
                type: "POST",
                url: "con.rf.gd/getlink",
                data: {url: theUrlToBeShortened}, // URL
                dataType: "json", // indicates response is in JSON format
                success: function (response) {
                    // The shortened URL is response.shortenedURL
                }
            });

# TO ACCESS THE URL:
~ To use the URL just perform a GET request to con.rf.gd and the original URL will be redirected.
~ Example:
            con.rf.gd/353 => this will get redirected to the original URL