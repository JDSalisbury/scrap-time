# MTGA Draft Value

When a new MTG set comes out, the cards are reviewed by people and given a 1-5 raiting on how good they are. When drafting a set its good to use these raitings to value selecting one card over another.

During a draft 8 people open up three packs of cards and creates a 40 card deck. You select one card out of a pack of 15 and pass the pack to the person to your left, and you will then recieve a pack of 14 from the person to your right, this process is continued for pack 1 and 3 untill all the cards are picked, pack 2 is passed to the right in similar fashion.

The goal was to scrape a site to get the values given to each card in a new set.

![Scraped Site](/images/scraped.png)

This site was kinda slow and clunky so i grabbed the data i wanted and set out to do my own thing.

![json Data](/images/jsonoutput.png)

After I got the data, I decided to match it up with an exported draft list from MTGA, to get the total value of cards drafted. With this info I could start building data on the value of cards drafted, the value of played cards, and the average win %.

![json Data](/images/finished.png)

future iterations may include warnings, such as high value cards being left in the sideboard, or low value cards left in the main. A UI may be nice. Something to post the draft list too and get instant feedback. Also possibly keeping a record of past judge.js outputs. Maybe even putting in the players record.
