import { createServer } from '@graphql-yoga/node';

let todos = [
  {
    id: 'oO-KGDAxLpEnSPMPK2PEH',
    title: 'first todo',
    status: 'active',
  },
  {
    id: '_PkTDcI2VmbBpXZ-_8umi',
    title: 'second todo',
    status: 'active',
  },
  {
    id: 'oClPLeMoTmNqkBELla2PX',
    title: '123',
    status: 'active',
  },
];

const typeDefs = `
	type Todo {
		id: ID!
		title: String!
		status: String!
	}
	type Query {
		getTodos: [Todo]!
	}
	type Mutation {
    addTodo(id: ID!, title: String!, status: String!): Todo
    setStatus(id: ID!, status: String!): Todo
  }
`;

const resolvers = {
  Query: {
    getTodos: () => {
      return todos;
    },
  },
  Mutation: {
    addTodo: (_: unknown, { id, title, status }: { id: string; title: string; status: string }) => {
      const newTodo = {
        id,
        title,
        status,
      };
      todos.push(newTodo);
      return newTodo;
    },
    setStatus: (_: unknown, { id, status }: { id: string; status: string }) => {
      const todo = todos.find((todo) => todo.id === id);
      if (!todo) {
        throw new Error('Todo not found');
      }
      todo.status = status;
      return todo;
    },
  },
};

// Create your server
const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
});
// start the server and explore http://localhost:4000/graphql
server.start();
