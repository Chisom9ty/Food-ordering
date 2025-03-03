import { create } from "zustand"
import { CartType, ActionTypes } from "@/types/types"
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
    products:[],
    totalItems:0,
    totalPrice:0,
}

export const useCartStore = create(persist<CartType & ActionTypes>((set, get)=>({
    products:INITIAL_STATE.products,
    totalItems:INITIAL_STATE.totalItems,
    totalPrice:INITIAL_STATE.totalPrice,
    addToCart(item) {

        const products = get().products
        const productInState = products.find(products=>products.id == item.id)

        if(productInState){

            const updatedProducts = products.map(product=>product.id === productInState.id ? {
                ...item,
                quantity:item.quantity+product.quantity,
                price: item.price + product.price,


            } : item
            );
            set((state)=>({
                products:updatedProducts,
                totalItems:state.totalItems + item.quantity,
                totalPrice: state.totalPrice + item.price,

            }))

        }else{

        }
        set((state)=>({
            products:[...state.products, item],
            totalItems:state.totalItems+item.quantity,
            totalPrice:state.totalPrice+item.price
                
        }));
    },

    removeFromCart(item) {
        set((state)=>({
            products:state.products.filter((products)=>products.id != item.id),
            totalItems:state.totalItems-item.quantity,
            totalPrice:state.totalPrice-item.price

        }))
    },

}),{name:"cart", skipHydration:true}))