export function getQuestionPart(phrases: string[]): string[] {
  function longestCommonSubstring(s1: string, s2: string): string {
    const dp = Array.from(Array(s1.length + 1), () =>
      Array(s2.length + 1).fill(0)
    );

    let maxLength: number = 0;
    let endIndex: number = 0;

    for (let i: number = 1; i <= s1.length; i++) {
      for (let j: number = 1; j <= s2.length; j++) {
        if (s1[i - 1] === s2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
          if (dp[i][j] > maxLength) {
            maxLength = dp[i][j];
            endIndex = i - 1;
          }
        } else dp[i][j] = 0;
      }
    }
    return s1.substring(endIndex - maxLength + 1, endIndex + 1);
  }

  let commonSubstring: string = phrases[0];

  for (let i: number = 1; i < phrases.length; i++)
    commonSubstring = longestCommonSubstring(commonSubstring, phrases[i]);

  return phrases.map((phrase) => phrase.replace(commonSubstring, ""));
}
