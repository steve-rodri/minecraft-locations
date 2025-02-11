curl --location --request POST 'http://localhost:5500/auth/signup' \
    --header 'Content-Type: application/json; charset=utf-8' \
    --data-raw '{
    "formFields": [{
        "id": "email",
        "value": "steve.rodri91@gmail.com"
    }, {
        "id": "password",
        "value": "somePassword123"
    }]
}'
