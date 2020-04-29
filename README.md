# MTGA Draft Value

The goal was to scrape a site to get the values given to each card in a new set.

![Scraped Site](/images/scraped.png)

This site was kinda slow and clunky so i grabbed the data i wanted and set out to do my own thing.

![json Data](/images/jsonoutput.png)

After I got the data, I decided to match it up with an exported draft list from MTGA, to get the total value of cards drafted. With this info I could start building data on the value of cards drafted, the value of played cards, and the average win %.

![json Data](/images/finished.png)

future iterations may include warnings, such as high value cards being left in the sideboard, or low value cards left in the main. A UI may be nice. Something to post the draft list too and get instant feedback. Also possibly keeping a record of past judge.js outputs. Maybe even putting in the players record.
