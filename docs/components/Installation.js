import React, { Component } from 'react';

import { Segment, Container, Header, Message } from 'semantic-ui-react';

export default class Installation extends Component {
  render() {
    return (
      <Segment padded>
        <Container>
          <Header as="h2">Install via NPM</Header>
          <Segment>npm i @kiyasov/noty --save</Segment>

          <Header as="h2">Install via Bower</Header>
          <Segment>bower i @kiyasov/noty --save</Segment>

          <Header as="h2">Basic usage</Header>
          <Message>
            {`// index.js`}
            <br />
            <b>{`import React from 'react';`}</b>
            <br />
            <b>{`import ReactDOM from 'react-dom';`}</b>
            <br />
            <b> {`import { NotyProvider } from '@kiyasov/noty';`}</b>
            <br />
            <br />
            {`const App = (<NotyProvider><MyApp/></NotyProvider>);`} <br />
            <br />
            {`ReactDOM.render(App, document.getElementById('root'));`}
            <br />
            <br />
            {`// MyComponent.js`} <br />
            <b> {`import React, { Component } from 'react';`}</b> <br />
            <b>{`import { notyConnect } from '@kiyasov/noty';`}</b> <br />{' '}
            <br />
            {`class MyComponent extends Component {`} <br />
            <div
              dangerouslySetInnerHTML={{
                __html: `&nbsp; &nbsp;showNoty = (e) => { <br /> &nbsp; &nbsp; &nbsp; &nbsp; e.preventDefault();  <br /><br /> &nbsp; &nbsp; &nbsp; &nbsp; this.props.noty.show({
                  title: 'Success',
                  text: 'Hello, World!',
                  type: 'success'
                }) <br /> &nbsp; &nbsp;}`
              }}
            />
            <br />
            <span
              dangerouslySetInnerHTML={{
                __html: `&nbsp; &nbsp;render() { <br /> &nbsp; &nbsp; &nbsp; &nbsp; return (`
              }}
            />
            {`<button onClick={this.showNoty}>Show Noty</button>`}
            <span
              dangerouslySetInnerHTML={{
                __html: `) <br /> &nbsp; &nbsp;}`
              }}
            />
            <br />
            {`}`}
            <br />
            <br />
            {`export default notyConnect(MyComponent);`}
          </Message>
        </Container>
      </Segment>
    );
  }
}
