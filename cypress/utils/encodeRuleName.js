export function encodeRuleName(ruleName) {
  return encodeURI(
    ruleName
      ?.replace(/\s\.\s/g, '.')
      .replace(/-/g, '\u2011') // replace with a insecable tiret to differenciate from space
      .replace(/\s/g, '-')
  )
}
