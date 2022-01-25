import React from 'react';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { graphql } from 'msw';

import { Button } from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const mockedClient = new ApolloClient({
  uri: 'https://graphql.contentful.com/content/v1/spaces/0lfdmno33wsv/environments/master?access_token=X5vdpiHPMymj8qd67jKvolqh3q6QKJk_Dzho-h6ZR5w',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

const TestData = {
  button: {
    primary: false,
    backgroundColor: 'gray',
    size: 'medium',
    label: 'Test Label from Storybook'
  }
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = () => (
  <ApolloProvider client={mockedClient}>
    <Button />
  </ApolloProvider>
)

export const MockedSuccess = Template.bind({});
MockedSuccess.parameters = {
  msw: [
    graphql.query('buttonEntryQuery', (req, res, ctx) => {
      return res(
        ctx.delay(800),
        ctx.errors([
          {
            message: 'Access denied',
          },
        ])
      );
    }),
  ],
};

// export const Primary = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// Primary.args = {
//   primary: true,
//   label: 'Button',
// };

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };

