This project is made by Ziheng Huang and Alex Wei.

Project Demo: https://youtu.be/1VUqagoK8dY

Inspiration :
Our team wanted to address the "Supporting Philanthropic Goals" challenge by Bloomberg, as well as the "Best Use of Google Cloud - Use any Google Cloud product" challenge by Google.

What it does :
Our project addresses the challenge by making it easy to find where to donate. The extension recommends a donation link based on what articles you're browsing. So when our users are reading about the next 2020 disaster that strikes, they will be more ready to give a virtual hand.
How we built it Our team used HTML and CSS to design the popup app. We deployed a Google Cloud Function in Node.js that uses the Google Cloud Natural Language API to determine the most important entities, then searching on our Google Topical Engine for related places for donation.
