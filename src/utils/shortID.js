// @flow
// Generate short url friendly id like "2bnbvw2sv", "4b809ji56"
export default function() {
  return (
    new Date().valueOf() +
    +Math.random()
      .toString()
      .split(".")[1]
  )
    .toString(36)
    .substr(0, 9);
}
