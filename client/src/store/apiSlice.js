import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// const baseURI = "http://localhost:8080";
// const baseURI = "https://expense-tracker-ekwj.onrender.com/";
const baseURI = "https://expensetracker-md31.onrender.com";

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl:baseURI}),
    endpoints:builder=>({
        getCategories : builder.query({
            //get
            query:()=>'/api/category',
            providesTags:['categories']
        }),
        getLabels : builder.query({
            //get
            query:()=>'/api/labels',
            providesTags:['transactions']
        }),
        addTransaction: builder.mutation({
            //POST
            query:(initialTransaction)=>({
                url:'/api/transaction',
                method:"POST",
                body:initialTransaction
            }),
            invalidatesTags:['transactions']
        }),
        deleteTransaction:builder.mutation({
            //Delete
            query:recorded=>({
                url:'/api/transaction',
                method:"DELETE",
                body:recorded
            }),
            invalidatesTags:['transactions']
        }),
        addUser : builder.mutation({
            //POST
            query:(initialUser)=>({
                url:'/api/users',
                method:"POST",
                body:initialUser
            })
        }),
        getUser : builder.mutation({
            //get
            query:(User)=>({
               url :'/api/users',
               method:"POST",
               body : User
            })
        })


    })
})

export default apiSlice;