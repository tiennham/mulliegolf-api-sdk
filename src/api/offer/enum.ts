export enum OfferStatus {
  CREATED = 'CREATED',
  COUNTERED = 'COUNTERED',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  COUNTER_DECLINED = 'COUNTER_DECLINED',
  DONE = 'DONE',
}

export enum OfferOwnerAction {
  DECLINE_COUNTER = OfferStatus.COUNTER_DECLINED,
}

export enum ProductOwnerAction {
  ACCEPT_OFFER = OfferStatus.ACCEPTED,
  DECLINE_OFFER = OfferStatus.DECLINED,
  COUNTER_OFFER = OfferStatus.COUNTERED,
}

export enum OfferVerb {
  OFFER_DISABLE = 'OFFER_DISABLE',
  OFFER_ENABLE = 'OFFER_ENABLE',
}
