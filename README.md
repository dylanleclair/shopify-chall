PLANS

- grab images from nasa -> APOD, request a TON and then download them all using a python script
- grab images from a chosen insta account
- ask for the birthday from the user

- store a cookie to save the choices

MAIN IDEA:

- generate color schemes from NASA images, users instagram profile, find most similar images and build them timelined "tour" of space based on top 3 matches
- use similarity to make sure the matches arent too similar / boring

  - use similarity of colour schemes to identify a similar image from cached APOD on server, used server-side similarity matrix to return "matches"

    - compare similarity of images to encourage variety in the matches returned

  - on this day in space section
    - for each one, include a picture of the day
    - include horoscope from that day XD
    - near earth objects in date range of images/posts?

## Dependencies / libraries used

Frontend:

- Use colorthief library for generating color palettes of images (also used in backend)

## Change of plans:

- Instead of using instagram API since approval process is long and complicated....
- Have user upload 3 images they want to guide their journey
- The client will then send colour schemes of the files to the server, which will calculate and return the 3 most similar APOD entries it's cached
- The client will then display them / transform this into a nice frontend view.
