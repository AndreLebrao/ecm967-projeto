import { createServer } from "@graphql-yoga/node";

const usuarios = [
    {
        id: "1",
        nome:"Andre",
        idade:15
    },
    {
        id: "2",
        nome:"Felipe",
        idade:20
    },
    {
        id: "3",
        nome:"Joao",
        idade:25
    },
    {
        id: "4",
        nome:"Thiago",
        idade:30
    },
    {
        id: "5",
        nome:"Yago",
        idade:35
    },
]

const typeDefs = `
type Usuario{
    id: ID!,
    nome: String!,
    idade: Int!,
    posts: [Post!]
    comentarios: [Comentario!]
    reacoes: [Reacao!]
},

type Post {
    id: ID!
    texto: String!
    comentarios: [Comentario!]
    reacoes: [Reacao!]
    autor: Usuario!

},
type Comentario {
    id: ID!
    texto: String!
    autor: Usuario!
    post: Post!
},
type Reacao {
    id: ID!
    tipo: Boolean!
    autor: Usuario!
    post: Post!
},
type Query{
    usuarios:[Usuario!]!
    posts:[Post!]!
    comentarios:[Comentario!]!
}
`;
const resolvers = {
  Query: {
    usuarios(){
        return usuarios
    }
  },
};
const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
});
server.start({ port: 4000 }, () => {
  "Servidor no ar...";
});
