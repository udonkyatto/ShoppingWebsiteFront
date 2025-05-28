// 创建商店上下文
import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
// export const food_list = [
//     {
//         _id: "1",
//         name: "Greek salad",
//         image: food_1,
//         price: 12,
//         description: "Food provides essential nutrients for overall health and well-being",
//         category: "Salad"
//     },

export const StoreContext = createContext(null) // 创建上下文

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});// 购物车状态
    // 添加食物到购物车    
    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    // useEffect(() => {
    //     console.log(cartItems)
    // },[cartItems])
    
    // 计算购物车总金额
    const getTotalCartAmoumt = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item]
            }
        }
        return totalAmount
    }
    // 上下文值：提供购物车数据、添加物品、计算总金额的函数
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmoumt
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children} {/* 访问父组件传递给子组件的内容 */}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider