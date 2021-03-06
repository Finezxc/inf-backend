/**
 * BR-3.8. Reward distribution
 * Reward share ratio is set by the Admins, with the default ratio being 50/50:
β X % of the total reward for Responder,
β Y % the total reward for Verifier,
where X + Y = 100%.
Admins can optionally configure the relationship between the Responderβs reward share and
their current rating, by providing a formula such as:
πΆπ’πππππ‘ πβπππ = π΅ππ π πβπππ *
πΆπ’πππππ‘ πππ‘πππ
πππ₯πππ’π πππ‘πππ
 */
export enum ResponderPaymentStrategyTypeEnum {
  SimpleRatio = 1,
  RatingDependent,
}
