const graphql = require('graphql')
const _ = require('lodash')
const { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql
const Book = require('../models/books')
const Author = require('../models/author')
const { AuthorType, BookType, RootQuery } = require('./querySchema')
const mongoose = require('mongoose')

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args) {
                const { name, age } = args
                let author = new Author({ name, age })
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID }
            },
            resolve(parent, args) {
                const { name, genre, authorId } = args
                const book = new Book({ name, genre, authorId })
                return book.save()
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

module.exports = { schema, Mutation }