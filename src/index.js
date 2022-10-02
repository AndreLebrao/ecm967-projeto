import { createServer } from "@graphql-yoga/node";
const usuarios = [
  {
    id: "1",
    nome: "Andre",
    idade: 20,
    posts: [
      {
        id: "1",
        texto: "Monografia",
        comentarios: [
          {
            id: "1",
            texto: "tem que ver isso ai",
            autor: {
              id: "1",
              nome: "Andre",
              idade: 20,
            },
          },
        ],
        reacoes: [
          {
            id: "1",
            tipo: "gostei",
            autor: {
              id: "1",
              nome: "Andre",
              idade: 20,
            },
          },
        ],
      },
    ],
    comentarios: [
      {
        id: "1",
        texto: "tem que ver isso ai",
        post: {
          id: "1",
          texto: "Monografia",
          reacoes: [{ id: "1", tipo: "gostei" }],
        },
      },
    ],
    reacoes: [
      {
        id: "1",
        tipo: "gostei",
        post: {
          id: "1",
          texto: "Monografia",
        },
      },
    ],
  },
];

const comentarios = [
  {
    id: "1",
    texto: "tem que ver isso ai",
    autor: {
      id: "1",
      nome: "Andre",
      idade: 20,
    },
    post: {
      id: "1",
      texto: "Monografia",
      autor: {
        id: "1",
        nome: "Andre",
        idade: 20,
      },
    },
  },
];

const posts = [
  {
    id: "1",
    texto: "Monografia",
    comentarios: [
      {
        id: "1",
        texto: "tem que ver isso ai",
        autor: {
          id: "1",
          nome: "Andre",
          idade: 20,
        },
      },
    ],
    reacoes: [
      {
        id: "1",
        tipo: "gostei",
        autor: {
            id: "1",
            nome: "Andre",
            idade: 20,
        },
      },
    ],
    autor: {
      id: "1",
      nome: "Andre",
      idade: 20,
    },
  },
];

const reacoes = [
  {
    id: "1",
    tipo: "gostei",
    post: {
        id: "1",
        texto: "Monografia",
        autor:{
            id: "1",
            nome: "Andre",
            idade: 20,
        }
    },
    autor: {
        id: "1",
        nome: "Andre",
        idade: 20,
    },
  },
];

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
    tipo: String!
    autor: Usuario!
    post: Post!
},
type ReacaoInfo{
    reacoes:[Reacao!]!
    boas: String!
    ruins: String!
},
type Query{
    usuarios:[Usuario!]!
    posts:[Post!]!
    comentarios:[Comentario!]!
    reacoesInfo: ReacaoInfo!
}
`;
const resolvers = {
  Query: {
    usuarios() {
      return usuarios;
    },
    posts() {
      return posts;
    },
    comentarios() {
      return comentarios;
    },
    reacoesInfo(){
      const total = reacoes.length
      const boas = reacoes.filter(reacao => reacao.tipo == "gostei").length
      const ruins = reacoes.filter(reacao => reacao.tipo == "não gostei").length
        return {
            reacoes: reacoes,
            boas: `${boas/total*100}%`,
            ruins: `${ruins/total*100}%`
        }
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
