import {firestore} from 'firebase-admin';

export interface PlatformDeckGitHubRepo {
  id: string;
  url: string;
  name: string;
  nameWithOwner: string;
}

export interface PlatformDeckGitHub {
  repo: PlatformDeckGitHubRepo;
}

export interface PlatformDeckData {
  github: PlatformDeckGitHub;

  created_at?: firestore.Timestamp;
  updated_at?: firestore.Timestamp;
}

export interface PlatformDeck {
  id: string;
  ref: firestore.DocumentReference;
  data: PlatformDeckData;
}
