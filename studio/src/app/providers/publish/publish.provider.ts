import {Deck, DeckMetaAuthor, UserSocial, Publish} from '@deckdeckgo/editor';

import deckStore from '../../stores/deck.store';
import userStore from '../../stores/user.store';
import authStore from '../../stores/auth.store';

import {firebase as firebaseEnabled} from '../../utils/core/environment.utils';
import {cloudProvider} from '../../utils/core/providers.utils';

import {EnvironmentConfigService} from '../../services/environment/environment-config.service';

export const publish = ({
  name,
  description,
  tags,
  github
}: {
  name: string;
  description: string;
  tags: string[];
  github: boolean;
}): Promise<void> => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (!deckStore.state.deck || !deckStore.state.deck.id || !deckStore.state.deck.data) {
        reject('No deck found');
        return;
      }

      if (!firebaseEnabled()) {
        reject('Firebase is not enabled therefore publishing cannot be triggered');
        return;
      }

      const deck: Deck = updateDeckMeta({name, description, tags, github});

      const publishedDeck: Deck = await publishDeck(deck);

      deckStore.state.deck = {...publishedDeck};

      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

const publishDeck = async (deck: Deck): Promise<Deck> => {
  const {publish}: {publish: Publish} = await cloudProvider<{publish: Publish}>();

  const firebaseConfig: Record<string, string> = EnvironmentConfigService.getInstance().get('firebase');

  return publish({deck, config: firebaseConfig});
};

const updateDeckMeta = ({name, description, tags, github}: {name: string; description: string; tags: string[]; github: boolean}): Deck => {
  if (!userStore.state.user || !userStore.state.user.data) {
    throw new Error('No user');
  }

  const now: Date = new Date();

  const deck: Deck = {...deckStore.state.deck};

  deck.data.name = name;

  if (!deck.data.meta) {
    deck.data.meta = {
      title: name,
      updated_at: now as unknown as Date
    };
  } else {
    deck.data.meta.title = name;
    deck.data.meta.updated_at = now as unknown as Date;
  }

  if (description && description !== undefined && description !== '') {
    deck.data.meta.description = description;
  } else {
    deck.data.meta.description = null;
  }

  if (!tags || tags.length <= 0) {
    deck.data.meta.tags = null;
  } else {
    deck.data.meta.tags = tags;
  }

  if (userStore.state.user?.data?.name) {
    if (!deck.data.meta.author) {
      deck.data.meta.author = {
        name: userStore.state.user.data.name
      };
    } else {
      (deck.data.meta.author as DeckMetaAuthor).name = userStore.state.user.data.name;
    }

    if (userStore.state.user.data.photo_url) {
      (deck.data.meta.author as DeckMetaAuthor).photo_url = userStore.state.user.data.photo_url;
    }

    if (userStore.state.user.data.social) {
      (deck.data.meta.author as DeckMetaAuthor).social = Object.keys(userStore.state.user.data.social).reduce(
        (acc: UserSocial, key: string) => {
          acc[key] =
            userStore.state.user.data.social[key] !== null && userStore.state.user.data.social[key] !== undefined
              ? userStore.state.user.data.social[key]
              : null;
          return acc;
        },
        {} as UserSocial
      );
    } else {
      (deck.data.meta.author as DeckMetaAuthor).social = null;
    }
  } else if (deck.data.meta.author) {
    deck.data.meta.author = null;
  }

  // Update GitHub info (push or not) for GitHub users so next time user publish, the choice is kept
  if (authStore.state.gitHub) {
    if (deck.data.github) {
      deck.data.github.publish = github;
    } else {
      deck.data.github = {
        publish: github
      };
    }
  }

  return deck;
};