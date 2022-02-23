/**
 * BR-3.8. Reward distribution
 * Reward share ratio is set by the Admins, with the default ratio being 50/50:
● X % of the total reward for Responder,
● Y % the total reward for Verifier,
where X + Y = 100%.
Admins can optionally configure the relationship between the Responder’s reward share and
their current rating, by providing a formula such as:
𝐶𝑢𝑟𝑟𝑒𝑛𝑡 𝑆ℎ𝑎𝑟𝑒 = 𝐵𝑎𝑠𝑒 𝑆ℎ𝑎𝑟𝑒 *
𝐶𝑢𝑟𝑟𝑒𝑛𝑡 𝑅𝑎𝑡𝑖𝑛𝑔
𝑀𝑎𝑥𝑖𝑚𝑢𝑚 𝑅𝑎𝑡𝑖𝑛𝑔
 */
export enum ResponderPaymentStrategyTypeEnum {
  SimpleRatio = 1,
  RatingDependent,
}
