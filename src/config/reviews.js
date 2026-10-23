/**
 * Customer reviews shown on the site, copied word for word from the
 * business's Google reviews. Reviewers are shown by first name and last
 * initial. To add one, copy its text exactly; leave out reviews Google
 * shows cut off ("… More") unless you have the full text.
 */
module.exports = Object.freeze([
  {
    name: 'Susan K.',
    rating: 5,
    text: 'Found Southern and Sons doing a Google search, decided to check them out based on several of the reviews. I\'m glad I did. Chris took care of my mower problem, got it running again like new. Fast repair, reasonable price. Even cleaned it up. I highly recommend Chris. I\'m very pleased with the job he did.'
  },
  {
    name: 'Larry',
    rating: 5,
    text: 'Answered phone right away on a Sunday. Set up pick up of my generator in 2 hours. Repaired and returned my generator same day. Very fair price and Chris was a nice guy. Recommend and would call again in the future.'
  },
  {
    name: 'Jose Q.',
    rating: 5,
    text: 'Great price and very honest. My push mower would start and they quickly diagnosed it as a bad carburetor. Had it fixed in 1 day!! Now the mower runs like new.'
  },
  {
    name: 'Scott L.',
    rating: 5,
    text: 'Great service! Awesome communication! Repaired FAST! and at an affordable price! highly recommend!'
  },
  {
    name: 'Ben R.',
    rating: 5,
    text: 'Hannah and Kris make a great team! They figured out what was going on with my lawnmower and had it returned to me In seven days. Had a really great experience with them!'
  },
  {
    name: 'Michael P.',
    rating: 5,
    text: 'Chris did a great job on my SCUBA Hookah. Got it running with a fast turnaround!'
  }
].map(review => Object.freeze(review)))
