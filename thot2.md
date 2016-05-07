Turning Credential Harvesting Into Credential Clearcutting
==========================================================

JP Smith (@japesinator)

Eric Hennenfent(@Eric_Hennenfent)

---

2FA: The Basics
---------------

  * Require both something you know (a traditional password) and something you have (a phone, a physical key, etc.) or something you are

  * Prevents knowledge of password from becoming account compromise

---

2FA: The Anti-Basics
---------------

<img src="http://picpaste.com/pics/Screen_Shot_2016-05-05_at_12.00.46_PM-eaJjOfeI.1462470363.png" width=50% height=auto>

---

2FA: A cure for phishing?
-------------------------

  * Two-factor authentication prevents many of the most common forms of phishing out there today

  * Can no longer have just a giant cred list, and use when necessary

  * Increasingly being rolled out due to this + other benefits

----

  * As with any hyped security project, maybe not

  * Someone can still intercept your 2FA token!

---

How to do it!
-------------

----

&#8291;1. Steal username and password, as per usual
---------------------------------------------------

  * Can be done over the phone, from existing lists, from creds on other accounts

  * Can generally be verified by checking in 2FA confirmation shows up

----

&#8291;2. Set up a MitM page
----------------------------

  * Get in between site and user, ideally looking as much like site as possible

  * Ideally, just proxy site to user, just over much less secure connection

----

&#8291;3. Direct user to MitM page, ask for 2FA token
-----------------------------------------------------

  * Can be done using usual methods (email, social engineering, existing malware on PC)

  * Again, either look official or just proxy back the real site

  * Also, feel free to ask for creds here! It can't hurt

----

&#8291;4. Intercept 2FA token and use it to gain session
--------------------------------------------------------

  * Since we run the website the user is currently on, we can take their input and do what we want with it

  * While they think they're being logged in, we actually are doing what we will with their username, password, and token

----

&#8291;5. Have fun!
-------------------

  * Use new session to impersonate them (transfer money, steal docs, whatever)

  * Use your new session to escalate access (change 2FA settings (lock _them_ out!), remove 2FA, otherwise be creative)

  * Or just tell them what happened, if you wanna be a good person and all that

---

Joomla Demo!
------------

---

How it Works
------------

  * Joomla is just out-of-the-box Joomla with two-factor set up

  * Notably, does not require SSL

  * We use nginx to basically mirror the site, but with strategic additions (namely the part where we steal peoples' identities)

  * By directing users to the site we control, they can log in to the page that looks familiar to them, but still give us control

  * Notably, 2FA does not prevent this

---


Extending This Method
---------------------

  * Using tools like Selenium, we can basically make bots to visit sites for our users that are indistinguishable from them to Google or wherever

    * Bot simply prompts the user for whatever it's prompted for (token, captcha, password)

    * Then, once we recognize success, we just stop the bot (or just log the user in)

----

  * It's also possible to sabotage the token dispensers themselves

  * If we own a phone, we own SMS to it, and can then use that

  * Similarly, we can replace a client app

  * Malware in the wild has totally done this

---

Mitigation (or ways we got mitigated putting this together)
-----------------------------------------------------------

  * Look at who's using your website!

  * The easiest way to do this is basically proxying, but that's also easy to detect

  * Cloudflare does it automatically

----

  * Have a plan for when tokens are compromised

  * If someone's phone is owned, and it was their 2FA device, what is your procedure?

  * If someone has their 2FA device switched involuntarily, what is your procedure?

----

  * Use SSL. Train your users to always look for the green https://

  * SSL by itself won’t fix everything.

  * Assume all connections are MitM’ed and take steps to minimize damage.

  * Include advanced XSS prevention techniques.

----

  * Look at where logins are coming from!

  * Bots act pretty differently from humans by default, and there are lots of ways to flag this

  * Also, users rarely suddenly teleport to China/Russia/Iran

----

  * Keep the 2FA key as secret as possible

  * Joomla just shows it to you on the setup page, so our bots can just scrape it

----

  * People can always just call the user and ask them for their login info

  * Our job is to make automating this hard

---

Questions?
----------
