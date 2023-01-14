IMPORTANT
https://help.salesforce.com/s/articleView?id=sf.pardot_admin_first_party_tracking_implement_tracking_code.htm&type=5&language=en_US

- I tried to send a test, as you recommended, and it gave the error you can see in the first picture. I used that URI. http://go.pardot.com/l/368201/2022-12-08/rxvfq?email=mael.fallet@gmail.com

- I looked on the API and it occurs that I need to fill the required fields you settled on the Pardot form object related to that URI. We'll so need to get that form handler object details (all fields with type and required status). Either you send them to us or we have access to it.

- What if we have some fields that are not settled in the handler : do you want to add them as not required or you don't need them ?
- What if you have setteld some required fields that we don't have in the form ?

- Do the "go.pardot" shaped URI avoid the OAuth necessity or is there some hash or consumer key to put on a bearer, the body/x-www-form-urlencoded or somewhere else ?

- I searched about API's form "go.pardot.com/..." shaped URIs and it appears to be the "by default" URI shape. Do all the needs you have are fulfilled with that or are there some missing ones ?

https://help.salesforce.com/s/articleView?id=sf.pardot_content_customize_links_parent.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.pardot_admin_first_party_cookie_considerations.htm&type=5
https://help.salesforce.com/s/articleView?id=sf.pardot_content_vanity_urls_considerations.htm&type=5

- As said in there it's possible to link multiple domains. Is that "go.pardot" you gave us :
  - linked with only inmodemd.co.uk and as to be ?
  - linked with only inmodemd.co.uk but has to next link on multiple domains to also add inmodemd.fr ?
  - already linked with different inmode sites and has to or is already linked with inmodemd.fr ?
For the solutions where the form handler is or has to be settled on multiple domains, what will be the discriminant field to know the source ?
https://help.salesforce.com/s/articleView?id=000380907&type=1
