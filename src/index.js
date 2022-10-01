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

const comentarios = [
    {
        id:1,
        texto:"trivial",
        autor:1,
        post:1
    },
    {
        id:2,
        texto:"pensamento clássico",
        autor:1,
        post:1
    },
    {
        id:3,
        texto:"acuracidade não existe...",
        autor:2,
        post:1
    },
    {
        id:4,
        texto:"pode ser",
        autor:3,
        post:1
    },
    {
        id:5,
        texto:"tem que ver isso aí",
        autor:5,
        post:1
    },
]

const posts = [
    {
        id:1,
        texto:"Monografia",
        comentarios:[],
        reacoes:[],
        autor:4
    },
    {
        id:2,
        texto:"Método",
        comentarios:[],
        reacoes:[],
        autor:4
    },
    {
        id:3,
        texto:"Bibliografia",
        comentarios:[],
        reacoes:[],
        autor:3
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
    },
    posts(){
        return posts
    },
    comentarios(){
        return comentarios
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
