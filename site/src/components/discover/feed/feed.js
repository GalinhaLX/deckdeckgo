import React from 'react';
import {graphql, useStaticQuery} from 'gatsby';

import {main} from './feed.module.scss';

import {Card} from '../card/card';

export const Feed = () => {
  const data = useStaticQuery(graphql`
    query FeedQuery {
      allFeed {
        nodes {
          id
          data {
            title
            url
            screenshot
            published_at
            description
          }
          remoteImage {
            childImageSharp {
              id
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  return (
    <section>
      <main className={main}>
        {data.allFeed.nodes.map((feed) => (
          <Card key={feed.id} feed={feed} />
        ))}
      </main>
    </section>
  );
};
