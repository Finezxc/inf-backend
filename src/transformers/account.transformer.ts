export class AccountTransformer implements ITransformerInterface {
  transform(data) {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      bio: data.bio,
      location: data.location,
      jobTitle: data.jobTitle,
      linkedInProfileUrl: data.linkedInProfileUrl,
      cryptoCurrencyWalletAddress: data.cryptoCurrencyWalletAddress,
      credentialDocuments: data.responderCredentialDocuments,
      categories: data.categories,
    };
  }
}
