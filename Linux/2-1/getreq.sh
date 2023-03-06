if [ $2 == "GET" ]
then
	curl -i -H "accept: application/json" -H "content-type: application/json" -X $2 $1
	curl -i -H "accept: application/json" -H "content-type: application/json" -X $2 $1 >> output.json
elif [ $2 == "POST" ]
then
	curl -X $2 $1 -d '{"name": "mohammad", "job": "backend dev"}'
	curl -X $2 $1 -d '{"name": "mohammad", "job": "backend dev"}' >> response.json
else
	echo bad params
fi

if [ $1 == '' ]
then
	echo bad params
fi
