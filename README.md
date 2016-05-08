# Two Factor Phishing
###### @ehennenfent || @japesinator
This repo contains the slides and code from our 2016 Thotcon talk, which demonstrated a proof of concept phishing attack against Joomla's two factor authentication system. The aim of this talk was to demonstrate that two factor authentication, while never a bad idea, is scarcely more effective at defending against attacks in the human side of security than standard passwords.

## [Slides](https://ehennenfent.github.io/2FA-Phishing/#/)

## Components

* The core component of this demo is a stock Joomla install on Ubuntu. Since everything there was off-the-shelf, we haven't included the code. We simply followed the instructions [here](https://help.ubuntu.com/community/Joomla), then [enabled 2FA on the super user account](https://docs.joomla.org/J3.x:Two_Factor_Authentication).

* We used nginx as a transparent proxy in order to allow us to host everything on one DO droplet. The `nginx` directory contains the config files for the various components of this demo.

* For the legitimate site (http://totallylegit2fa.tk) we simply used a stock nginx config that forwards traffic from that domain to a local apache instance.

* The malicious site does almost the same thing, but includes a few extra lines that put Joomla's HttpOnly login cookies into a header we can read, and inject our malicious javascript into the DOM. The malicious javascript can be found in the `phish` directory.

* This javascript runs silently on the page and posts the login credentials and cookie to our harvester server.

* The harvester server uses the stolen cookies to query Joomla's user information page and retrieve the time-based one time pad key used for that user's second authentication factor. This code can be found in harvester.py
